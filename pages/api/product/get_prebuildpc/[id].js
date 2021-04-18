import connectDB from "utils/connectDB";
import Products from "models/productModel";
import Categories from "models/categoriesModal";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllPreBuildPc(req, res);
      break;
  }
};

const getAllPreBuildPc = async (req, res) => {
  try {
    const { id } = req.query;
    let preBuildPc = [];
    const preBuildPcName = await Categories.find({
      name: "Pre build pc",
    });

    if (preBuildPcName[0]._id.toString() === id) {
      preBuildPc = await Products.find({
        category: id,
      });
      return res.json({
        status: "success",
        result: preBuildPc.length,
        products: preBuildPc,
      });
    }

    preBuildPc = await Products.find();
    preBuildPc = preBuildPc.slice(0, 6);
    res.json({
      status: "success",
      result: preBuildPc.length,
      products: preBuildPc,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
