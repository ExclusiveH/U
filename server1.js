const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS completa para permitir solicitudes entre servicios en Render
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Base de datos temporal en memoria
let eventos = [
    { id: 1, titulo: "Foro de Ciberseguridad", categoria: "Tecnologia", fecha: "2026-11-20", lugar: "Auditorio A" }
];

// Endpoint: Obtener todos los eventos (con opción de filtro por Query Param ?categoria=)
app.get('/api/eventos', (req, res) => {
    const { categoria } = req.query;
    if (categoria) {
        const filtrados = eventos.filter(e => e.categoria.toLowerCase() === categoria.toLowerCase());
        return res.status(200).json(filtrados);
    }
    res.status(200).json(eventos);
});

// Endpoint: Obtener evento por Path Param :id
app.get('/api/eventos/:id', (req, res) => {
    const evento = eventos.find(e => e.id === parseInt(req.params.id));
    if (!evento) {
        return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    res.status(200).json(evento);
});

// Endpoint: Crear evento mediante Body Params
app.post('/api/eventos', (req, res) => {
    const { titulo, categoria, fecha, lugar } = req.body;
    if (!titulo || !categoria || !fecha || !lugar) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }
    const nuevoEvento = {
        id: eventos.length + 1,
        titulo,
        categoria,
        fecha,
        lugar
    };
    eventos.push(nuevoEvento);
    res.status(201).json(nuevoEvento);
});

app.listen(PORT, () => {
    console.log(`Microservicio de Eventos corriendo en puerto ${PORT}`);
});
