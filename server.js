const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let inscripciones = [
  { id: 1, eventoId: 1, participante: "Carlos Mendoza", email: "carlos@univ.edu", carrera: "Ingeniería" },
  { id: 2, eventoId: 1, participante: "Ana Gomez", email: "ana@univ.edu", carrera: "Sistemas" }
];

// POST /api/inscripciones - Inscribir participante [Requisito Body Params]
app.post('/api/inscripciones', (req, res) => {
  const { eventoId, participante, email, carrera } = req.body;

  if (!eventoId || !participante || !email || !carrera) {
    return res.status(400).json({ error: "Datos de inscripcion incompletos" }); // Respuesta HTTP 400
  }

  const nuevaInscripcion = {
    id: inscripciones.length ? inscripciones[inscripciones.length - 1].id + 1 : 1,
    eventoId: parseInt(eventoId),
    participante,
    email,
    carrera
  };

  inscripciones.push(nuevaInscripcion);
  res.status(201).json(nuevaInscripcion);
});

// GET /api/inscripciones/evento/:eventoId - Consultar participantes por evento [Requisito Path Params 3]
app.get('/api/inscripciones/evento/:eventoId', (req, res) => {
  const eventoId = parseInt(req.params.eventoId);
  const lista = inscripciones.filter(i => i.eventoId === eventoId);
  
  res.json(lista);
});

// GET /api/inscripciones - Listar todas las inscripciones (Soporta Query Params: carrera) [Requisito Query Params]
app.get('/api/inscripciones', (req, res) => {
  const { carrera } = req.query;
  if (carrera) {
    const filtrados = inscripciones.filter(i => i.carrera.toLowerCase() === carrera.toLowerCase());
    return res.json(filtrados);
  }
  res.json(inscripciones);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Microservicio de Inscripciones corriendo en puerto ${PORT}`);
});