import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await likePost(req, res);
      break;
  }
};

const likePost = Authenticated(async (req, res) => {
  try {
    const { id } = req.query;
    const userId = req.user.id.toString();

    const product = await Products.findById(id);

    if (
      product.likes.filter((like) => like.user.toString() === userId).length > 0
    ) {
      return res.status(400).json({ err: "Product is already liked" });
    }

    product.likes.unshift({ user: userId });

    await product.save();

    res.json({
      msg: "Post liked",
      likes: product.likes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
