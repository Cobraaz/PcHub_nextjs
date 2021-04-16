const { products } = require("./data");
const Products = require("../models/productModel");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class FakeDB {
  async clean() {
    await Products.deleteMany({});
  }

  async addData() {
    await Products.create(shuffle(products));
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDB();
