const mongoose = require("mongoose");
const fakeDB = require("./FakeDB");
const config = require("./config");
mongoose.connect(
  config.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  async (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("> Starting populating DB...");
      await fakeDB.populate();
      await mongoose.connection.close();
      console.log("> DB has been populated...");
    }
  }
);
