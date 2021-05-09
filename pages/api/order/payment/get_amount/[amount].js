import connectDB from "utils/connectDB";
const CC = require("currency-converter-lt");
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await usdAmount(req, res);
      break;
  }
};

// * Currency Convertor
const usdAmount = async (req, res) => {
  try {
    const { amount } = req.query;
    let currencyConverter = new CC();
    await currencyConverter
      .from("INR")
      .to("USD")
      .amount(parseInt(amount))
      .convert()
      .then((response) => {
        res.json({ amount: response });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
