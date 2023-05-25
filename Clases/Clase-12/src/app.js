import express from "express";
import handlebars from 'express-handlebars'
import pokemonRouter from './routes/pokemon.router.js'
import mongoose from "mongoose";

const url = 'mongodb+srv://coder:coder@cluster0.cmvdrrk.mongodb.net/pokedex'

const app = express()

app.use(express.json()) //recibir datos en formato json
app.use(express.urlencoded({extended: true})) //es para que el form entregue datos decodificados

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/pokemon', pokemonRouter)
app.get('/', (req, res) => {
    res.send('OK')
})
mongoose.set('strictQuery', false)

try {
    await mongoose.connect(url)
    console.log('DB connected!')
    app.listen(8080, () => console.log('Server Up'))
} catch (error) {
    console.log('no se puede conectar a la base de datos')
}


