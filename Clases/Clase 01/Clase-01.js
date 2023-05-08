isReverseInt = (num1, num2) => {
    //toString() transfomar un numero a string
    //split("") transformar un string a arreglo
    //reverse() invertir el arreglo
    //join() transformar un arreglo a string
    //parseInt transformar un string a number
    // Math.sign retorna el signo del numero que se esta entregando en la funcion
    const covertAndReverse = num1.toString().split("").reverse().join(""); 
        // se define la constante para transformar el numero uno que recibe la funcion, luego se transformar en cadena, luego en arreglo y este se invierte para luego transformar
        // de nuevo a string, luego se transforma el arreglo luego se multiplica por el signo del numero anterior y es comparado.

        console.log(covertAndReverse)
    return (parseInt(covertAndReverse) * Math.sign(num1)) === num2
}

console.log(isReverseInt(123, 321))
console.log(isReverseInt(123, 342))
console.log(isReverseInt(-123, -321))

const person = {
    first: 'Elon',
    last: 'Musk',
    twitter: '@elonmusk',
    company: 'Space X'
}




//object.key entrega first,last,twitter,company}
//object.values entrega elon,musk,@elonmusk,space X
//object.entries entrega llave valor en un arreglo

let hola = Object.entries(person).map(function(personas,key){
    console.log(personas)
    console.log(key)
})

