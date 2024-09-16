import { yarg } from "./config/plugins/args.plugin"
import { ServerApp } from "./presentation/server-app"



(async ()=>{
    await main()
    console.log('fin del programa')
})()


async function main() {
    const {b:base,l:limit,s:showTable,n:name,d:destination} = yarg
    ServerApp.run({base,limit,showTable,name,destination})

    
}