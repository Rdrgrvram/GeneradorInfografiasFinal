const Infografia = require('../models/Infografia');
const Comentario = require('../models/comentarios');

// Crear infografía
const crearInfografia = async (req, res) => {
  try {
    const { titulo, descripcion, plantillaId, imagenes, texto } = req.body;

    const nuevaInfografia = new Infografia({
      titulo,
      descripcion,
      plantillaId,
      imagenes,
      texto,
      usuarioId: req.usuarioId,
    });

    await nuevaInfografia.save();
    res.status(201).json({ mensaje: 'Infografía creada exitosamente', infografia: nuevaInfografia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear infografía' });
  }
};

// Obtener todas las infografías del usuario
const obtenerInfografias = async (req, res) => {
  try {
    const infografias = await Infografia.find({ usuarioId: req.usuarioId });
    res.json(infografias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener infografías' });
  }
};

// Obtener una por ID
const obtenerInfografia = async (req, res) => {
  try {
    const infografia = await Infografia.findById(req.params.id);
    if (!infografia) return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    res.json(infografia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener infografía' });
  }
};

// Actualizar
const actualizarInfografia = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, texto, descripcion, imagenes } = req.body;

    const actualizada = await Infografia.findByIdAndUpdate(
      id,
      {
        titulo,
        texto,
        descripcion,
        imagenes,
        estado: 'pendiente',           // volver a estado pendiente al editar
        feedbackAdmin: '',             // limpiar el feedback anterior
        espublica: false               // evitar que siga pública si fue editada
      },
      { new: true }
    );

    if (!actualizada) return res.status(404).json({ mensaje: 'No se encontró la infografía' });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar' });
  }
};

// Eliminar
const eliminarInfografia = async (req, res) => {
  try {
    const infografiaEliminada = await Infografia.findByIdAndDelete(req.params.id);
    if (!infografiaEliminada) {
      return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    }
    res.json({ mensaje: 'Infografía eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar infografía' });
  }
};

// Infografías del usuario autenticado
const obtenerInfografiasDelUsuario = async (req, res) => {
  try {
    const infografias = await Infografia.find({ usuarioId: req.usuarioId });
    res.json(infografias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener tus infografías' });
  }
};

// Publicar (por el autor)
const publicarInfografia = async (req, res) => {
  try {
    const { id } = req.params;
    const infografia = await Infografia.findById(id);
    if (!infografia) return res.status(404).json({ mensaje: 'Infografía no encontrada' });

    if (infografia.usuarioId.toString() !== req.usuarioId) {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }

    infografia.estado = 'pendiente'; // cambiar a pendiente para que un admin la revise
    await infografia.save();

    res.json({ mensaje: 'Solicitud de publicación enviada', infografia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al publicar infografía' });
  }
};

const obtenerInfografiasPublicas = async (req, res) => {
  try {
    const publicas = await Infografia.find({ espublica: true })
      .populate('usuarioId', 'nombre')
      .lean(); // <-- importante para trabajar con objetos planos

    const comentarios = await Comentario.find({
      infografia: { $in: publicas.map((inf) => inf._id) }
    });
    const conteos = {};
    comentarios.forEach(c => {
      const id = c.infografia.toString();
      conteos[id] = (conteos[id] || 0) + 1;
    });

    const infografiasConConteo = publicas.map(inf => ({
      ...inf,
      cantidadComentarios: conteos[inf._id.toString()] || 0
    }));

    res.json(infografiasConConteo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener infografías públicas' });
  }
};


// ✅ Aprobar infografía (admin)
const aprobarInfografia = async (req, res) => {
  try {
    const { id } = req.params;
    const infografia = await Infografia.findById(id);
    if (!infografia) return res.status(404).json({ mensaje: 'No encontrada' });

    infografia.estado = 'aprobada';
    infografia.espublica = true;
    infografia.feedbackAdmin = '';
    await infografia.save();

    res.json({ mensaje: 'Infografía aprobada', infografia });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al aprobar infografía' });
  }
};

// ❌ Rechazar infografía (admin)
const rechazarInfografia = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    const infografia = await Infografia.findById(id);
    if (!infografia) return res.status(404).json({ mensaje: 'No encontrada' });

    infografia.estado = 'rechazada';
    infografia.espublica = false;
    infografia.feedbackAdmin = feedback;
    await infografia.save();

    res.json({ mensaje: 'Infografía rechazada', infografia });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al rechazar infografía' });
  }
};
const obtenerInfografiasPendientes = async (req, res) => {
  try {
    const pendientes = await Infografia.find({ estado: 'pendiente' }).populate('usuarioId', 'nombre');
    res.json(pendientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener pendientes' });
  }
};
// Autor despublica su infografía (sin eliminarla)
// Despublicar (usuario o administrador)
const despublicarInfografia = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = req.body?.feedback;


    const infografia = await Infografia.findById(id);
    if (!infografia) {
      return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    }

    // Solo se puede despublicar si está aprobada y pública
    if (infografia.estado !== 'aprobada' || !infografia.espublica) {
      return res.status(400).json({ mensaje: 'Solo se pueden despublicar infografías aprobadas y públicas' });
    }

    const rol = req.user.rol;
    const usuarioId = req.usuarioId;

    // Si no es admin, debe ser el autor
    if (rol !== 'administrador' && infografia.usuarioId.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: 'No autorizado para despublicar esta infografía' });
    }

    infografia.espublica = false;
    infografia.estado = 'borrador';

    // Si es administrador puede dejar feedback
    if (rol === 'administrador') {
      infografia.feedbackAdmin = feedback || 'Despublicada por el administrador';
    }

    await infografia.save();
    res.json({ mensaje: 'Infografía despublicada exitosamente', infografia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al despublicar infografía' });
  }
};
const toggleLikeInfografia = async (req, res) => {
  const { id } = req.params;
  const userId = req.usuarioId;

  try {
    const infografia = await Infografia.findById(id);
    if (!infografia) {
      return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    }
    const yaLeDioLike = infografia.likes.includes(userId);
    const updatedInfografia = await Infografia.findByIdAndUpdate(
      id,
      yaLeDioLike
        ? { $pull: { likes: userId } }
        : { $addToSet: { likes: userId } },
      { new: true }
    );
    res.json({ mensaje: 'Like actualizado', likes: updatedInfografia.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar like' });
  }
};
module.exports = {
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
};
