import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Authenticated from "middleware/Authenticated";
import AuthenticatedRoot from "middleware/AuthenticatedRoot";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateUsersRole(req, res);
      break;
  }
};

const updateUsersRole = Authenticated(
  AuthenticatedRoot(async (req, res) => {
    try {
      const { role } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.query.id },
        {
          role,
        }
      );
      res.json({ msg: "Update Success!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  })
);
