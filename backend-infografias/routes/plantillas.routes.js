const express = require('express');
const router = express.Router();
const { crearPlantilla, obtenerPlantillas, obtenerPlantilla, actualizarPlantilla, eliminarPlantilla } = require('../controllers/plantillas.controller');

// Crear una plantilla
router.post('/', crearPlantilla);

// Obtener todas las plantillas
router.get('/', obtenerPlantillas);

// Obtener plantilla por ID
router.get('/:id', obtenerPlantilla);

// Actualizar plantilla
router.put('/:id', actualizarPlantilla);

// Eliminar plantilla
router.delete('/:id', eliminarPlantilla);

module.exports = router;
