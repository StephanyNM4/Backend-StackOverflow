import mongoose  from "mongoose";
import { Pregunta, Respuesta} from "./preguntas.model";


const schema = new mongoose.Schema<Pregunta>({
    id: String,
    titulo: String,
    descripcion: String,
    fecha: String,
    votos: Number,
    vistas: Number,
    hashtags: Array<String>,
    idUsuario: String,
    respuestas: Array<Respuesta>
});

export const PreguntaSchema = mongoose.model('preguntas', schema);