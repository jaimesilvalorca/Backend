const getPokemonById = (id) =>{

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
    .then((resp)=>{
        return resp.json()
    })
    .then(()=>{throw new Error("el pokemon no existe")})
    .then((pokemon)=> pokemon.name)

    // return 'Pokemon'



}


module.exports = getPokemonById