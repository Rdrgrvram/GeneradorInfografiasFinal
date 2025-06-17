const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['administrador', 'editor', 'invitado'], default: 'invitado' },
  verificado: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);
