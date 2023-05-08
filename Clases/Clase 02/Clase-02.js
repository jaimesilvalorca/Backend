let i = 0;
let j = 5;

const  myRun = () => {
    i = 1;
    // la j es una varible local para la funcion myRun
    let j;

    if (true){
        console.log(i);
        console.log(j);

    }

}

myRun()
console.log(j)



//Hoisting

// let no tiene hoisting

//console.log(nombre)
//let nombre = "alex"
//let curso
//let edad = 45
//curso = "backend"
//console.log(curso)
//console.log(edad)

console.log(nombre)
var nombre = "alex"
var curso
var edad = 45
curso = "backend"
console.log(curso)
console.log(edad)

// salida undefined, backend y 45 porque var si tiene hosting aun que la variable en el primer console.log no tiene ningun valor por eso es undefined.

// mutabilidad

const person = {
    first: 'Elon',
    last: 'Musk',
    twitter: '@elonmusk',
    company: 'Space X'
}

// person = 45; la constante explota porque una constante es inmutable

person.first = 'Elonn' // aqui el objeto no arroja error poque se entra al objeto y se modifica solo un valor.

console.log(person)

function calculateSalesTotals(sales) {
    return sales.map(({ item, stock = 0, original, discount = 0 }) => {
      const sale = original * (1 - discount);
      const total = sale * stock;
      return { item, stock, original, discount, sale, total };
    });
  }
  
  const sales = [
    { item: 'PS4 Pro', stock: 3, original: 399.99 },
    { item: 'Xbox One X', stock: 1, original: 499.99, discount: 0.1 },
    { item: 'Nintendo Switch', stock: 4, original: 299.99 },
    { item: 'PS2 Console', stock: 1, original: 299.99, discount: 0.8 },
    { item: 'Nintendo 64', stock: 2, original: 199.99, discount: 0.65 }
  ];
  
  const salesTotals = calculateSalesTotals(sales);
  console.log(salesTotals);


let hola = person.map(function(personas){
  console.log(personas)
})
