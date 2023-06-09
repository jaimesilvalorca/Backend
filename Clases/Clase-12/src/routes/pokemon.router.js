import { Router } from "express";
import pokeModel from "../models/pokemon.model.js";

const router = Router()

router.get('/', async (req,res) =>{
    const pokemons = await pokeModel.find().lean().exec()
    console.log(pokemons) 
    res.render('list',{pokemons})  
})

router.get('/create',(req,res)=>{
    res.render('create',{})
})

router.get('/:name',async(req,res)=>{
    const name = req.params.name
    // res.send(`Mostando el pokemon ${name}`)
    const pokemon = await pokeModel.findOne({name}).lean().exec()
    res.render('one',{
        pokemon
    })
})


router.post('/', async (req,res)=>{
    const pokemonNew = req.body
    const pokemonGenerated = new pokeModel(pokemonNew)
    await pokemonGenerated.save()
    // res.send(`Pokemon ${pokemonGenerated.name} Creado!`)
    res.redirect('/pokemon')
})


router.delete('/:name', async(req,res)=>{
    const name = req.params.name
    console.log(name)
    await pokeModel.deleteOne({name})
    res.send('Pokemon borrado')
})
export default router