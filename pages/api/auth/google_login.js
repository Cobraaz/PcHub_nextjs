import connectDB from "utils/connectDB";
import Users from "models/userModel";
import { createAccessToken, createRefreshToken } from "utils/generateToken";
import bcrypt from "bcryptjs";
import { google } from "googleapis";

const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await googleLogin(req, res);
      break;
  }
};

const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.MAILING_SERVICE_CLIENT_ID,
    });

    const { email_verified, email, name, picture } = verify.payload;
    const password = email + process.env.GOOGLE_SECRET;

    const passwordHash = await bcrypt.hash(password, 12);

    if (!email_verified)
      return res.status(400).json({ err: "Email verification failed." });

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
        avatar: picture,
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
