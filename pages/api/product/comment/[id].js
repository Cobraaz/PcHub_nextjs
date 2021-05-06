import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCommentsById(req, res);
      break;
    case "POST":
      await addComment(req, res);
      break;
  }
};

const getCommentsById = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });

    res.json({ comment: product.comments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

const addComment = Authenticated(async (req, res) => {
  try {
    let { text } = req.body;
    if (!text) return res.status(500).json({ err: "Please add a comment" });
    text = text.trim();

    if (!text.endsWith(".")) {
      text = text.concat(".");
    }

    const user = await Users.findById(req.user.id).select("-password");
    const product = await Products.findById(req.query.id);

    const newComment = {
      user: req.user.id,
      text,
      name: user.name,
      avatar: user.avatar,
    };

    product.comments.unshift(newComment);

    await product.save();

    res.json({
      msg: "Comment added",
      comment: product.comments,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
