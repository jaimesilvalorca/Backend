const objeto ={}

for (let i=0; i<10000; i++){
    const numero = console.log(parseInt(Math.random() *20 + 1))
    if(!objeto[numero]) objeto[numero] = 1
    else objeto[numero]++
}

console.log(objeto)