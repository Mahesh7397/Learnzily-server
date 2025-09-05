const express=require('express')
const Router=express.Router()


const multer = require('multer')
const { Upload, HandleDelete, Geturlaws, GetAllResourcesdata } = require('../controller/Resource')
const { getalluserdata } = require('../controller/Account')

const upload=multer({storage:multer.memoryStorage()})

Router.route('/userdata').post((req,res)=>getalluserdata(req,res))

//get all resources
//read all resources details

//add resources 
Router.route('/resources/upload/:sem_month_year/:collegename/:filename/:filecode/:type/:degree/:field')
   .post(upload.single("file"),(req,res)=>Upload(req,res))

//delete resources
Router.route('/Delete').delete((req,res)=>HandleDelete(req,res))
//get resource url
Router.route('/resource/url').get((req,res)=>Geturlaws(req,res))
//edit resources
Router.route('/resource/update/:yaer/:month/:collegename/:filename/:filecode/:type/:degree/:field').post(upload.single("file"),(req,res)=>Upload(req,res))

Router.route('/resource/alldata').get((req,res)=>GetAllResourcesdata(req,res))



module.exports=Router