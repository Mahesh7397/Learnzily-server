// models/Usage.js
const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date }
});

module.exports = mongoose.model("Usage", UsageSchema);