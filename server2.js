const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Configuración CORS completa
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Base de datos temporal en memoria
let inscripciones = [];

// Endpoint: Crear inscripción
app.post('/api/inscripciones', (req, res) => {
    const { eventoId, participante, email, carrera } = req.body;
    if (!eventoId || !participante || !email || !carrera) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }
    const nuevaInscripcion = {
        id: inscripciones.length + 1,
        eventoId: parseInt(eventoId),
        participante,
        email,
        carrera,
        fechaInscripcion: new Date()
    };
    inscripciones.push(nuevaInscripcion);
    res.status(201).json(nuevaInscripcion);
});

// Endpoint: Consultar participantes por Path Param :eventoId
app.get('/api/inscripciones/evento/:eventoId', (req, res) => {
    const eventoId = parseInt(req.params.eventoId);
    const filtrados = inscripciones.filter(i => i.eventoId === eventoId);
    res.status(200).json(filtrados);
});

app.listen(PORT, () => {
    console.log(`Microservicio de Inscripciones corriendo en puerto ${PORT}`);
});
