import express from 'express' //ES Modules
import multer from 'multer'
import usersRouter from './routers/users.router.js'
import petsRouter from './routers/pets.router.js'

const app = express()

const logged = false
app.use(express.json()) // transformar los datos en json desde el body
app.use(express.urlencoded({extended:true})) // leer los datos desde el html
app.use(express.static('public')) //crear el front desde el backend


//middleware
const middleware1 = function (req,res,next){ // antes que el router se ejecute se va a ejecutar esta funcion
    console.log('Validando login de usuario que hizo la consulta...')
    if(logged){
        next()  
    }else{
        res.send({error: 'No tienes permiso para acceder a la ruta /pets'})
    }
}

const middleware2 = ((req,res,next) =>{
    console.log('Soy otro middleware')
    next()
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/') 
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

app.use('/users', usersRouter)
app.use('/pets', middleware1,petsRouter)

const uploader = multer({storage})

app.post('/file',uploader.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send({status:'error'})
    }
    res.send('File uploaded')

})

app.listen(8080, () => console.log('Server Up'))