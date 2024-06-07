import express from "express"
import csurf from "csurf"
import cookieParser from "cookie-parser"
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import db from "./config/db.js"


// Crear la app

const app = express()

// Habilitar request de usuarios

app.use(express.urlencoded({extended:true}))

//Habilitar Cookie Parser

app.use(cookieParser())

// Habilitar CSRF

app.use(csurf({cookie:true}))
//Conexion a la base de datos

try {
    await db.authenticate()
    db.sync()
    console.log('Conexion a la base de datos correcta')    
} catch (error) {
    console.log(error)
}

// Habilitar Pug

app.set('view engine','pug')
app.set('views','./views')


// Carpeta Publica

app.use(express.static('public'))

//Routing

app.use('/auth',usuarioRoutes)
app.use('/',propiedadesRoutes)




// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})
