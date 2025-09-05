const jwt=require('jsonwebtoken')
const Roles=require('./Code_Roles');
const { getaccdet } = require('../service/Account');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader)
  if (!token) return res.sendStatus(401);
  
  
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const RefreshToken=async(req,res)=>{
  try {
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token,process.env.ACCESS_TOKEN,async(err,user)=>{
     if (err) return res.sendStatus(403);
     else{
      const userid=await getaccdet(user.id)
      const Token=jwt.sign(userid,process.env.ACCESS_TOKEN)
      res.json( {Gatetoken:`b1c2a3d4-${userid.Role}-7890-abcd-ef1234567890`, accessToken:Token})
     }
  })
  } catch (error) {
     res.status(403).json({message:error.message})
  }
}

module.exports={verifyToken,RefreshToken}