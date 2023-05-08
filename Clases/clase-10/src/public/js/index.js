console.log('index.js listo')
socket = io()
let user = ''
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Authentication para el chat',
    input: 'text',
    text: 'Set a username for the Coder\s chat',
    inputValidator: value => !value.trim() && 'Please, write a username!',
    allowOutsideClick: false
}).then(result =>{
    user = result.value
    console.log(user)
    document.getElementById('username').innerHTML = user
    chatBox.addEventListener('keyup', event =>{
        if(event.key === "Enter"){
            if(chatBox.value.trim().length >0){
                socket.emit('message',{
                    user,
                    message: chatBox.value
                })
                chatBox.value = ''
            }
        }
    })
    
    socket.on('logs', data =>{
        const messagesLog = document.getElementById('messagesLog')
        let messages = ''
        data.reverse().forEach(message => {
            messages += `<p>[<i>${message.user}</i>]: ${message.message}</p>`
            messagesLog.innerHTML = messages
        });                    
        socket.on('newUser', ()=>alert('Nuevo usuario conectado'))
    })
})


