//let production = () => {
//    console.log('Starting production.....')
//    setTimeout(() => {
//        console.log('Calentar el agua')
//    }, 3000)
//    console.log('Vertir la yerba mate en el mate')
//    console.log('Tapar el mate con la mano y sacudir')
//    console.log('Acomodar la yerba de forma inclinada')
//    console.log('Agregar un poco de agua')
//    console.log('introducir la bombilla tapando la punta')
//    console.log('desechar el primer sorbo de mate')
//    console.log('Aggregar agua caliente')
//}

//production() // estos son procesos sincronicos, es decir, bloqueantes! || //se agrego un proceso asincronico bloqueando el primer argumento


const posts = [
    {tittle: 'Post One', body: 'This is the post One'},
    {tittle: 'Post Two', body: 'This is the post Two'},
]

function getPosts(){
    setTimeout(()=>{
        let output = ''
        posts.forEach(post =>{
            output += `<li>${post.tittle}</li>`
        })
        document.body.innerHTML = output

    },2000)
}

function createPost (post){
    return new Promise ((resolve,reject) => {
        setTimeout(()=>{
            posts.push(post)
            const error = true
            if(!error){
                resolve()
            }else{
                reject('Error!')
            }

        },2000)
    })
}

createPost({tittle:'Post Three',body:''})
    .then(getPosts)
    .catch(error =>document.body.innerHTML = error)
