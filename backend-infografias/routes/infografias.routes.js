const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

const {
  crearInfografia,
  obtenerInfografias,
  obtenerInfografia,
  actualizarInfografia,
  eliminarInfografia,
  obtenerInfografiasDelUsuario,
  publicarInfografia,
  obtenerInfografiasPublicas,
  aprobarInfografia,
  rechazarInfografia,
  obtenerInfografiasPendientes,
  despublicarInfografia,
  toggleLikeInfografia
} = require('../controllers/infografias.controller');

// Rutas públicas
router.get('/publicas', obtenerInfografiasPublicas);

// Rutas protegidas
router.post('/', verifyToken, crearInfografia);
router.get('/mias', verifyToken, obtenerInfografiasDelUsuario);
router.patch('/publicar/:id', verifyToken, publicarInfografia);
router.patch('/despublicar/:id', verifyToken, despublicarInfografia);
router.put('/:id', verifyToken, actualizarInfografia);
router.delete('/:id', verifyToken, eliminarInfografia);

// ✅ Rutas de aprobación y rechazo (solo admin)
router.get('/pendientes', verifyToken, isAdmin, obtenerInfografiasPendientes); // 👉 MOVIDA ARRIBA
router.patch('/aprobar/:id', verifyToken, isAdmin, aprobarInfografia);
router.patch('/rechazar/:id', verifyToken, isAdmin, rechazarInfografia);
router.patch('/like/:id', verifyToken, toggleLikeInfografia);


// Estas dos deben ir al final
router.get('/:id', obtenerInfografia);
router.get('/', obtenerInfografias);


module.exports = router;
