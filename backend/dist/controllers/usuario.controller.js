"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuario = exports.obtenerUsuarios = void 0;
const usuario_schema_1 = require("../modules/usuario.schema");
const mongoose_1 = __importDefault(require("mongoose"));
//Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
    usuario_schema_1.UsuarioSchema.find()
        .then(resultado => {
        res.send({ status: true, message: 'Usuarios obtenidos con exito', resultado });
        res.end();
    })
        .catch(error => {
        res.send({ status: false, message: 'Usuarios no encontrados', error });
        res.end();
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => {
    usuario_schema_1.UsuarioSchema.findOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) })
        .then(resultado => {
        res.send({ status: true, message: 'Usuario obtenidos con exito', resultado });
        res.end();
    })
        .catch(error => {
        res.send({ status: false, message: 'Usuario no encontrados', error });
        res.end();
    });
};
exports.obtenerUsuario = obtenerUsuario;
// export const obtenerUsuarios = (req:Request, res:Response) => {
//     res.send('Usuarios obtenidos')
// }
