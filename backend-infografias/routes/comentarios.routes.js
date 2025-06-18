console.log('🚀 comentarios.routes.js CARGADO');

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const {
  crearComentario,
  obtenerComentarios,
  eliminarComentario
} = require('../controllers/comentarios.controller');


// 🟢 Logger (opcional)
router.use((req, res, next) => {
  console.log(`📩 Acceso a /api/comentarios -> ${req.method} ${req.originalUrl}`);
  next();
});

// 🔒 Ruta protegida para crear comentario
router.post('/', verifyToken, crearComentario);

// 🔒 Ruta protegida para eliminar comentario
router.delete('/:id', verifyToken, eliminarComentario);

// ✅ Ruta explícita para obtener comentarios por ID de infografía
router.get('/infografia/:infografiaId', obtenerComentarios); // <-- CAMBIA AQUI

// Ruta de prueba (debe ir al final o antes del wildcard)
router.get('/test', (req, res) => {
  res.json({ mensaje: 'Router comentarios funciona' });
});

module.exports = router;
