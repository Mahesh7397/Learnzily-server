const { Schema } = require('mongoose')
const mongoose=require('../config/Mongodb_config')

const QuestionSchema=new Schema({
    Sub_name:{type:String ,required:true},
    Sub_code:{type:String ,required:true },
    Issu_date:{type:Date ,require},
    Sem_month_year:{type:String ,required:true},
    College_name:{type:String,require:true},
    Course_name:{type:String,required:true}, 
    College_Degree:{type:String,require:true},//category
    Key:{type:String,require:true}
})

module.exports=mongoose.model("QuestionPaper",QuestionSchema)