const { Schema } = require('mongoose')
const mongoose=require('../config/Mongodb_config')

const LogSchema=new Schema({
    Date:{ type:String},
    Time:{ type:String },
    UUID:{ type:String },
    Method:{ type:String },
    Origin:{ type:String },
    Path:{ type:String }
})

module.exports=mongoose.model("UserLogs",LogSchema)