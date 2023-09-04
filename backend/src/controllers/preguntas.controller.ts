import mongoose from "mongoose";
import { Request, Response } from "express";
import { PreguntaSchema } from "../modules/preguntas.schema";
import { UsuarioSchema } from "../modules/usuario.schema";




//Obtener todas las preguntas con imagen y nombre de usuario (cruce)
export const obtenerPreguntas = async (req: Request, res: Response) => {
    try {
        const result = await PreguntaSchema.aggregate([
            {
                $lookup: {
                from: 'usuarios',
                localField: 'idUsuario',
                foreignField: 'id',
                as: 'detallePreguntasConUsuario',
                },
            },
            {
                $project: {
                    "detallePreguntasConUsuario.preguntas": false,
                },
            },
        ]).exec();
        // res.json(result);
        res.send({status: true, message: 'Preguntas oobtenidas', result});
        res.end();
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
        }
    }

// (collection preguntas) post crear pregunta (push de la pregunta en el usuario que hizo la pregunta)
export const crearPregunta = (req:Request, res:Response) => {
    let nuevaPregunta = new PreguntaSchema(req.body);
    nuevaPregunta.save()
    .then(resultado=>{
        UsuarioSchema.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)},{
            
                $push: {
                    preguntas: {
                        id: resultado.id,
                        titulo: resultado.titulo
                    }
                }
            }
            ).then((result)=>{
                // res.send({status: true, message: 'Comentario agregado', result});
                // res.end();
            }).catch((error)=>{
                // res.send(error);
                // res.end();
            });

        res.send({status: true, message: 'Pregunta agregada', resultado});
        res.end();
    })
    .catch(error=>{
        res.send({status: false, message: 'Pregunta no agregada', error});
        res.end();
    })

    
}

// (collection preguntas) get detalle pregunta cruce con usuario para obtener nombre e url imagen
export const obtenerDetallePregunta = async (req: Request, res: Response) => {
    try {
        const idPregunta = req.params.id;
        const result = await PreguntaSchema.aggregate([
            {
                $lookup: {
                from: 'usuarios',
                localField: 'idUsuario',
                foreignField: 'id',
                as: 'detallePreguntasConUsuario',
                },
            },
            {
                $match: {
                _id: new mongoose.Types.ObjectId(idPregunta),
                },
            },
            {
                $project: {
                    "detallePreguntasConUsuario.preguntas": false,
                },
            },
        ]).exec();
        // res.json(result);
        res.send(result[0]);
        res.end();
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
        }
    }

// (collection preguntas) put actualizar votos de preguntas con botones en javascript
export const modificarVotos = (req:Request, res:Response) => {
    PreguntaSchema.updateOne({id: req.params.id},{votos: req.body.votos}
    ).then((result)=>{
        res.send({status: true, message: 'Comentario agregado', result});
        res.end();
    }).catch((error)=>{
        res.send(error);
        res.end();
    });
}

// (collection preguntas) get respuestas para pregunta seleccionada y un cruce con el usuario que respondio para obtener nombre e imagen
export const obtenerRespuesta = async (req: Request, res: Response) => {
    try {
        const idPregunta = new mongoose.Types.ObjectId(req.params.id);
        const result = await PreguntaSchema.aggregate([
            {
                $lookup: {
                from: 'usuarios',
                localField: 'idUsuario',
                foreignField: 'id',
                as: 'detallePreguntaConUsuario',
                },
            },
            {
                $match: {
                _id: new mongoose.Types.ObjectId(idPregunta),
                },
            },
            {
                $project: {
                    respuestas:true,
                    "detallePreguntaConUsuario.urlImage": true,
                    "detallePreguntaConUsuario.nombre": true,
                },
            },
        ]).exec();
        // res.json(result);
        res.send(result[0]);
        res.end();
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
        }
    }

// export const obtenerUsuarios = (req:Request, res:Response) => {
//     res.send('Usuarios obtenidos')
// }

