import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Orders from "models/orderModel";
import Authenticated from "middleware/Authenticated";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      await getOrders(req, res);
      break;
  }
};

const getOrders = Authenticated(async (req, res) => {
  try {
    let orders;
    if (req.user.role !== "admin" || req.user.role !== "root") {
      orders = await Orders.find({ user: req.user.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Orders.find().populate("user", "-password");
    }

    res.json({ orders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});

const createOrder = Authenticated(async (req, res) => {
  try {
    const { address, mobile, cart, total } = req.body;

    const newOrder = new Orders({
      user: req.user.id,
      address,
      mobile,
      cart,
      total,
    });

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.inStock, item.sold);
    });

    await newOrder.save();

    res.json({
      msg: "Order success! We will contact you to confirm the order.",
      newOrder,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

const sold = async (id, quantity, oldInStock, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      inStock: oldInStock - quantity,
      sold: quantity + oldSold,
    }
  );
};
