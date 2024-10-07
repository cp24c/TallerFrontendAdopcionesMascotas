import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { db } from './database/db.js'
import { router as routerSolicitudes } from './routes/solicitudes.routes.js';
import { router as routerMascotas } from './routes/mascotas.routes.js'
import path from 'path';

// Instanciación de express.
const app = express();
// Se agrega middleware CORS e interprete de JSON.
app.use(cors());
app.use(express.json());

// Verificar y crear la carpeta 'uploads' si no existe
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//conexión a la base de datos (db sequelize).
db.authenticate()
    .then(() => {
        console.log(`■ Conexión exitosa a la base de datos!`);
        return db.sync();
    })
    .then(() => {
        const PORT = 3000;
        app.listen(PORT, () => {
            // Confirmación del servidor corriendo
            console.log(`■ Servidor corriendo en el puerto ${PORT}\n`);
        });
    })
    .catch(err => {
        console.error(`■ Conexión fallida a la base de datos: \n${err}}`);
    });

app.use('/adopcionespaz', routerSolicitudes);
app.use('/adopcionespaz', routerMascotas);