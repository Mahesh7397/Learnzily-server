// models/User.js
const { Schema } = require("mongoose");
const mongoose = require("../config/Mongodb_config");

const GoogleUserSchema = new Schema({
  email: { type: String, unique: true },
  googleId: { type: String }, // for Google login
  Userdata: { type:Object},
  Role:{type:String}
});

module.exports = mongoose.model("User", GoogleUserSchema);