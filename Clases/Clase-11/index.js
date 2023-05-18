import mongoose from "mongoose";

const estudiantes = [
    {
        nombre:'Jaime',
        apellidos:'Silva',
        curso:'DW'
    },
    {
        nombre:'Pedro',
        apellidos: 'Mei',
        edad:21,
        curso:'Backend'
    },
    {
        nombre:'Susana',
        apellidos:'Oria',
        edad:21,
        curso:'ReactJs'
    },
    {
        nombre:'Julio',
        apellidos:'Lopez',
        edad:28,
        curso:'ReactJs'
    },
    {
        nombre:'Felipe',
        apellidos:'Rodriguez',
        edad:29,
        curso:'Angular'
    }
]

const estudiantesSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    apellidos:{type:String,required:true},
    edad:{type:Number,required:true},
    curso:{type:String,required:true}
})

const EstudiantesDAO = mongoose.model('EstudiantesMany',estudiantesSchema)

await mongoose.connect('mongodb+srv://coder:coder@cluster0.cmvdrrk.mongodb.net/colegio',{
    serverSelectionTimeoutMS: 5000,

})

console.log('Base de datos conectada')

// for (const estudiante of estudiantes){ //recorre el array y llama al dao para crear el esquema
//     await EstudiantesDAO.create(estudiante)
// }

for(const estudiante of estudiantes){
    try {
        await EstudiantesDAO.create(estudiante)       
    } catch (error) {
        console.log('Documento no cumple con el Schema')      
    }
}

// await EstudiantesDAO.insertMany(estudiantes)


console.log('Documentos creados!')