
const axios = require('axios')


const httpAxiosPlugin = {

    get:async(url)=>{
        
        const {data} = await axios.get(url)
        console.log(data)
        return data
    }


}

module.exports = {
    httpAxios:httpAxiosPlugin
}