import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Authenticated from "middleware/Authenticated";
import bcrypt from "bcryptjs";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
};

const resetPassword = Authenticated(async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
