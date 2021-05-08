import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await editComment(req, res);
      break;
  }
};

const editComment = Authenticated(async (req, res) => {
  try {
    const { id, comment_id } = req.query;
    const { text } = req.body;

    const product = await Products.findById(id);

    // Pull out comment
    const comment = product.comments.find(
      (comment) => comment.id === comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res
        .status(404)
        .json({ err: "Comment does not exist", comment: product.comments });
    }

    // Check user
    if (comment.user.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ err: "User not authorized", comment: product.comments });
    }

    // Get remove index
    comment.text = text;

    await product.save();

    product.comments.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    res.json({
      msg: "Comment Updated",
      comment: product.comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
