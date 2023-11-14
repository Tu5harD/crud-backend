const mongoose = require("mongoose");

const URL = process.env.DATABASE;

mongoose
  .connect(URL)
  .then(console.log("Connection is succesful"))
  .catch((error) => console.log(error));
