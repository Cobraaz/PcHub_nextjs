import connectDB from "utils/connectDB";
import Orders from "models/orderModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await paymentOrder(req, res);
      break;
  }
};

const paymentOrder = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user") {
      const { id } = req.query;
      const { paymentId } = req.body;

      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          paymentId,
          method: "Paypal",
        }
      );

      res.json({ msg: "Payment success!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
