import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Products from "models/productModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteComment(req, res);
      break;
  }
};

const deleteComment = Authenticated(async (req, res) => {
  try {
    const { id, comment_id } = req.query;

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

    const user = await Users.findOne({ _id: req.user.id });
    if (user.role !== "root") {
      // Check user
      if (comment.user.toString() !== req.user.id.toString()) {
        return res
          .status(401)
          .json({ err: "User not authorized", comment: product.comments });
      }
    }

    // Get remove index
    const removeIndex = product.comments
      .map((comment) => comment._id)
      .indexOf(comment_id);

    product.comments.splice(removeIndex, 1);

    await product.save();

    product.comments.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    res.json({
      msg: "Comment deleted",
      comment: product.comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
