import { Router } from 'express'

let pets = []

const router = Router()

//localhost:8080/users este archivo responde a la ruta users
router.get('/', (req, res) => {
    res.send({pets})
})

router.post('/',(req,res)=>{
    const pet = req.body
    pets.push(pet)
    res.send({status: 'success'})
})

 
export default router