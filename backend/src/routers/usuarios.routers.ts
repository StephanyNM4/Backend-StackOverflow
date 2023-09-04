import express from "express";
import { obtenerUsuario, obtenerUsuarios } from "../controllers/usuario.controller";

const router = express();

// (collection usuarios) get todos los usuarios para listar usuarios
//http://localhost:8088/usuarios/
router.get('/', obtenerUsuarios);

// (collection usuarios) get usuario 
//http://localhost:8088/usuarios/:id/usuario
router.get('/:id/usuario', obtenerUsuario);



export default router;