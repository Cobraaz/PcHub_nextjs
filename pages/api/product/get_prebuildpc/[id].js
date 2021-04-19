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
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getAllPreBuildPc = async (req, res) => {
  try {
    const { id } = req.query;
    let preBuildPc = [];
    const preBuildPcName = await Categories.find({
      name: "Pre build pc",
    });

    if (preBuildPcName[0]._id.toString() === id) {
      const features = new APIfeatures(
        Products.find({
          category: id,
        }),
        req.query
      ).paginating();
      const products = await features.query;
      return res.json({
        status: "success",
        result: products.length,
        products,
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
