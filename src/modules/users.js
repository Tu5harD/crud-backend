const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    unique: true
  }
});
const UserData = mongoose.model('UserData', schema);
module.exports= UserData