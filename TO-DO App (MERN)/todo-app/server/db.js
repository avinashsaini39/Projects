const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(
      "mongodb+srv://avinashsaini39:9928373382@cluster.ysujsgk.mongodb.net/todo",
      connectionParams
    );
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to database.", error);
  }
};
