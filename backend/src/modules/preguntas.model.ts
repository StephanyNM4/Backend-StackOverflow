import mongoose from "mongoose";
//minuscula con punto y coma

export interface BasePregunta {
    id: string;
    titulo: string;
}

export interface Respuesta {
    _id?: mongoose.Types.ObjectId;
    id:string;
    descripcion:number;
    fecha:string;
    votos:number;
    idUsuario:string;
}

export interface Pregunta extends BasePregunta {
    _id?: mongoose.Types.ObjectId;
    descripcion: string;
    fecha: string;
    votos:number;
    vistas:number;
    hashtags:Array<string>;
    idUsuario:string;
    respuestas:Array<Respuesta>
}