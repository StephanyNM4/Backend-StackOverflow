// console.log("Hola mundo");
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Database } from './utils/database';
import usuariosRouter from './routers/usuarios.routers';
import preguntasRouter from './routers/preguntas.routers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const database = new Database();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.use('/usuarios', usuariosRouter);
app.use('/preguntas', preguntasRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Servidor hola');
});

app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
});
