import { Request, Response } from "express";
import {UsuarioSchema} from '../modules/usuario.schema';
import mongoose from "mongoose";


//Obtener todos los usuarios
export const obtenerUsuarios = (req:Request, res:Response) => {
    UsuarioSchema.find()
    .then(resultado=>{
        res.send({status: true, message: 'Usuarios obtenidos con exito', resultado});
        res.end();
    })
    .catch(error=>{
        res.send({status: false, message: 'Usuarios no encontrados', error});
        res.end();
    })
}

export const obtenerUsuario = (req:Request, res:Response) => {
    UsuarioSchema.findOne({_id: new mongoose.Types.ObjectId(req.params.id)})
    .then(resultado=>{
        res.send({status: true, message: 'Usuario obtenidos con exito', resultado});
        res.end();
    })
    .catch(error=>{
        res.send({status: false, message: 'Usuario no encontrados', error});
        res.end();
    })
}

// export const obtenerUsuarios = (req:Request, res:Response) => {
//     res.send('Usuarios obtenidos')
// }