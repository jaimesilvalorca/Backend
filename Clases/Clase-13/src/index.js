import mongoose from "mongoose"
import userModel from "./models/users.model.js"
import studentModel from "./models/student.model.js"
import courseModel from "./models/course.model.js"

const uri = "mongodb+srv://coder:coder@cluster0.cmvdrrk.mongodb.net/"

const main = async() =>{
    await mongoose.connect(uri,{
        dbName: 'mongo_advanced'
    })
    console.log('DB connected!')

    // await studentModel.create({
    //     first_name:"Francisco",
    //     last_name:"Caca"
    // })

    // await courseModel.create({
    //     title:"Backend",
    //     description: "An awesome course for developers",
    //     difficulty:5,
    //     professor: 'Alex marin'    
    // })

    // const student = await studentModel.findOne({_id:"646d9da4bfa4c32637f3dafa"})
    // student.courses.push({course:"646d9e3543b3848c120af58b"})
    // const result = await studentModel.updateOne({_id:"646d9da4bfa4c32637f3dafa"},student)
    // console.log(result)

    const student = await studentModel.findOne({_id:"646d9da4bfa4c32637f3dafa"}).populate('courses.course')
    console.log(JSON.stringify(student,null, '\t'))

}

 main()
