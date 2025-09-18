const QuestionPaper = require('../models/QuestionPaper')
const Notes = require('../models/Notes')
const GoogleUser = require("../models/GoogleUser")
const User = require("../models/User")
const { getuserdata } = require('../service/Account')


 const NotesUpload = async(data) =>{
    try {
       const newNotes= new Notes(data)
       await newNotes.save()
    } catch(error) {
       throw new Error(error)
    }
}

 const QuestionUpload=async(data)=>{
    try {
        const newquestion= new QuestionPaper(data)
        await newquestion.save()
    } catch (error) {
        throw new Error(error)
    }
}

 const ResourceUpdate=async(type,id,data)=>{
    try {
        type=="Notes"?await Notes.findByIdAndUpdate(id,data,{new:true}):QuestionPaper.findByIdAndUpdate(id,data,{new:true})
        return {message:`${type} Updated`}
    } catch (error) {
        throw new Error(error)
    }
}

 const DeleteData=async(type,id)=>{
   try {
    type=="Notes"?await Notes.findByIdAndDelete(id):await QuestionPaper.findByIdAndDelete(id)
    return {message:`${type} Deleted`}
   } catch (error) {
    throw new Error(error)
   }
}

 const Search=async(key)=>{
   try {
    const notedata=await Notes.find({
        $or:[
            {Sub_name:{ $regex: key, $options: "i" }}
        ]
    })//{Sub_name:key}
    const questionData=await QuestionPaper.find({
        $or:[
            {Sub_name:{ $regex: key, $options: "i" }}
        ]
    })
    if(notedata.length==0 && questionData.length==0){
        return {message:"Not Found"}
    }
    else{
        return {result:[...notedata,...questionData]}
    }
   } catch (error) {
        throw new Error(error)
   }
}

const getallresourcesdata=async()=>{
   try {
    const notesdata=await Notes.find()
    const Questionpaper=await QuestionPaper.find()

    return {notes:[...notesdata],questionpaper:[...Questionpaper]}
   } catch (error) {
    throw new Error(error)
   }
}

const getUserEnroledCourses=async(userId)=>{
    try {
        const googleuser = await GoogleUser.findOne({ _id: id })
        const emailuser = await User.findOne({ _id: id })
    } catch (error) {
        throw new Error(error)
    }
}



module.exports={Search,DeleteData,ResourceUpdate,QuestionUpload,NotesUpload,getallresourcesdata}