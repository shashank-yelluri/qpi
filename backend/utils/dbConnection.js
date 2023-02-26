const mongoose = require("mongoose");
const { MONGO_URI } = require("./constants");

const connectToDB = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("DB Connected !"))
    .catch((err) => console.error(err));
};

module.exports = connectToDB;
