console.log('Hola mundo')
const socketClient = io()

let chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter')
    socketClient.emit('message', chatBox.value)
})

socketClient.on('history',data =>{
    console.log(data)
    let history = document.getElementById('history')
    let messages = ''
    data.forEach(message =>{
        messages+= `${message}<br />`
    
    })
    history.innerHTML = messages
})