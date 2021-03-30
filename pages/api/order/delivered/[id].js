import connectDB from "utils/connectDB";
import Orders from "models/orderModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = Authenticated(async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json({ err: "Authentication is not valid." });
    const { id } = req.query;

    const order = await Orders.findOne({ _id: id });
    if (order.paid) {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true });

      res.json({
        msg: "Updated success!",
        result: {
          paid: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true,
        },
      });
    } else {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Receive Cash",
          delivered: true,
        }
      );

      res.json({
        msg: "Updated success!",
        result: {
          paid: true,
          dateOfPayment: new Date().toISOString(),
          method: "Receive Cash",
          delivered: true,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});
