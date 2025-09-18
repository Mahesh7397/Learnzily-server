const collegeservice=require("../service/College")

const Addcollege=async(req,res)=>{
    try {
        const data=req.body
        const result=await collegeservice.Addcollege(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const Getallcolleges=async(req,res)=>{
    try {
        const result=await collegeservice.Getallcolleges()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const Deletecollege=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await collegeservice.Deletecollege(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const editcollege=async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        const result=await collegeservice.editcollege(id,data)
        res.status(200).json(result)    
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports={Addcollege,Getallcolleges,Deletecollege,editcollege}