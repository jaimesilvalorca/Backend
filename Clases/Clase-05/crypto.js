const crypto = require('crypto')

const DB = []

class UserManager {

    getusers = () =>{
        return DB
    }

    insertUser = user =>{
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto.createHmac('sha256',user.salt).update(user.password).digest('hex')
        DB.push(user)
        return user
    }

    valideUser = (username,password) =>{
        const user = DB.find(item => item.username == username)
        if(!user){
            console.log('User not found')
            return
        }
        const newHash = crypto.createHmac('sha256',user.salt).update(password).digest('hex')
        if(newHash === user.password) console.log('Logged!')
        else console.log('Invalid Password')
    }

}

const user = new UserManager()

user.insertUser({
    name:'Alex',
    lastname:'Marin',
    username:'alexmarinmendez',
    password:'c0d3r'
})

console.log(DB)
user.valideUser('alexmarinmendez','c0d3r')
user.valideUser('alexmarinmendez','caca')
user.valideUser('coderprofe','c0d3r')


