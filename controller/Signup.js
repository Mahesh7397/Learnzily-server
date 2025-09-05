const signupservice=require('../service/Signup')

const Signup=async(req,res,next)=>{
    try {
        const reqdata=req?.body
        const user=await signupservice.Signup(reqdata.email,reqdata.password,reqdata.userdata)
        res.status(200).json(user)
    } catch (error) {
        res.status(403).json({message:"server is Busy"})
    }
}

module.exports={Signup}