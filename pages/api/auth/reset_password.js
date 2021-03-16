import connectDB from "utils/connectDB";
import Users from "models/userModel";
import Authenticated from "middleware/Authenticated";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await resetPassword(req, res);
      break;
  }
};

// export default Authenticated(async (req, res) => {
//   const orders = await Order.find({ user: req.userId }).populate(
//     "products.product"
//   );
//   res.status(200).json(orders);
// });

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
