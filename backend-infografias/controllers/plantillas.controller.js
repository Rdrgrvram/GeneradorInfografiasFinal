const Plantilla = require('../models/Plantilla');

// Crear plantilla
const crearPlantilla = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, elementos } = req.body;

    const nuevaPlantilla = new Plantilla({
      nombre,
      descripcion,
      imagen,
      elementos
    });

    await nuevaPlantilla.save();
    res.status(201).json({ mensaje: 'Plantilla creada exitosamente', plantilla: nuevaPlantilla });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear plantilla' });
  }
};

// Obtener todas las plantillas
const obtenerPlantillas = async (req, res) => {
  try {
    const plantillas = await Plantilla.find();
    res.json(plantillas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener plantillas' });
  }
};

// Obtener plantilla por ID
const obtenerPlantilla = async (req, res) => {
  try {
    const plantilla = await Plantilla.findById(req.params.id);
    if (!plantilla) {
      return res.status(404).json({ mensaje: 'Plantilla no encontrada' });
    }
    res.json(plantilla);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener plantilla' });
  }
};

// Actualizar plantilla
const actualizarPlantilla = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, elementos } = req.body;

    const plantillaActualizada = await Plantilla.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, imagen, elementos },
      { new: true }
    );

    if (!plantillaActualizada) {
      return res.status(404).json({ mensaje: 'Plantilla no encontrada' });
    }

    res.json({ mensaje: 'Plantilla actualizada', plantilla: plantillaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar plantilla' });
  }
};

// Eliminar plantilla
const eliminarPlantilla = async (req, res) => {
  try {
    const plantillaEliminada = await Plantilla.findByIdAndDelete(req.params.id);
    if (!plantillaEliminada) {
      return res.status(404).json({ mensaje: 'Plantilla no encontrada' });
    }
    res.json({ mensaje: 'Plantilla eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar plantilla' });
  }
};

module.exports = {
  crearPlantilla,
  obtenerPlantillas,
  obtenerPlantilla,
  actualizarPlantilla,
  eliminarPlantilla
};
