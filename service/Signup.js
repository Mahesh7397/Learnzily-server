const { Roles } = require("../config/Code_Roles");
const GoogleUser = require("../models/GoogleUser")
const User = require("../models/User")
const bcrypt = require('bcrypt');

const Signup=async(email,password,udata)=>{
    try {
        const data=await User.findOne({email})
        const gdata=await GoogleUser.findOne({email})
        if(data || gdata){
            return {message:"email is already used"}
        }else {
            const hashpassword=await bcrypt.hash(password,10)
            //hashing password
            const neswuaer=new User({email,password:hashpassword,Userdata:{...udata,OnBoardingfinish:false},Role:Roles.User})
            await neswuaer.save()
            return {message:"User Created Successfuly"}
        }
    } catch (error) {
        return {error}
    }
}

module.exports={Signup}