const express = require('express');
const cors = require('cors');
const app = express();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la raíz directamente
app.use(express.static(__dirname));

// Ruta principal para entregar el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(cors());
app.use(express.json());

// Datos simulados para reportes agregados
const reportesBase = [
  { id: 1, evento: "Congreso de IA", categoria: "Tecnologia", totalInscritos: 45, estado: "Activo", mes: "Noviembre" },
  { id: 2, evento: "Simposio de Salud", categoria: "Medicina", totalInscritos: 30, estado: "Activo", mes: "Noviembre" },
  { id: 3, evento: "Taller de Robotica", categoria: "Tecnologia", totalInscritos: 15, estado: "Finalizado", mes: "Octubre" }
];

// GET /api/reportes - Filtros avanzados mediante Query Params [Requisitos Query Params 3, 4 y 5]
app.get('/api/reportes', (req, res) => {
  const { categoria, estado, mes } = req.query;
  let resultado = reportesBase;

  if (categoria) {
    resultado = resultado.filter(r => r.categoria.toLowerCase() === categoria.toLowerCase());
  }
  if (estado) {
    resultado = resultado.filter(r => r.estado.toLowerCase() === estado.toLowerCase());
  }
  if (mes) {
    resultado = resultado.filter(r => r.mes.toLowerCase() === mes.toLowerCase());
  }

  res.json({
    total_registros: resultado.length,
    filtros_aplicados: { categoria, estado, mes },
    datos: resultado
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Microservicio de Reportes corriendo en puerto ${PORT}`);
});
