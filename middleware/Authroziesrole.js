 const authorizeRoles=(...allowesRoles)=>{
    return (req,res,next)=>{
        console.log(req.user.Role)
        if(!allowesRoles.includes(req.user.Role)){
            return res.status(403).json({message:"Access denied"})
        }
        next()
    }
}

module.exports={authorizeRoles}