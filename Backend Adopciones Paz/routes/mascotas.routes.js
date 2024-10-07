import express from 'express';
import multer from 'multer';
import { Mascota } from '../models/mascota.model.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Configuración de multer para la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Ruta para ingresar una nueva mascota
router.post('/ingresarmascota', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, edad, especie, raza, sexo, contacto } = req.body;
        const nuevaMascota = await Mascota.create({
            nombre,
            edad,
            especie,
            raza,
            sexo,
            contacto,
            imagen: req.file.filename // Guardar el nombre del archivo de la imagen
        });
        res.status(201).json(nuevaMascota);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Método para obtener la imagen de la mascota
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/imagenmascota/:nombreImagen', (req, res) => {
    const nombreImagen = req.params.nombreImagen;
    const rutaImagen = path.join(__dirname, '../uploads', nombreImagen);

    // Verificar si el archivo existe
    if (fs.existsSync(rutaImagen)) {
        res.sendFile(rutaImagen);
    } else {
        res.status(404).json({ error: 'Imagen no encontrada' });
    }
});

//Listar mascotas disponibles para adoptar
router.get('/mascotasdisponibles', async (req, res) => {
    try {
        // Filtrar solo las mascotas que tienen estadoAdopcion "Disponible"
        const mascotas = await Mascota.findAll({
            where: {
                estadoAdopcion: 'Disponible' // Solo las mascotas disponibles
            }
        });
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de mascotas disponibles.' });
    }
});

//Listar mascotas  adoptadas
router.get('/mascotasAdoptadas', async (req, res) => {
    try {
        // Filtrar solo las mascotas que tienen estadoAdopcion "Adoptada"
        const mascotas = await Mascota.findAll({
            where: {
                estadoAdopcion: 'Adoptada' // Solo las mascotas adoptadas
            }
        });
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de mascotas adoptadas.' });
    }
});

// Obtener todas las mascotas
router.get('/mascotas', async (req, res) => {
    try {
        const mascotas = await Mascota.findAll();
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la lista de mascotas.` });
    }
});

// Obtener una mascota por ID
router.get('/mascotas/:idMascota', async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.idMascota);
        if (mascota) {
            res.json(mascota);
        } else {
            res.status(404).json({ error: `Mascota no encontrada.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la mascota.' });
    }
});

// Actualizar una mascota por ID
router.put('/actualizarmascota/:idMascota', async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.idMascota); // Buscar la mascota por ID
        if (mascota) {
            await mascota.update(req.body); // Actualizar los datos de la mascota
            res.json(mascota); // Devolver la mascota actualizada
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la mascota' });
    }
});

// Eliminar una mascota por ID junto con su imagen
router.delete('/eliminarmascota/:idMascota', async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.idMascota); // Buscar la mascota por ID
        if (mascota) {
            // Verificar si la mascota tiene una imagen guardada
            if (mascota.imagen) {
                const rutaImagen = path.join(__dirname, '../uploads', mascota.imagen);
                
                // Verificar si el archivo de imagen existe y eliminarlo
                if (fs.existsSync(rutaImagen)) {
                    fs.unlinkSync(rutaImagen); // Eliminar el archivo de imagen
                }
            }

            await mascota.destroy(); // Eliminar la mascota de la base de datos
            res.json({ mensaje: 'Mascota e imagen eliminadas' }); // Confirmar la eliminación
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la mascota e imagen' });
    }
});


export { router };