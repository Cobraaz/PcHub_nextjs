import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Authenticated from "middleware/Authenticated";
import AuthenticatedRoot from "middleware/AuthenticatedRoot";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllUsers(req, res);
      break;
  }
};

const getAllUsers = Authenticated(
  AuthenticatedRoot(async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  })
);
