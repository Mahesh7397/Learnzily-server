const express = require("express")
const Collegecontroller=require("../controller/colleges")
const Router=express.Router()

Router.route('/addcollege').post(Collegecontroller.Addcollege)
Router.route('/getallcolleges').get(Collegecontroller.Getallcolleges)
Router.route('/deletecollege/:id').delete(Collegecontroller.Deletecollege)
Router.route('/editcollege/:id').put(Collegecontroller.editcollege)

module.exports=Router