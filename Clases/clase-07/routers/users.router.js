import { Router } from 'express'

const router = Router()

//localhost:8080/users este archivo responde a la ruta users
router.get('/', (req, res) => {
    res.send('OK nuevamente!')
})

 
export default router