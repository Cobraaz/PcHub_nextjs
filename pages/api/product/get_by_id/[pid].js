import connectDB from "utils/connectDB";
import Products from "models/productModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getByIdProduct(req, res);
      break;
  }
};
// * This is getStaticProps as at that point localhost is available

export const productsFromDB = async (pid) => {
  try {
    const product = await Products.findById(pid);

    return { product };
  } catch (err) {
    console.log(err);
    return {
      err: err.message,
    };
  }
};

const getByIdProduct = async (req, res) => {
  try {
    const { pid } = req.query;

    const product = await Products.findById(pid);
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });

    res.json({ product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
