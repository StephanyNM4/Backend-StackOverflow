"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("Hola mundo");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./utils/database");
const usuarios_routers_1 = __importDefault(require("./routers/usuarios.routers"));
const preguntas_routers_1 = __importDefault(require("./routers/preguntas.routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const database = new database_1.Database();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/usuarios', usuarios_routers_1.default);
app.use('/preguntas', preguntas_routers_1.default);
app.get('/', (req, res) => {
    res.send('Servidor hola');
});
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
});
