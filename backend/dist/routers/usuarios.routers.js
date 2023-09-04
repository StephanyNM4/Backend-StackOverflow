"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.default)();
// (collection usuarios) get todos los usuarios para listar usuarios
//http://localhost:8088/usuarios/
router.get('/', usuario_controller_1.obtenerUsuarios);
// (collection usuarios) get usuario 
//http://localhost:8088/usuarios/:id/usuario
router.get('/:id/usuario', usuario_controller_1.obtenerUsuario);
exports.default = router;
