const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!contrasena){
      return res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
    }
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: contrasenaHash,
      rol
    });

    await nuevoUsuario.save();
    res.status(201).json({ 
      id: nuevoUsuario._id.toString(),
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol,
      mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};
//obtenemos el modelo de Usuario
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contrasena'); // Ocultamos contraseñas
    const usuariosConId = usuarios.map(u=> ({
      id: u._id,
      nombre: u.nombre,
      correo: u.correo,
      rol: u.rol
    }));  
    res.json(usuariosConId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
};
// Obtenemos un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id).select('-contrasena'); // Ocultamos contraseñas
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
};
//actualizamos un usuario por ID
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, contrasena, rol } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (correo && correo !== usuario.correo) {
      const usuarioExistente = await Usuario.findOne({ correo });
      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }
      usuario.correo = correo;
    }


    if (contrasena) {
      usuario.contrasena = await bcrypt.hash(contrasena, 10);
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.rol = rol || usuario.rol;

    await usuario.save();
    res.json({ 
      mensaje: 'Usuario actualizado exitosamente',
      usuario: {
        id: usuario._id.toString(),
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};
// Eliminamos un usuario por ID
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
};
// Login de usuario
const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ 
      mensaje: 'Login exitoso', 
      token, 
      id: usuario._id,
      nombre: usuario.nombre, 
      rol: usuario.rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el login' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
