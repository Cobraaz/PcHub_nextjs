import connectDB from "utils/connectDB";
import Products from "models/productModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
  }
};
// * This is getStaticProps as at that point localhost is available

export const productsFromDB = async () => {
  try {
    const productsResponse = await Products.find();
    return {
      status: "success",
      result: productsResponse.length,
      productsResponse,
    };
  } catch (err) {
    console.log(err);
    return {
      status: err.message,
    };
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json({ status: "success", result: products.length, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: err.message });
  }
};
