const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/infografias', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((error) => console.error('❌ Error MongoDB:', error));

// Rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const infografiasRoutes = require('./routes/infografias.routes');
const plantillasRoutes = require('./routes/plantillas.routes');
const comentariosRoutes = require('./routes/comentarios.routes');
console.log('✅ comentarios.routes.js cargado');
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/infografias', infografiasRoutes);
app.use('/api/plantillas', plantillasRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
