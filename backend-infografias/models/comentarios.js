const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  infografia: { type: mongoose.Schema.Types.ObjectId, ref: 'Infografia', required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Comentario || mongoose.model('Comentario', comentarioSchema);
