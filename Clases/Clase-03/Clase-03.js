const originales = [1,2,3,4,5]

const callback = element => {
    return element +1
}

const nuevosValores = originales.map(callback) //callback es una funcion, es un argumento de otra funcion
console.log(nuevosValores)

