const isAdmin = (req, res, next) => {
    if (req.user.rol !== 'administrador') {
      return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de administrador' });
    }
    next();
  };
  
  module.exports = isAdmin;
  