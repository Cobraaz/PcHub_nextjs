import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getByIdProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
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

const updateProduct = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { pid } = req.query;
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

    await Products.findOneAndUpdate(
      { _id: pid },
      {
        title: title.toLowerCase(),
        price,
        inStock,
        description,
        content,
        category,
        images,
        brand,
      }
    );

    res.json({ msg: "Success! Updated a product" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

const deleteProduct = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { pid } = req.query;

    await Products.findByIdAndDelete(pid);
    res.json({ msg: "Deleted a product." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
