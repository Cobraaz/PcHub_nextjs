import connectDB from "utils/connectDB";
import Brands from "models/brandModal";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateBrand(req, res);
      break;
    case "DELETE":
      await deleteBrand(req, res);
      break;
  }
};

const updateBrand = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { name } = req.body;

    const newBrand = await Brands.findOneAndUpdate({ _id: id }, { name });
    res.json({
      msg: "Success! Update a new brand",
      brand: {
        ...newBrand._doc,
        name,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

const deleteBrand = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    const products = await Products.findOne({ brand: id });
    if (products)
      return res.status(400).json({
        err: "Please delete all products with a relationship",
      });

    await Brands.findByIdAndDelete(id);

    res.json({ msg: "Success! Deleted a brand" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
