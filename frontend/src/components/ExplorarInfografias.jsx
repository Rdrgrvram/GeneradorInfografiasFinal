import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import InfografiaModal from './InfografiaModal';
import Comentarios from './Comentarios';

const ExplorarInfografias = () => {
  const [busqueda, setBusqueda] = useState('');
  const [infografias, setInfografias] = useState([]);
  const [infografiaSeleccionada, setInfografiaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [conteoComentarios, setConteoComentarios] = useState({});

  const actualizarConteoComentarios = (infografiaId, cantidad) => {
  setInfografias(prev =>
    prev.map(info =>
      info._id === infografiaId ? { ...info, cantidadComentarios: cantidad } : info
    )
  );
};

  useEffect(() => {
  const intervalo = setInterval(() => {
    fetchInfografias(); // 🔁 vuelve a obtener los datos con cantidadComentarios actualizada
  }, 10000); // cada 10 segundos

  return () => clearInterval(intervalo); // limpieza al desmontar
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
    const data = await res.json(); // contiene el array actualizado de likes 
    if (!Array.isArray(data.likes)) {
      console.error('❌ Formato inesperado en likes:', data.likes);
      return;
    }
    // Actualiza lista principal
    setInfografias((prev) =>
      prev.map((info) =>
        info._id === id ? { ...info, likes: data.likes } : info
      )
    );

    // 🔄 Actualiza el modal en tiempo real
    setInfografiaSeleccionada((prev) =>
      prev && prev._id === id ? { ...prev, likes: data.likes } : prev
    );
  } catch (error) {
    console.error('❌ Error al actualizar likes', error);
  }
};


  const fetchInfografias = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/infografias/publicas');
      const data = await res.json();
      if (Array.isArray(data)) {
        setInfografias(data);
      } else {
        console.error('⚠️ La respuesta no es un arreglo:', data);
        setInfografias([]);
      }
    } catch (error) {
      console.error('Error al cargar infografías públicas', error);
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

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-fondoInstitucional mb-4">Explorar Infografías Públicas</h2>

      <input
        type="text"
        placeholder="Buscar por título..."
        className="w-full border border-gray-300 px-4 py-2 rounded mb-6"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultados.map((item) => (
          <div
            key={item._id}
            onClick={() => abrirModal(item)}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={item.imagenes?.[0] || 'https://via.placeholder.com/400x200?text=Infografía'}
              alt={item.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-fondoInstitucional">{item.titulo}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Por {item.usuarioId?.nombre || 'Anónimo'} • {new Date(item.fechaCreacion).toLocaleDateString()}
              </p>

              <div className="flex justify-between text-sm mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); handleLike(item._id); }}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <ThumbsUp size={16} /> {item.likes?.length || 0}
                </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:underline">
                    <MessageCircle size={16} /> {conteoComentarios[item._id] ?? item.cantidadComentarios ?? 0}
                  </button>
                <button className="flex items-center gap-1 text-orange-500 hover:underline">
                  <Share2 size={16} /> Compartir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mostrarModal && infografiaSeleccionada && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
      <button
        onClick={cerrarModal}
        className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
      >
        ×
      </button>

      <img
        src={infografiaSeleccionada.imagenes?.[0] || 'https://via.placeholder.com/400x200?text=Infografía'}
        alt={infografiaSeleccionada.titulo}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold text-fondoInstitucional mt-4">
        {infografiaSeleccionada.titulo}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Por {infografiaSeleccionada.usuarioId?.nombre || 'Anónimo'} •{' '}
        {new Date(infografiaSeleccionada.fechaCreacion).toLocaleDateString()}
      </p>

      {/* Likes en el modal */}
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => handleLike(infografiaSeleccionada._id)}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <ThumbsUp size={16} />
          {infografiaSeleccionada.likes?.length || 0} 
        </button>
      </div>

      <hr className="my-4" />
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: infografiaSeleccionada.texto }}
      />

      {/* Comentarios */}
      <Comentarios infografiaId={infografiaSeleccionada._id} 
        onCantidadComentariosChange={(cantidad) =>
        actualizarConteoComentarios(infografiaSeleccionada._id, cantidad)}/>
    </div>
  </div>
)}



      {resultados.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No se encontraron infografías con ese criterio.</p>
      )}
    </div>
  );
};

export default ExplorarInfografias;
