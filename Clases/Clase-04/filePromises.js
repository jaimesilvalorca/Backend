const fs = require('fs')

const filename = './archivo_promesas.txt'

const operacionesAsync = async () => {
    await fs.promises.writeFile(filename, 'Saludos desde coder!')

    try {
        let contenido = await fs.promises.readFile(filename, 'utf-8')
        console.log(contenido)
    } catch (err) {
        console.log(err)
    }
    
    await fs.promises.appendFile(filename, '\nOtros Saludos.')
    contenido = await fs.promises.readFile(filename,'utf-8')
    console.log(contenido)
    await fs.promises.unlink(filename)
}

operacionesAsync()