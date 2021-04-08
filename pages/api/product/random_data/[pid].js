import connectDB from "utils/connectDB";
import Products from "models/productModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getRandomProducts(req, res);
      break;
  }
};

const getRandomInt = () => {
  const randomNumber = Math.floor(Math.random() * 2);
  if (randomNumber === 0) return -1;
  return 1;
};

const getRandomProducts = async (req, res) => {
  try {
    const { pid } = req.query;
    const products = await Products.find();
    let productsLength = products.length - 3;
    var random = Math.abs(Math.floor(Math.random() * productsLength));
    const resultData = await Products.find({
      _id: { $nin: pid },
    })
      .skip(random)
      .sort({ date: getRandomInt() })
      .limit(3);

    res.json({ products: resultData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: err.message });
  }
};
