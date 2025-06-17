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

// 🟢 Ruta de prueba: colócala antes de las genéricas
router.get('/test', (req, res) => {
  res.json({ mensaje: 'Router comentarios funciona' });
});

// 🟢 Logger (opcional)
router.use((req, res, next) => {
  console.log(`📩 Acceso a /api/comentarios -> ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Rutas reales
router.post('/', verifyToken, crearComentario);
router.delete('/:id', verifyToken, eliminarComentario);
router.get('/:infografiaId', obtenerComentarios); // ⚠️ esta debe ir al final

module.exports = router;
