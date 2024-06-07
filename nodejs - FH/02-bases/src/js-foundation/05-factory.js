// const {getUUID,getAge} = require('../plugins')


const obj = { name: 'Jaime', birthdate: '1992-10-09' }

const buildMakePerson = ({ getUUID, getAge }) => {

    return ({ name, birthdate }) => {



        return {
            id: getUUID(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
    }
}


module.exports = {
    buildMakePerson

}