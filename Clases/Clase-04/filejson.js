const fs = require ('fs')

const filename = './ejemplo.json'

const cliente1 ={
    name:'Alex',
    lastname:'Marin',
    age:45
}

const cliente2 ={
    name:'Alexia',
    lastname:'Marin',
    age:45
}

const cliente3 ={
    name:'Alexis',
    lastname:'Marin',
    age:45
}

fs.writeFileSync(filename,JSON.stringify([cliente1,cliente2,cliente3],null,'\t'))
const contenido = JSON.parse(fs.readFileSync(filename,'utf-8'))
contenido.age = 35
fs.writeFileSync(filename,JSON.stringify(contenido,null,'\t'))
