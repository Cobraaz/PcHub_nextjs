import connectDB from "utils/connectDB";
import Categories from "models/categoriesModal";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategories(req, res);
      break;
  }
};

const createCategory = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name } = req.body;
    if (!name)
      return res.status(400).json({ err: "Name can not be left blank." });

    const newCategory = new Categories({ name });

    await newCategory.save();
    res.json({
      msg: "Success! Created a new category.",
      newCategory,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json({ categories });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
