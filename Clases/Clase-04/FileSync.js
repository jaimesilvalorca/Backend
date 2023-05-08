const fs = require('fs') // FileSystem //se trajo todo el modulo filesystem

const filename = './ejemplo.txt'

fs.writeFileSync(filename,'Hola mundo') // esta funcion sobrescribe los datos, se pierde lo anterior



if(fs.existsSync(filename)){ //condicion para buscar si existe algun archivo.
    
    const contenido = fs.readFileSync(filename, 'utf-8') // recibe dos argumentos el archivo y la codificacion en la que esta escrita.

    fs.appendFileSync(filename, 'Chao mundoaaaa')

    console.log(contenido)
}else{
    console.log('No existe ningun archivo')
}

