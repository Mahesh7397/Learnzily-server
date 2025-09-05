const express=require('express')
const Router=express.Router()
const Signupcontroller=require('../controller/Signup')

Router.route('/signup').post(Signupcontroller.Signup)

module.exports=Router