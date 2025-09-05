const express =require('express')
const Logincontroller=require('../controller/Login')
const Router=express.Router()

Router.route('/login').post(Logincontroller.login)

Router.route('/googlelogin').post(Logincontroller.googlelogin)


module.exports=Router