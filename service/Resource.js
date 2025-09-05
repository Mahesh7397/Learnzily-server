const QuestionPaper = require('../models/QuestionPaper')
const Notes = require('../models/Notes')


// export const searchkey = async (keyword) => {
//     try {
//         const qkey = await QuestionPaper.findOne({ Sub_name: keyword })
//         const Nkey = await Notes.findOne({ Sub_name: keyword })
//     } catch (error) {

//     }
// }

// export const MuiltyUploadQe = async (data, semdate, cname) => {
//     try {
//         for (let i = 0; i <= data.length; i++) {
//             const newQuestionpaper = new QuestionPaper({
//                 Sub_name: data[i].Sub_name,
//                 Sub_code: data[i].sun_code,
//                 Sem_month_year: semdate,
//                 Issu_date: new Date(),
//                 College_name: cname,
//                 File_name: data[i].File_name,
//                 File_Path: data[i].File_path
//             })
//             await newQuestionpaper.save()
//         }
//     return {message:'successfuly add data'}
//     } catch (error) {
//         throw new Error(error)
//     }
// }

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

//users



module.exports={Search,DeleteData,ResourceUpdate,QuestionUpload,NotesUpload,getallresourcesdata}