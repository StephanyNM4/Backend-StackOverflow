import mongoose from "mongoose";
import { BasePregunta } from "./preguntas.model";

export interface Usuario {
    _id?: mongoose.Types.ObjectId;
    id: string;
    nombre:string;
    urlImage:string;
    preguntas: Array<BasePregunta>;
}