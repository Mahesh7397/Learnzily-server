const { Schema } = require("mongoose");
const mongoose = require("../config/Mongodb_config");

const CollegeSchema = new Schema({
    collegeName:{type:String,required:true},
    college_University:{type:String,required:true,unique:true},
    coursesOffered:{type:[String],required:false},
});

module.exports = mongoose.model("College", CollegeSchema);