//mayuscula con coma
import mongoose  from "mongoose";
import { Usuario} from "./usuarios.model";
import { BasePregunta } from "./preguntas.model";

const schema = new mongoose.Schema<Usuario>({
    id: String,
    nombre: String,
    urlImage: String,
    preguntas: Array<BasePregunta>
})

export const UsuarioSchema = mongoose.model('usuarios', schema);