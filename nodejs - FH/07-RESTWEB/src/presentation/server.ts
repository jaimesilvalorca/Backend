import express from 'express'
import path from 'path'

export class Server {


    private app = express()


    async start() {

        //Middlewares

        //Public Folder

        this.app.use(express.static('public'))

        this.app.get('*',(req,res)=>{
            console.log(req.url)

            const indexPath = path.join(__dirname + '../../../public/index.html')

            res.sendFile(indexPath)
        })


        this.app.listen(8080, () => {
            console.log('Server running on port: ', 8080)
        })
    }
}