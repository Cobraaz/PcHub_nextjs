import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";
const imageToBase64 = require("image-to-base64");
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createProduct(req, res);
      break;
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
    } = req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
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
    });

    await newProduct.save();

    res.json({ msg: "Success! Created a new product" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
