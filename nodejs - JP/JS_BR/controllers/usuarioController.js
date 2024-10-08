import { check, validationResult } from 'express-validator'
import Usuario from "../models/Usuario.js"
import { generarId, generarJWT } from '../helpers/tokens.js'
import { emailOlvidePassword, emailRegistro } from '../helpers/emails.js'
import bcrypt from 'bcrypt'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        csrfToken:req.csrfToken()
    })
}

const autenticar = async(req,res)=>{

    await check('email').isEmail().withMessage("El email es obligatorio").run(req)
    await check('password').notEmpty().withMessage('El password es obligatorio').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado no este vacio

    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken:req.csrfToken(),
            errores: resultado.array(),
        })
    }

    const {email,password} = req.body
    //comprobar si el usuario existe

    const usuario = await Usuario.findOne({where:{email}})
    if(!usuario){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken:req.csrfToken(),
            errores: [{msg:'El usuario no existe'}],
        })
    }

    if(!usuario.confirmado){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken:req.csrfToken(),
            errores: [{msg:'El usuario no esta confirmado'}],
        })

    }

    // Revisar el password

    if(!usuario.verificarPassword(password)){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken:req.csrfToken(),
            errores: [{msg:'El password es incorrecto'}],
        })
    }

    //Autenticar al usuario 

    const token = generarJWT({id:usuario.id,nombre:usuario.nombre})

    return res.cookie('_token',token,{
        httpOnly:true,
        // secure:true,
        // sameSite:true
    }).redirect('/mis-propiedades')




    

}

const formularioRegistro = (req, res) => {

    console.log(req.csrfToken())

    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken:req.csrfToken()
    })

}

const registrar = async (req, res) => {
    //validacion

    await check('nombre').notEmpty().withMessage("El nombre no puede estar vacio").run(req)
    await check('email').isEmail().withMessage("No es un correo").run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los passwords no son iguales').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este vacio


    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken:req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }


    const {nombre,email,password} = req.body
    //verificar si existe el usuario
    const existeUsuario = await Usuario.findOne({ where: { email} })

    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken:req.csrfToken(),
            errores: [{ msg: 'El usuario ya esta registrado' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    
    // Almacenar un usuario?

    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token:generarId()   
    })

    //envia email de confirmacion

    emailRegistro({
        nombre:usuario.nombre,
        email:usuario.email,
        token:usuario.token
    })

    res.render('template/mensaje',{
        pagina: 'Cuenta Creada Correctamente',
        mensaje:'Hemos enviado un email de confirmacion, presiona en el enlace'
    })

}

const confirmar = async(req,res,)=>{
    const {token} = req.params

    console.log(token)
    console.log('Comprobandoooo')

    // verificar si el token es valido

    const usuario = await Usuario.findOne({where:{token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Error al confirmar tu cuenta',
            mensaje:'Hay un error al confirmar tu cuenta, intenta de nuevo',
            error:true
        })
    }

    // confirmar la cuenta

    usuario.token = null;
    usuario.confirmado = true

    await usuario.save()

    res.render('auth/confirmar-cuenta',{
        pagina: 'Cuenta confirmada',
        mensaje:'La cuenta se confirmo correctamente',
        error:false
    })

}


const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Olvidé mi contraseña',
        csrfToken: req.csrfToken()
    })
}

const resetPassword = async(req,res)=>{

    await check('email').isEmail().withMessage("No es un correo").run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este vacio


    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken:req.csrfToken(),
            errores: resultado.array()
        })
    }

    const {email} = req.body

    const usuario = await Usuario.findOne({where:{email}})

    if(!usuario){
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a Bienes Raices',
            csrfToken:req.csrfToken(),
            errores: [{msg:'El email no pertenece a ningun usuario'}]
        })
    }

    usuario.token = generarId();
    await usuario.save()

    // enviar Email
    emailOlvidePassword({
        email:usuario.email,
        nombre:usuario.nombre,
        token:usuario.token

    })

    //Renderizar mensaje
    res.render('template/mensaje',{
        pagina: 'Reestablece tu password',
        mensaje:'Hemos enviado un email con las instrucciones'
    })



}

const comprobarToken = async(req,res)=>{

    const { token } = req.params

    const usuario = await Usuario.findOne({where:{token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Restablece tu password',
            mensaje:'Hubo un error al validar tu información,intenta de nuevo',
            error:true
        })
    }

    //Mostrar un formulario para modificar el password

    res.render('auth/reset-password',{
        pagina:'Restablece tu password',
        csrfToken:req.csrfToken()
    })

}

const nuevoPassword = async(req,res)=>{

    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este vacio


    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/reset-password', {
            pagina: 'Restablece tu password',
            csrfToken:req.csrfToken(),
            errores: resultado.array(),
        })
    }

    const {token} = req.params
    const {password} = req.body

    //identificar un usuario
    const usuario = await Usuario.findOne({where:{token}})

    //hashear password

    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password,salt)
    usuario.token = null

    await usuario.save()

    res.render('auth/confirmar-cuenta',{
        pagina:'Password restablecido',
        mensaje:'El password se guardó correctamente'
        
    }
    )


}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    confirmar,
    registrar,
    resetPassword,
    comprobarToken,
    nuevoPassword,
    autenticar
}