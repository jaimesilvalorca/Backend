const express = require('express')

const app = express()

app.use(express.json())

let datos = [
    { id: 1, name: "backend", teacher: "perrito" },
    { id: 2, name: "backend", teacher: "perrito" },
    { id: 3, name: "backend", teacher: "perrito" },
]
app.get('/', (request, response) => {
    response.send('<h1>Hola mundo</h1>')
})

app.get('/cursos', (request, response) => {
    response.send({
        message: 'sucess',
        data: datos
    })
})

app.get('/saludo/:nombre/:apellido', (request, response) => {
    const nombre = request.params.nombre // URL paramsss parametros enviados por url
    const apellido = request.params.apellido
    response.send(`hola ${nombre} ${apellido}`)
})

app.get('/alumnos', (request, response) => {
    const id = request.query.id
    const alumnos = [
        { id: 1, name: 'felipe' },
        { id: 2, name: 'juan' },
        { id: 3, name: 'pepito' },
        { id: 4, name: 'alex' },
    ]
    const result = alumnos.find(item => item.id == id)
    response.send(`hola ${result.name}`)
})

app.delete('/cursos/:id', (req, res) => { //metodo borrar
    const id = req.params.id
    datos = datos.filter(item => item.id !== +id) //si en el url se ingresa un localhost:8080/cursos/"se entrega el id de 2" el objeto que contiene el 
                                                 //id 2 sera eliminado con la opcion filter de javascript
    res.send(datos)
})

app.post('/cursos', (req,res) =>{
    //const curso = {id:4, name:'Nuevo curso', teacher:'Profe awesome'}
    const curso = req.body
    // const curso = req.body para recibir los datos del cliente a traves del body para no tener que hardcodear el dato
    datos.push(curso)
    res.status(201).send('OK!')
})

app.put('/cursos/:id'),(req,res) =>{
    const id = request.params.id
    const nuevosDatos = req.body
    const cursoIndex = datos.findIndex(item => item.id ==id)
    datos[cursoIndex] = {...datos[cursoIndex],...nuevosDatos}
    res.status(202).send('Ok!!!')
}

app.listen(8080, () => console.log('Server Up'))
