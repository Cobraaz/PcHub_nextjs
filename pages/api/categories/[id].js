import connectDB from "utils/connectDB";
import Categories from "models/categoriesModal";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const updateCategory = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { name } = req.body;

    const newCategory = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );
    res.json({
      msg: "Success! Update a new category",
      category: {
        ...newCategory._doc,
        name,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

const deleteCategory = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    const products = await Products.findOne({ category: id });
    if (products)
      return res.status(400).json({
        err: "Please delete all products with a relationship",
      });

    await Categories.findByIdAndDelete(id);

    res.json({ msg: "Success! Deleted a category" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
