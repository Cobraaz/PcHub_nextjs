import connectDB from "utils/connectDB";
import Users from "models/userModel";
import { createAccessToken } from "utils/generateToken";
import sendMail from "utils/sendMail";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await forgotPassword(req, res);
      break;
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ err: "This email does not exist." });

    const access_token = createAccessToken({ id: user._id });
    const url = `${process.env.BASE_URL}/user/reset/${access_token}`;

    await sendMail(email, url, "Reset your password");
    res.json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
