import connectDB from "utils/connectDB";
import Users from "models/userModel";
import { createAccessToken, createRefreshToken } from "utils/generateToken";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ err: "This user doesn't exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ err: "Incorrect password." });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
