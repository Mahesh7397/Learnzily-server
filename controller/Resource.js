
const { Update, Delete, Read } = require("../service/AWS")
const { MuiltyUploadQe, NotesUpload, QuestionUpload, DeleteData ,Search, getallresourcesdata } = require("../service/Resource")


// const Upload=async(req,res,next)=>{
//     try {
//         const data=req?.body()

//         if(data.length>=0){
//             const added=await MuiltyUploadQe(data.data,data.sem_date,data.Cname)
//             res.json(added)
//         }
//         else {
//            console.log('its object')
//         }
//     } catch (error) {
//         res.json({message:'Server error',error})
//     }
// }

const Upload = async (req, res) => {
    try {
        const {sem_month_year, collegename, filename, filecode, type, degree ,field} = req.params
        const {month,year}=sem_month_year.split('-')
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: type == "notes" ? `${type}/${req.file.originalname}` : `${type}/${month}-${year}/${req.file.originalnname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        const NotesData={
            Sub_name:filename,
            Issue_date:new Date(),
            Course_name:field,
            College_Degree:degree,
            Key:`${type}/${req.file.originalnname}`
        }
        const questionData = {
            Sub_name: filename,
            Sub_code: filecode,
            Issu_date: new Date(),
            Sem_month_year: `${month}-${year}`,
            College_name: collegename,
            College_Degree: degree,
            Course_name:field,
            Key: `${type}/${month}-${year}/${req.file.originalnname}`
        }

        const s3save = await Update(params)
        type == "notes" ? await NotesUpload(NotesData) : await QuestionUpload(questionData)
        res.json(s3save)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

 const Geturlaws = async (req, res) => {
    try {
        const { key } = req.query
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        }
        const url=await Read(params)
        res.json(url)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

 const HandleDelete = async (req, res) => {
    try {
        const { type, id, key, year } = req.query
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${type}/${year}/${key}`,
        }
        await Delete(params)
        const ch = await DeleteData(type, id)
        res.json(ch)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

 const SearchList=async(req,res)=>{
    try {
        const {q}=req.query
        console.log(q)
        const result=await Search(q)
        res.json(result)
    } catch (error) {
        res.status(403).json({message:'Server Error'})
    }
}

const GetAllResourcesdata=async(req,res)=>{
    try {
        const data=await getallresourcesdata()
        res.status(200).json(data)
    } catch (error) {
        res.status(403).json({message:error.message})
    }
}


module.exports={Upload,HandleDelete,SearchList,Geturlaws,GetAllResourcesdata}