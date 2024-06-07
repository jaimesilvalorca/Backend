const {getUUID} = require('./get-id.plugin')
const {getAge}= require('./get-age.plugin')
const {http} = require('./http-client')
const {httpAxios} = require('./axios.plugin')

module.exports ={
    getUUID,
    getAge,
    http,
    httpAxios
}