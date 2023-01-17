const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://admin123:admin123@cluster0.ror1pv3.mongodb.net/test",
      connectionParams
    );
    ("Connected to database successfully");
  } catch (error) {
    error;
    ("Could not connect database!");
  }
};
