import connectDB from "utils/connectDB";
import Users from "models/userModel";
import { createAccessToken, createRefreshToken } from "utils/generateToken";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await facebookLogin(req, res);
      break;
  }
};

const facebookLogin = async (req, res) => {
  try {
    const { accessToken, userID } = req.body;

    const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const { email, name, picture } = data;

    const password = email + process.env.FACEBOOK_SECRET;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await Users.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ err: "Password is incorrect." });

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
    } else {
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        avatar: picture.data.url,
      });

      const result = await newUser.save();

      const access_token = createAccessToken({ id: result._id });
      const refresh_token = createRefreshToken({ id: result._id });

      res.json({
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
