import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfor(req, res);
      break;
  }
};

const uploadInfor = Authenticated(async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const newUser = await Users.findOneAndUpdate(
      { _id: req.user.id },
      { name, avatar }
    );

    res.json({
      msg: "Update Success!",
      user: {
        name,
        avatar,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
