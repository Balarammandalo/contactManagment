const mongoose = require("mongoose");

require("dotenv").config()

//data bace
const mongoUrl =process.env.MONGO_ATLAS;

const connectUrl = async () => {
  return await mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Success Db Connect");
    })
    .catch((err) => {
      console.log("failure db connect");
      console.log(err)
    });
};

module.exports = connectUrl;
