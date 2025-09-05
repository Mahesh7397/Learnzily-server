const LoginService=require('../service/login')

const login=async(req,res,Next)=>{
   try {
    const requestdata=req?.body
    const data=await LoginService.emaillogin(requestdata.password,requestdata.email)
    res.status(200).json(data)
   } catch (error) {
      console.log(error)
   }
}

const googlelogin=async(req,res,next)=>{
   try {
      const reqdata=req?.body
      console.log(reqdata)
      const data =await LoginService.googlelogin(reqdata.email,reqdata.googleid,reqdata.data)
      res.status(200).json(data)
   } catch (error) {
      console.log(error)
   }
}

module.exports={login,googlelogin}