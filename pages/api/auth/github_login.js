import connectDB from "utils/connectDB";
import Users from "models/userModel";
import { createAccessToken, createRefreshToken } from "utils/generateToken";
import bcrypt from "bcryptjs";
import axios from "axios";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await githubLogin(req, res);
      break;
  }
};

const githubLogin = async (req, res) => {
  try {
    const { code } = req.body;

    const result = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${result.data.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const { email, name, avatar_url } = data;


    const password = email + process.env.GITHUB_SECRET;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await Users.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ err: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      return res.json({
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
    } else {
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        avatar: avatar_url,
      });

      const result = await newUser.save();

      const access_token = createAccessToken({ id: result._id });
      const refresh_token = createRefreshToken({ id: result._id });

      return res.json({
        msg: "Login Success!",
        refresh_token,
        access_token,
        user: {
          id: result._id,
          name: result.name,
          email: result.email,
          role: result.role,
          avatar: result.avatar,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
