import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import Comentarios from './Comentarios';
import CompartirInfografia from './CompartirInfografia';

const ExplorarInfografias = () => {
  const [busqueda, setBusqueda] = useState('');
  const [infografias, setInfografias] = useState([]);
  const [infografiaSeleccionada, setInfografiaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [conteoComentarios, setConteoComentarios] = useState({});
  const [loading, setLoading] = useState(true);
  const rol = localStorage.getItem('rol') || 'invitado';

  const actualizarConteoComentarios = (infografiaId, cantidad) => {
    setInfografias(prev =>
      prev.map(info =>
        info._id === infografiaId ? { ...info, cantidadComentarios: cantidad } : info
      )
    );
  };

  useEffect(() => {
    const fetchInfografias = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/api/infografias/publicas');
        const data = await res.json();
        if (Array.isArray(data)) setInfografias(data);
      } catch (error) {
        console.error('Error al cargar infografías públicas', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfografias();
  }, []);

  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/infografias/like/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('No se pudo actualizar el like');
      const data = await res.json();
      if (!Array.isArray(data.likes)) return;

      setInfografias((prev) =>
        prev.map((info) =>
          info._id === id ? { ...info, likes: data.likes } : info
        )
      );

      setInfografiaSeleccionada((prev) =>
        prev && prev._id === id ? { ...prev, likes: data.likes } : prev
      );
    } catch (error) {
      console.error('❌ Error al actualizar likes', error);
    }
  };

  const abrirModal = (infografia) => {
    setInfografiaSeleccionada(infografia);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setInfografiaSeleccionada(null);
  };

  const resultados = infografias.filter((item) =>
    item.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mr-3"></div>
        Cargando infografías públicas...
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto mt-6 px-4">
    <h2 className="text-3xl font-bold text-fondoInstitucional mb-6 text-center">🌐 Explorar Infografías Públicas</h2>

    <input
      type="text"
      placeholder="🔍 Buscar por título..."
      className="w-full border border-gray-300 px-5 py-3 rounded-lg mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resultados.map((item) => (
        <div
          key={item._id}
          onClick={() => abrirModal(item)}
          className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 cursor-pointer"
        >
          <img
            src={item.imagenes?.[0] || 'https://via.placeholder.com/400x200?text=Infografía'}
            alt={item.titulo}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold text-fondoInstitucional">{item.titulo}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Por {item.usuarioId?.nombre || 'Anónimo'} • {new Date(item.fechaCreacion).toLocaleDateString()}
            </p>

            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (rol === 'invitado') {
                    alert('⚠️ Solo usuarios registrados pueden dar like.');
                    return;
                  }
                  handleLike(item._id);
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  rol === 'invitado' ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ThumbsUp size={16} /> {item.likes?.length || 0}
              </button>
              <span className="flex items-center gap-2 text-gray-600">
                <MessageCircle size={16} /> {conteoComentarios[item._id] ?? item.cantidadComentarios ?? 0}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Modal de detalle */}
    {mostrarModal && infografiaSeleccionada && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white animate-fadeIn w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6 relative">
      <button
        onClick={cerrarModal}
        className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
      >
        ×
      </button>

      {/* ✅ Contenido completo agrupado para PDF */}
      <div className="contenido-infografia-completa bg-white p-4 rounded shadow-sm">
        <img
          src={infografiaSeleccionada.imagenes?.[0] || 'https://via.placeholder.com/400x200?text=Infografía'}
          alt={infografiaSeleccionada.titulo}
          className="w-full h-64 object-cover rounded mb-4"
        />

        <h2 className="text-2xl font-bold text-fondoInstitucional mb-1">
          {infografiaSeleccionada.titulo}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Por {infografiaSeleccionada.usuarioId?.nombre || 'Anónimo'} •{' '}
          {new Date(infografiaSeleccionada.fechaCreacion).toLocaleDateString()}
        </p>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: infografiaSeleccionada.texto }}
        />
      </div>

      {/* ✅ Compartir con selector corregido */}
      <CompartirInfografia
        selector=".contenido-infografia-completa"
        titulo={infografiaSeleccionada.titulo}
      />

      {/* ✅ Comentarios */}
      <Comentarios
        infografiaId={infografiaSeleccionada._id}
        rol={rol}
        onCantidadComentariosChange={(cantidad) =>
          actualizarConteoComentarios(infografiaSeleccionada._id, cantidad)
        }
      />
    </div>
  </div>
)}

    {!loading && resultados.length === 0 && (
      <p className="text-center text-gray-500 mt-8">No se encontraron infografías con ese criterio.</p>
    )}
  </div>
);

};

export default ExplorarInfografias;
