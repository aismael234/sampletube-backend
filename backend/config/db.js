const { builtinModules } = require("module");
const mongoose = require("mongoose");
// sanitizes user input (didn't look too deep into this. hopefully it works :P)
mongoose.set("sanitizeFilter", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
