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

      req.user = { id: user._id, role: user.role, root: user.root };
      return icomponent(req, res);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "you must logged in" });
    }
  };
};

// try {
//   const token = req.header("Authorization");
//   if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(400).json({ msg: "Invalid Authentication." });

//     req.user = user;
//     next();
//   });
// } catch (err) {
//   return res.status(500).json({ msg: err.message });
// }

export default Authenticated;
