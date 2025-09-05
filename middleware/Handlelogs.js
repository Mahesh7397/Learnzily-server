const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const UserLogs=require('../models/Log')
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (m,o,p) => {
    const date= `${format(new Date(), 'yyyyMMdd')}`;
    const Time=`${format(new Date(), 'HH:mm:ss')}`;
    try {
        const logdata=new UserLogs({
            Date:date,
            Time:Time,
            UUID:uuid(),
            Method:m,
            Origin:o,
            Path:p
        })
        await logdata.save()
    } catch (err) {
        console.log(err);
    }
}

const logger=(req,res,next)=>{
    logEvents(req.method,req.headers.origin,req.path)
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports ={logEvents,logger};