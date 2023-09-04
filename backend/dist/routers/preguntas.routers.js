"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const preguntas_controller_1 = require("../controllers/preguntas.controller");
const router = (0, express_1.default)();
// (collection preguntas) get preguntas cruce con usuario para obtener nombre e imagen
//http://localhost:8088/preguntas
router.get('/', preguntas_controller_1.obtenerPreguntas);
// (collection preguntas) post crear pregunta (push de la pregunta en el usuario que hizo la pregunta)
//http://localhost:8088/preguntas/:id/usuario/crear-pregunta
router.post('/:id/usuario/crear-pregunta', preguntas_controller_1.crearPregunta);
// (collection preguntas) get detalle pregunta cruce con usuario para obtener nombre e url imagen
//http://localhost:8088/preguntas/:id/pregunta
router.get('/:id/pregunta', preguntas_controller_1.obtenerDetallePregunta);
// (collection preguntas) put actualizar votos de preguntas con botones en javascript
//http://localhost:8088/preguntas/:id/pregunta/modificar-votos
router.put('/:id/pregunta/modificar-votos', preguntas_controller_1.modificarVotos);
// (collection preguntas) get respuestas para pregunta seleccionada y un cruce con el usuario que respondio para obtener nombre e imagen
//http://localhost:8088/preguntas/:id/pregunta/respuestas
router.get(`/:id/pregunta/respuestas`, preguntas_controller_1.obtenerRespuesta);
exports.default = router;
