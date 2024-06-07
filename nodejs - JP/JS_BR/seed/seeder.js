import {exit} from 'node:process'
import categorias from "./categorias.js";
import precios from './precios.js';
import usuarios from './usuarios.js';
import db from "../config/db.js";
import {Categoria, Precio,Propiedad,Usuario} from '../models/index.js'


const importarDatos = async()=>{
    try {

        //Autenticar

        await db.authenticate()


        // Generar las Columnas

        await db.sync()


        // Insertar los datos

        //bulkCreate inserta multiples datos


        // la linea 28 y 29 pueden ser utilizados solo cuando una funcion asincrona depende de la otra,
        // como por ejemplo si dependiera de una FK por lo que necesita que se ejecute una y luego la otra
        // await Categoria.bulkCreate(categorias)
        // await Precio.bulkCreate(precios)
        


        // En este caso ninguna depende de la otra por lo que se puede ejecutar ambas
        await Promise.all([

            Categoria.bulkCreate(categorias),

            Precio.bulkCreate(precios),

            Usuario.bulkCreate(usuarios)

        ])

        console.log('Datos Importados Correctamente')
        exit()


        
    } catch (error) {

        console.log(error)
        exit(1)
        
    }

}

const eliminarDatos = async()=>{
    try {

        await db.drop()
        
    } catch (error) {
        console.log(error)
        exit()
    }
}

//i de importar
if(process.argv[2] === "-i"){
    importarDatos()

}

//e de eliminar
if(process.argv[2] === "-e"){
    eliminarDatos()

}