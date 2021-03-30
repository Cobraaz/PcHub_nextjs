import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Authenticated from "middleware/Authenticated";
import AuthenticatedRoot from "middleware/AuthenticatedRoot";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const deleteUser = Authenticated(
  AuthenticatedRoot(async (req, res) => {
    try {
      console.log("heloooo");
      await Users.findByIdAndDelete(req.query.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  })
);
