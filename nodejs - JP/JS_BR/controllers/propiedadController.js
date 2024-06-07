import { validationResult } from "express-validator"
import {Categoria,Precio,Propiedad} from '../models/index.js'



const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis propiedades',
        barra: true
    })
}

// Formulario para crear una nueva propiedad

const crear = async (req, res) => {

    //Consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])


    res.render('propiedades/crear', {
        pagina: 'Mis propiedades',
        csrfToken:req.csrfToken(),
        categorias: categorias,
        precios: precios,
        barra: true,
        datos:{}
    })
}

const guardar = async (req, res) => {

    let resultado = validationResult(req)

    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    if (!resultado.isEmpty()) {

        return res.render('propiedades/crear', {
            pagina: 'Mis propiedades',
            barra: true,
            csrfToken:req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos:req.body
        })
    }
    const {titulo,descripcion,categoria:categoriaId,precio:precioId,habitaciones,estacionamiento,wc,calle,lat,lng} = req.body
    console.log(req.usuario)

    const {id:usuarioId} = req.usuario

    try {


        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId,
            usuarioId,
            imagen:''
        })

        const {id} = propiedadGuardada

        res.redirect(`/propiedades/agregar-imagen/${id}`)

        
    } catch (error) {

        console.log(error)
        
    }


}

export {
    admin,
    crear,
    guardar
}