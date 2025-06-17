const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ mensaje: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ mensaje: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aquí extraemos todos los datos necesarios del token
    req.usuarioId = decoded.id;
    req.user = {
      id: decoded.id,
      rol: decoded.rol,  // Asegúrate de incluir este campo al firmar el token
      nombre: decoded.nombre // opcional, si deseas mostrarlo luego
    };

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verifyToken;
