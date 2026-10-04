# Sistema de Gestión de Eventos Universitarios - Arquitectura de Microservicios

Este proyecto es un sistema basado en una arquitectura de **3 microservicios independientes** desarrollados con **Node.js** y **Express**, desplegados de forma individual en la nube mediante **Render**. Además, incluye un frontend monolítico en HTML, CSS y JavaScript para la interacción con las APIs RESTful.

---

## 🚀 Microservicios y Despliegue en la Nube

Los servicios están desplegados y accesibles en las siguientes URLs públicas:

1. **Microservicio 1 - Eventos**: `https://microservicio-eventos.onrender.com`
2. **Microservicio 2 - Inscripciones**: `https://microservicio-inscripciones.onrender.com`
3. **Microservicio 3 - Reportes / Frontend**: `https://microservicio-reportes-rztd.onrender.com`

---

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Middleware**: CORS, Express JSON Parser
- **Pruebas y Documentación**: Postman
- **Alojamiento Cloud**: Render (Web Services)

---

## 📋 Especificación de Endpoints (APIs)

### 1. Microservicio de Eventos
- **`GET /api/eventos`**: Obtiene todos los eventos registrados. Admite filtro mediante Query Param (`?categoria=Tecnologia`).
- **`GET /api/eventos/:id`**: Obtiene un evento específico según su Path Param (`:id`).
- **`POST /api/eventos`**: Crea un nuevo evento enviando los datos por Body (JSON):
  ```json
  {
    "titulo": "Conferencia de IA",
    "categoria": "Tecnologia",
    "fecha": "2026-11-20",
    "lugar": "Auditorio A"
  }