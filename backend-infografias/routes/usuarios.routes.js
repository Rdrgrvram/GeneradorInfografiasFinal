const express = require('express');
const router = express.Router();
const { 
  registrarUsuario, 
  loginUsuario,
  obtenerUsuarios, 
  obtenerUsuarioPorId, 
  actualizarUsuario,
  eliminarUsuario 
} = require('../controllers/usuarios.controller');

const verifyToken = require('../middlewares/verifyToken');
const isAdmin=require('../middlewares/isAdmin');

// Ruta para verificar un usuario por ID
router.get('/protegido', verifyToken, (req, res) => {
  res.json({ 
    mensaje: `Hola ${req.user.nombre}, accediste a una ruta protegida`, 
    datos: req.user 
  });
});
router.get('/solo-admin', verifyToken, isAdmin, (req, res) => {
  res.json({ mensaje: `Hola ${req.user.nombre}, tienes acceso de administrador` });
});

//Rutas publicas
router.post('/login', loginUsuario);// Ruta para login
router.post('/', registrarUsuario);// Ruta para registrar usuarios
//Rutas protegidas
router.get('/', verifyToken, obtenerUsuarios);// Ruta para obtener todos los usuarios
// Ruta para obtener un usuario por ID
router.get('/:id', verifyToken,obtenerUsuarioPorId);
// Ruta para actualizar un usuario por ID
router.put('/:id',verifyToken, actualizarUsuario);
// Ruta para eliminar un usuario por ID
router.delete('/:id',verifyToken, eliminarUsuario);

module.exports = router;

