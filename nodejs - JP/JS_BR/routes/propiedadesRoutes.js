import { Router } from "express"
import {body} from 'express-validator'
import { admin, crear,guardar } from "../controllers/propiedadController.js"
import protegerRuta from "../middleware/protegerRuta.js"

const router = Router()

router.get('/mis-propiedades',protegerRuta ,admin)
router.get('/propiedades/crear',protegerRuta, crear)
router.post('/propiedades/crear',
    body('titulo').notEmpty().withMessage('El Titulo del anuncio es obligatorio'), 
    body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia').isLength({max:200}).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoría'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionemientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').notEmpty().withMessage("Ubica la propiedad en el mapa"),
    guardar)
export default router