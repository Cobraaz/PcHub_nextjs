import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await likeComment(req, res);
      break;
  }
};

const likeComment = Authenticated(async (req, res) => {
  try {
    const { id, comment_id } = req.query;
    const userId = req.user.id.toString();

    const product = await Products.findById(id);

    // Pull out comment
    const comment = product.comments.find(
      (comment) => comment.id === comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res
        .status(404)
        .json({ err: "Comment does not exist.", likes: comment.likes });
    }

    if (
      comment.likes.filter((like) => like.user.toString() === userId).length > 0
    ) {
      return res.status(400).json({ err: "Comment is already liked" });
    }

    comment.likes.unshift({ user: userId });

    await product.save();

    res.json({
      msg: "Comment liked",
      likes: comment.likes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
