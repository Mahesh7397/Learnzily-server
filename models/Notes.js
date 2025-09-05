const { Schema } = require('mongoose')
const mongoose=require('../config/Mongodb_config')


const NotesSchema=new Schema({
    Sub_name:{type:String,required:true},
    Issue_date:{type:Date,required:true},
    Course_name:{type:String,required:true}, 
    College_Degree:{type:String,required:true},//category
    Key:{type:String,required:true}
})

module.exports=mongoose.model("Notes",NotesSchema)