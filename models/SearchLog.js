
// models/SearchLog.js
const mongoose = require("mongoose");

const SearchLogSchema = new mongoose.Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SearchLog", SearchLogSchema);