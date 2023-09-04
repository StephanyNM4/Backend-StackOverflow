import express from "express";
import { crearPregunta, modificarVotos, obtenerDetallePregunta, obtenerPreguntas, obtenerRespuesta } from "../controllers/preguntas.controller";

const router = express();


// (collection preguntas) get preguntas cruce con usuario para obtener nombre e imagen
//http://localhost:8088/preguntas
router.get('/', obtenerPreguntas);

// (collection preguntas) post crear pregunta (push de la pregunta en el usuario que hizo la pregunta)
//http://localhost:8088/preguntas/:id/usuario/crear-pregunta
router.post('/:id/usuario/crear-pregunta', crearPregunta);

// (collection preguntas) get detalle pregunta cruce con usuario para obtener nombre e url imagen
//http://localhost:8088/preguntas/:id/pregunta
router.get('/:id/pregunta', obtenerDetallePregunta);

// (collection preguntas) put actualizar votos de preguntas con botones en javascript
//http://localhost:8088/preguntas/:id/pregunta/modificar-votos
router.put('/:id/pregunta/modificar-votos', modificarVotos);

// (collection preguntas) get respuestas para pregunta seleccionada y un cruce con el usuario que respondio para obtener nombre e imagen
//http://localhost:8088/preguntas/:id/pregunta/respuestas
router.get(`/:id/pregunta/respuestas`, obtenerRespuesta);



export default router;