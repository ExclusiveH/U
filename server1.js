const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos en memoria para pruebas
let eventos = [
  { id: 1, titulo: "Congreso de IA", categoria: "Tecnologia", fecha: "2026-11-10", lugar: "Auditorio A" },
  { id: 2, titulo: "Simposio de Salud", categoria: "Medicina", fecha: "2026-11-15", lugar: "Aula Magna" }
];

// GET /api/eventos - Listar eventos (Soporta Query Params: categoria, fecha) [Requisito Query Params]
app.get('/api/eventos', (req, res) => {
  const { categoria, fecha } = req.query;
  let resultado = eventos;

  if (categoria) {
    resultado = resultado.filter(e => e.categoria.toLowerCase() === categoria.toLowerCase());
  }
  if (fecha) {
    resultado = resultado.filter(e => e.fecha === fecha);
  }

  res.json(resultado);
});

// GET /api/eventos/:id - Obtener evento por ID [Requisito Path Params 1]
app.get('/api/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const evento = eventos.find(e => e.id === id);

  if (!evento) {
    return res.status(404).json({ error: "Evento no encontrado" }); // Respuesta HTTP 404
  }
  res.json(evento);
});

// POST /api/eventos - Crear evento [Requisito Body Params / HTTP 400]
app.post('/api/eventos', (req, res) => {
  const { titulo, categoria, fecha, lugar } = req.body;

  if (!titulo || !categoria || !fecha || !lugar) {
    return res.status(400).json({ error: "Todos los campos (titulo, categoria, fecha, lugar) son obligatorios" });
  }

  const nuevoEvento = {
    id: eventos.length ? eventos[eventos.length - 1].id + 1 : 1,
    titulo,
    categoria,
    fecha,
    lugar
  };

  eventos.push(nuevoEvento);
  res.status(201).json(nuevoEvento);
});

// PUT /api/eventos/:id - Actualizar evento [Requisito Path Params 2 & Body Params]
app.put('/api/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const eventoIndex = eventos.findIndex(e => e.id === id);

  if (eventoIndex === -1) {
    return res.status(404).json({ error: "Evento no encontrado" });
  }

  const { titulo, categoria, fecha, lugar } = req.body;
  if (!titulo || !categoria || !fecha || !lugar) {
    return res.status(400).json({ error: "Todos los campos son obligatorios para actualizar" });
  }

  eventos[eventoIndex] = { id, titulo, categoria, fecha, lugar };
  res.json(eventos[eventoIndex]);
});

// DELETE /api/eventos/:id - Eliminar evento
app.delete('/api/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const existe = eventos.some(e => e.id === id);

  if (!existe) {
    return res.status(404).json({ error: "Evento no encontrado para eliminar" });
  }

  eventos = eventos.filter(e => e.id !== id);
  res.json({ mensaje: "Evento eliminado exitosamente" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Microservicio de Eventos corriendo en puerto ${PORT}`);
});