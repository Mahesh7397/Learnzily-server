// models/User.js
const { Schema } = require("mongoose");
const mongoose = require("../config/Mongodb_config");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // hashed if local login
  Userdata:{type:Object},
  Role:{type:String}
});

module.exports = mongoose.model("EmailUser", UserSchema);