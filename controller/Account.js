const Accountservice=require('../service/Account')

const getuserdetails=async(req,res,next)=>{
    try {
        const {id,role}=req.user
        const data=await Accountservice.getuserdata(id)
        if( data.length==0){
          return res.status(404).json({message:"user data is not Found"})
        }
        else{
          return res.json({userdata:data})
        }
    } catch (error) {
         res.status(403).json({message:"Server Error"})
    }
}

const getalluserdata=async(req,res,next)=>{
   try {
     const userdata=await Accountservice.getalluserdata()
     res.sta.json(userdata)
   } catch (error) {
     console.log(error)
   }
}

const finishonboarding=async(req,res)=>{
  try {
    const {id}=req.user
    const data=req.body
    const updateuser=await Accountservice.Onboardingfinish(id,data)
    res.json(updateuser)
  } catch (error) {
    res.status(403).json({message:"Server error"})
  }
}

module.exports={getuserdetails,getalluserdata,finishonboarding}