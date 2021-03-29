import jwt from "jsonwebtoken";
import Users from "models/userModel";
const Authenticated = (icomponent) => {
  return async (req, res) => {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ error: "you must logged in" });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded)
        return res.status(400).json({ err: "Invalid Authentication." });

      const user = await Users.findOne({ _id: decoded.id });
      req.user = { id: user._id, role: user.role };
      return icomponent(req, res);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "you must logged in" });
    }
  };
};

export default Authenticated;
