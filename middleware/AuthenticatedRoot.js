import jwt from "jsonwebtoken";
import Users from "models/userModel";

const AuthenticatedRoot = (icomponent) => {
  return async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (user.role !== "root")
        return res.status(500).json({ err: "Root resources access denied." });

      return icomponent(req, res);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ err: "you must logged in" });
    }
  };
};

export default AuthenticatedRoot;
