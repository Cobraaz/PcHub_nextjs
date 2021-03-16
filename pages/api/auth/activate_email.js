import connectDB from "utils/connectDB";
import Users from "models/userModel";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "utils/generateToken";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await activateEmail(req, res);
      break;
  }
};

const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { name, email, password } = user;

    const check = await Users.findOne({ email });
    if (check)
      return res.status(400).json({ err: "This email already exists." });
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    const newUser = new Users({
      name,
      email,
      password,
    });

    const result = await newUser.save();
    res.json({
      msg: "Account has been activated!",
      refresh_token,
      access_token,
      user: {
        name: result.name,
        email: result.email,
        role: result.role,
        avatar: result.avatar,
        root: result.root,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
