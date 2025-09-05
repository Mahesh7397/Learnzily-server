const express = require('express')
const { route } = require('./Login')
const { Geturlaws, SearchList } = require('../controller/Resource')
const Router = express.Router()

Router.route('/search').get((req,res)=>SearchList(req,res))

Router.route('/resouce-url').get((req,res)=>Geturlaws(req,res))


module.exports = Router