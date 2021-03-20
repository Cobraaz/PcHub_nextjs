const { products } = require("./data");
const Products = require("../models/productModel");
class FakeDB {
  async clean() {
    await Products.deleteMany({});
  }

  async addData() {
    await Products.create(products);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDB();
