const express=require("express")
const Router=express.Router()
const Accountcontrol=require('../controller/Account')
const { verifyToken, RefreshToken } = require("../config/Auth")
const { authorizeRoles } = require("../middleware/Authroziesrole")
const { Roles } = require("../config/Code_Roles")

Router.route('/user/profile').get(verifyToken,Accountcontrol.getuserdetails)

Router.route('/user/onboarding').post(verifyToken,Accountcontrol.finishonboarding)

Router.route('/user/refresh-token').get(RefreshToken)

module.exports=Router