import express from "express";
import { Solicitud } from "../models/solicitud.model.js";
import { Mascota } from "../models/mascota.model.js";

const router = express.Router();

//Obtener todas las solicitudes de adopción
router.get('/solicitudes', async (req, res) => {
    try {
        // Busca todas las solicitudes e incluye las mascota
        const solicitudes = await Solicitud.findAll({ include: Mascota });
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: `error al obtener solicitudes.` })
    }
});

// Buscar solicitud por id
router.get('/solicitudes/:id', async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id, { include: Mascota });
        if (solicitud) {
            res.json(solicitud);
        } else {
            res.status(404).json({
                error: `Solicitud no encontrada.`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Error al obtener la solicitud.`
        });
    }
});

// Crear solicitud
router.post('/nuevasolicitud', async (req, res) => {
    try {
        const { identidadSolicitante, celSolicitante, correoSolicitante, idMascota } = req.body;

        const mascota = await Mascota.findByPk(idMascota);
        if (!mascota) {
            return res.status(404).json({
                error: `Mascota no encontrada.`
            });
        }

        const solicitud = await Solicitud.create({
            identidadSolicitante,
            celSolicitante,
            correoSolicitante,
            idMascota
        });

        // Enviar la solicitud creada.
        res.status(201).json(solicitud);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Error al crear la solicitud.'
        });
    }
});

//Actualizar una solicitud
router.put('/actualizarsolicitud/:id', async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id);

        if (!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada.' });
        }

        const mascota = await Mascota.findByPk(solicitud.idMascota);

        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada.' });
        }

        // Verificar si ya existe otra solicitud aceptada para la misma mascota
        const solicitudAceptada = await Solicitud.findOne({
            where: { idMascota: solicitud.idMascota, estado: 'Aceptada' }
        });

        // Verificar si la solicitud actual es la única aceptada
        const esSolicitudUnicaAceptada = solicitudAceptada && solicitudAceptada.idSolicitud === solicitud.idSolicitud;

        // Si ya hay una solicitud aceptada y se intenta aceptar otra
        if (solicitudAceptada && !esSolicitudUnicaAceptada && (req.body.estado === 'Aceptada' || req.body.estado === 'Pendiente')) {
            return res.status(400).json({ 
                error: 'No puedes cambiar el estado de la solicitud porque ya existe otra solicitud aceptada para esta mascota.' 
            });
        }

        // Si se intenta cambiar una solicitud aceptada a Pendiente o Rechazada, hacer que la mascota esté disponible
        if (esSolicitudUnicaAceptada && (req.body.estado === 'Pendiente' || req.body.estado === 'Rechazada')) {
            await mascota.update({ estadoAdopcion: 'Disponible' });
        }

        // Si se intenta aceptar la solicitud
        if (req.body.estado === 'Aceptada') {
            // Cambiar el estado de la mascota a 'Adoptada'
            await mascota.update({ estadoAdopcion: 'Adoptada' });

            // Rechazar todas las demás solicitudes pendientes para esta mascota
            await Solicitud.update(
                { estado: 'Rechazada' },
                { where: { idMascota: solicitud.idMascota, estado: 'Pendiente' } }
            );
        }

        // Actualizar el estado de la solicitud
        await solicitud.update(req.body);
        return res.json(solicitud);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la solicitud.' });
    }
});


// Eliminar solicitud.
router.delete('/eliminarsolicitud/:id', async (req, res) => {
    try {
        const solicitud = await Solicitud.findByPk(req.params.id);
        if (solicitud) {
            await solicitud.destroy();
            res.json({ mensaje: 'Solicitud eliminada' });
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la solicitud' });
    }
});


export { router };