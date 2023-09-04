"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreguntaSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    id: String,
    titulo: String,
    descripcion: String,
    fecha: String,
    votos: Number,
    vistas: Number,
    hashtags: (Array),
    idUsuario: String,
    respuestas: (Array)
});
exports.PreguntaSchema = mongoose_1.default.model('preguntas', schema);
