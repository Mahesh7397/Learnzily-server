// server.js (Main backend entry file for React Native app)

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const loginroute=require('./router/Login')
const resourceroute=require('./router/Resouce')
const signuproute=require('./router/Signup')
const Accountrouter=require('./router/Account');
const Adminroute=require('./router/Admin')
const collegroute=require('./router/College')

const { logger } = require("./middleware/Handlelogs");
const { verifyToken } = require("./config/Auth");
const { authorizeRoles } = require("./middleware/Authroziesrole");
const { Roles } = require("./config/Code_Roles");


// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(logger)
// Middleware
//app.use(cors({
 // origin: "http://localhost:5173"   // only allow React frontend/
//}));

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Account routes
app.use('/api',loginroute,signuproute)

//Tutor routes


//user routes
app.use('/api',verifyToken,resourceroute,Accountrouter)

//admin routes
app.use('/auth',verifyToken,authorizeRoles(Roles.Admin),Adminroute,collegroute)




app.get('/test',(req,res)=>{
    res.json({message:"connected succesfuly to server"})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
