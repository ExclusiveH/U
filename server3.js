const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Servir el archivo HTML desde la raíz
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint de Reportes
app.get('/api/reportes', (req, res) => {
    const { categoria } = req.query;

    const reportesSimulados = [
        { id: 1, evento: "Foro de IA", categoria: "Tecnologia", inscritos: 15, estado: "Activo" },
        { id: 2, evento: "Torneo de Futbol", categoria: "Deportes", inscritos: 22, estado: "Finalizado" },
        { id: 3, evento: "Taller de Node.js", categoria: "Tecnologia", inscritos: 8, estado: "Activo" }
    ];

    if (categoria) {
        const filtrados = reportesSimulados.filter(r => r.categoria.toLowerCase() === categoria.toLowerCase());
        return res.status(200).json(filtrados);
    }

    res.status(200).json(reportesSimulados);
});

app.listen(PORT, () => {
    console.log(`Microservicio de Reportes corriendo en puerto ${PORT}`);
});
