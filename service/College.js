
const College = require("../models/College")


const Addcollege=async(data)=>{
    try {
        const check= await College.findOne({collegeName:data.collegeName})
        if(check){
            return {message:"College is already added"}
        }else {
            const newcollege=new College(data)
            await newcollege.save()
            return {message:"College added successfuly"}
        }
    } catch (error) {
        throw new Error(error)
    }
}

const Getallcolleges=async(data)=>{
    try {
        const colleges=await College.find()
        return {colleges}
    } catch (error) {
        throw new Error(error)
    }
}

const Deletecollege=async(id)=>{
    try {
        await College.findByIdAndDelete(id)
        return {message:"College Deleted"}
    } catch (error) {
        throw new Error(error)
    }
}

const editcollege=(id,data)=>{
    try {
        const updated=College.findByIdAndUpdate(id,data,{new:true})
        return {message:"College Updated",updated}
    } catch (error) {
        throw new Error(error)
    }
}

module.exports={Addcollege,Getallcolleges,Deletecollege,editcollege}