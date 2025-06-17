const mongoose = require('mongoose');

const plantillaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  imagen: { type: String }, // URL de la imagen de la plantilla
  elementos: [{ type: String }], // Elementos configurables como texto, imágenes, etc.
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plantilla', plantillaSchema);
