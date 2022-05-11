import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";
const imageToBase64 = require("image-to-base64");
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

// * This is getAllproducts without API FEATURES for Detail Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });
    const {
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
      brand,
    } = req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      brand === "all" ||
      images.length === 0
    )
      return res.status(400).json({ err: "Please add all the fields." });

    const newProduct = new Products({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      content,
      category,
      images,
      brand,
    });

    await newProduct.save();

    res.json({ msg: "Success! Created a new product" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
