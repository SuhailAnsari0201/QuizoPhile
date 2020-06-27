const mongoose = require("mongoose");
const config = require("config");
const offline_db = config.get("Offline_mongoURI");
const online_db = config.get("Online_mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(online_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message + " \nDataBase Error");
    process.exit(1);
  }
};
module.exports = connectDB;
