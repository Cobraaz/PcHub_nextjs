import connectDB from "utils/connectDB";
import Users from "models/userModel";
import valid from "utils/valid";
import { createActivationToken } from "utils/generateToken";
import bcrypt from "bcrypt";
import sendMail from "utils/sendMail";

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
    const { name, email, password, cf_password } = req.body;
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = {
      name,
      email,
      password: passwordHash,
    };

    const activation_token = createActivationToken(newUser);

    const url = `${process.env.BASE_URL}/user/activate/${activation_token}`;
    console.log(url);
    sendMail(email, url, "Verify your email address");

    res.json({
      msg: "Register Success! Please activate your email to start.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
