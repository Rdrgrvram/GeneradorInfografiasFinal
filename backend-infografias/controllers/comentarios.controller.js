const Comentario = require('../models/comentarios');

const crearComentario = async (req, res) => {
  try {
    const { texto, infografiaId } = req.body;
    const nuevoComentario = new Comentario({
      texto,
      autor: req.usuarioId,
      infografia: infografiaId
    });
    await nuevoComentario.save();
    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear comentario' });
  }
};

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find({ infografia: req.params.infografiaId })
      .populate('autor', 'nombre')
      .sort({ fecha: -1 });
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener comentarios' });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.id);
    if (!comentario) return res.status(404).json({ mensaje: 'Comentario no encontrado' });

    if (comentario.autor.toString() !== req.usuarioId) {
      return res.status(403).json({ mensaje: 'No autorizado para eliminar este comentario' });
    }

    await comentario.remove();
    res.json({ mensaje: 'Comentario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar comentario' });
  }
};

module.exports = {
  crearComentario,
  obtenerComentarios,
  eliminarComentario
};
