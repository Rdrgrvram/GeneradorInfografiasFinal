const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB - API de Infografías'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas de usuarios
const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/api/usuarios', usuariosRoutes);
const infografiaRoutes = require('./routes/infografias.routes');
app.use('/api/infografias', infografiaRoutes); // ✅ esto habilita la ruta


// Modelo Infografía
const infografiaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  texto: String,
  fechaCreacion: { type: Date, default: Date.now }
});


// Endpoint para obtener todas las infografías
app.get('/infografias', async (req, res) => {
  try {
    const infografias = await Infografia.find();
    res.json(infografias);
  } catch (err) {
    console.error('Error al obtener infografías:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 API ejecutándose en http://localhost:${port}`);
});