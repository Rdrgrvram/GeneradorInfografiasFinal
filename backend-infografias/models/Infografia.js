const mongoose = require('mongoose');

const infografiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  plantillaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plantilla', required: false },
  imagenes: [{ type: String }],
  texto: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  espublica: { type: Boolean, default: false }, // 👈 nuevo campo para visibilidad
  estado: {type: String,
    enum: ['borrador','pendiente', 'aprobada', 'rechazada'],
    default: 'borrador'},
  feedbackAdmin: {type: String,default: ''},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],


});


module.exports = mongoose.models.Infografia || mongoose.model('Infografia', infografiaSchema);

