"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerRespuesta = exports.modificarVotos = exports.obtenerDetallePregunta = exports.crearPregunta = exports.obtenerPreguntas = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const preguntas_schema_1 = require("../modules/preguntas.schema");
const usuario_schema_1 = require("../modules/usuario.schema");
//Obtener todas las preguntas con imagen y nombre de usuario (cruce)
const obtenerPreguntas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield preguntas_schema_1.PreguntaSchema.aggregate([
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
        res.send({ status: true, message: 'Preguntas oobtenidas', result });
        res.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.obtenerPreguntas = obtenerPreguntas;
// (collection preguntas) post crear pregunta (push de la pregunta en el usuario que hizo la pregunta)
const crearPregunta = (req, res) => {
    let nuevaPregunta = new preguntas_schema_1.PreguntaSchema(req.body);
    nuevaPregunta.save()
        .then(resultado => {
        usuario_schema_1.UsuarioSchema.updateOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }, {
            $push: {
                preguntas: {
                    id: resultado.id,
                    titulo: resultado.titulo
                }
            }
        }).then((result) => {
            // res.send({status: true, message: 'Comentario agregado', result});
            // res.end();
        }).catch((error) => {
            // res.send(error);
            // res.end();
        });
        res.send({ status: true, message: 'Pregunta agregada', resultado });
        res.end();
    })
        .catch(error => {
        res.send({ status: false, message: 'Pregunta no agregada', error });
        res.end();
    });
};
exports.crearPregunta = crearPregunta;
// (collection preguntas) get detalle pregunta cruce con usuario para obtener nombre e url imagen
const obtenerDetallePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPregunta = req.params.id;
        const result = yield preguntas_schema_1.PreguntaSchema.aggregate([
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
                    _id: new mongoose_1.default.Types.ObjectId(idPregunta),
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.obtenerDetallePregunta = obtenerDetallePregunta;
// (collection preguntas) put actualizar votos de preguntas con botones en javascript
const modificarVotos = (req, res) => {
    preguntas_schema_1.PreguntaSchema.updateOne({ id: req.params.id }, { votos: req.body.votos }).then((result) => {
        res.send({ status: true, message: 'Comentario agregado', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.modificarVotos = modificarVotos;
// (collection preguntas) get respuestas para pregunta seleccionada y un cruce con el usuario que respondio para obtener nombre e imagen
const obtenerRespuesta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPregunta = new mongoose_1.default.Types.ObjectId(req.params.id);
        const result = yield preguntas_schema_1.PreguntaSchema.aggregate([
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
                    _id: new mongoose_1.default.Types.ObjectId(idPregunta),
                },
            },
            {
                $project: {
                    respuestas: true,
                    "detallePreguntaConUsuario.urlImage": true,
                    "detallePreguntaConUsuario.nombre": true,
                },
            },
        ]).exec();
        // res.json(result);
        res.send(result[0]);
        res.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.obtenerRespuesta = obtenerRespuesta;
// export const obtenerUsuarios = (req:Request, res:Response) => {
//     res.send('Usuarios obtenidos')
// }
