import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, PlusCircle, X } from 'lucide-react';

const getToken = () => localStorage.getItem('token');

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuariosPorPagina, setUsuariosPorPagina] = useState(10);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);
  const [usuarioForm, setUsuarioForm] = useState({
    nombre: '',
    correo: '',
    rol: 'editor',
    contrasena: '',
  });
  const [errores, setErrores] = useState({});
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:3001/api/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else if (Array.isArray(data.usuarios)) {
          setUsuarios(data.usuarios);
        } else {
          setUsuarios([]);
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleEditar = (usuario) => {
    setUsuarioForm({ ...usuario, contrasena: '' });
    setUsuarioEditandoId(usuario.id);
    setMostrarFormulario(true);
    setErrores({});
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) throw new Error('Error al eliminar el usuario');

      setUsuarios(prev => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAbrirFormularioNuevo = () => {
    setUsuarioForm({ nombre: '', correo: '', rol: 'editor', contrasena: '' });
    setUsuarioEditandoId(null);
    setErrores({});
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setUsuarioEditandoId(null);
    setErrores({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioForm({ ...usuarioForm, [name]: value });
  };

  const validarFormulario = () => {
    const err = {};
    if (!usuarioForm.nombre.trim()) err.nombre = 'Nombre requerido';
    if (!usuarioForm.correo.trim()) err.correo = 'Correo requerido';
    if (!/\S+@\S+\.\S+/.test(usuarioForm.correo)) err.correo = 'Correo no válido';
    if (!usuarioEditandoId && !usuarioForm.contrasena) err.contrasena = 'Contraseña requerida';
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (usuarioEditandoId) {
        const response = await fetch(`http://localhost:3001/api/usuarios/${usuarioEditandoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(usuarioForm),
        });

        const updatedData = await response.json();
        if (!response.ok) throw new Error(updatedData.message || 'Error al actualizar el usuario');

        setUsuarios((prev) =>
          prev.map((u) => (u.id === updatedData.usuario.id ? updatedData.usuario : u))
        );
      } else {
        const response = await fetch('http://localhost:3001/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(usuarioForm),
        });

        const nuevoUsuario = await response.json();
        if (!response.ok) throw new Error(nuevoUsuario.message || 'Error al crear el usuario');

        setUsuarios((prev) => [...prev, nuevoUsuario]);
      }

      handleCerrarFormulario();
    } catch (err) {
      alert(err.message);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const nombre = u.nombre?.toLowerCase() || '';
    const correo = u.correo?.toLowerCase() || '';
    const filtro = filtroBusqueda.toLowerCase();
    const coincideTexto = nombre.includes(filtro) || correo.includes(filtro);
    const coincideRol = filtroRol === 'todos' || u.rol === filtroRol;
    return coincideTexto && coincideRol;
  });

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const inicio = (paginaActual - 1) * usuariosPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(inicio, inicio + usuariosPorPagina);

  return (
    <section className="relative bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-fondoInstitucional">👥 Gestión de Usuarios</h2>
        <button
          onClick={handleAbrirFormularioNuevo}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
        >
          <PlusCircle size={18} /> Nuevo Usuario
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={filtroBusqueda}
          onChange={(e) => {
            setFiltroBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 shadow-sm"
        />
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-end">
          <select
            value={filtroRol}
            onChange={(e) => {
              setFiltroRol(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
          >
            <option value="todos">Todos los roles</option>
            <option value="administrador">Administrador</option>
            <option value="editor">Editor</option>
            <option value="invitado">Invitado</option>
          </select>
          <select
            value={usuariosPorPagina}
            onChange={(e) => {
              setUsuariosPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={15}>15 por página</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Rol</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((usuario) => (
              <tr key={usuario.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{usuario.nombre}</td>
                <td className="px-4 py-2">{usuario.correo}</td>
                <td className="px-4 py-2 capitalize">{usuario.rol}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleEditar(usuario)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Pencil size={16} /> Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(usuario.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>
          Página {paginaActual} de {totalPaginas}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl relative">
            <button
              onClick={handleCerrarFormulario}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-6 text-fondoInstitucional">
              {usuarioEditandoId ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={usuarioForm.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-orange-400"
                />
                {errores.nombre && <p className="text-red-600 text-sm">{errores.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={usuarioForm.correo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-orange-400"
                />
                {errores.correo && <p className="text-red-600 text-sm">{errores.correo}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Rol</label>
                <select
                  name="rol"
                  value={usuarioForm.rol}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-orange-400"
                >
                  <option value="administrador">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="invitado">Invitado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Contraseña</label>
                <input
                  type="password"
                  name="contrasena"
                  value={usuarioForm.contrasena}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-orange-400"
                />
                {!usuarioEditandoId && errores.contrasena && (
                  <p className="text-red-600 text-sm">{errores.contrasena}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition"
              >
                {usuarioEditandoId ? 'Actualizar Usuario' : 'Guardar Usuario'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default GestionUsuarios;
