import connectDB from "utils/connectDB";
import Brands from "models/brandModal";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createBrand(req, res);
      break;
    case "GET":
      await getBrand(req, res);
      break;
  }
};

const createBrand = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name } = req.body;
    if (!name)
      return res.status(400).json({ err: "Name can not be left blank." });

    const newBrand = new Brands({ name });

    await newBrand.save();
    res.json({
      msg: "Success! Created a new Brand.",
      newBrand,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

const getBrand = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.json({ brands });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
