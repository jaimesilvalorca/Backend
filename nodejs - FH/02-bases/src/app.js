const {getUUID,getAge} = require('./plugins')

const getPokemonById = require('./js-foundation/08-promises')


const pokemon = getPokemonById(4).then(pokemon=>console.log(pokemon))



















// !! referencia  funcion factory y uso!!!

// const {getUUID,getAge} = require('./plugins')
// const {emailTemplate}= require('./js-foundation/01-template')
// require('./js-foundation/02-destructuring')
// const {getUserById}=require('./js-foundation/03-callbacks')
// console.log(emailTemplate)
// getUserById(1,function(error,user){
//     if(error){
//         throw new Error('User not found with id',id)
//     }
//     console.log(user)
// })
// require('./js-foundation/05-factory')
// const {buildMakePerson} = require('../src/js-foundation/05-factory')
// const makePerson = buildMakePerson({getUUID,getAge})
// const obj = { name: 'Jaime', birthdate: '1992-10-09' }
// const john = makePerson(obj)
// console.log({john})