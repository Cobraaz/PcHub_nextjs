import connectDB from "utils/connectDB";
import Products from "models/productModel";
import { shuffle } from "helpers/helper.functions";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
  }
};
// * This is getStaticProps as at that point localhost is available

export const productsFromDB = async () => {
  try {
    const productsResponse = await Products.find();
    return {
      status: "success",
      result: productsResponse.length,
      productsResponse,
    };
  } catch (err) {
    console.log(err);
    return {
      status: err.message,
    };
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.category !== "all")
      this.query.find({ category: queryObj.category });

    if (queryObj.brand !== "all") this.query.find({ brand: queryObj.brand });

    if (queryObj.title !== "all")
      this.query.find({ title: { $regex: queryObj.title } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getAllProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();
    const products = await features.query;

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
