import React, { useEffect, useState } from 'react';

const InfografiaModal = ({ infografia, onClose, onNuevoComentario }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/comentarios/${infografia._id}`);
        const data = await res.json();
        setComentarios(data);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };

    if (infografia) fetchComentarios();
  }, [infografia]);

  const handleEnviarComentario = async () => {
    if (!nuevoComentario.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          infografiaId: infografia._id,
          contenido: nuevoComentario
        })
      });

      if (!res.ok) throw new Error('Error al comentar');

      const nuevo = await res.json();
      setComentarios([...comentarios, nuevo]);
      setNuevoComentario('');

      // ✅ Notificar al padre que se añadió un nuevo comentario
      if (onNuevoComentario) {
        onNuevoComentario(infografia._id);
      }
    } catch (error) {
      console.error('Error al comentar:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-red-600 font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-fondoInstitucional mb-2">{infografia.titulo}</h2>

        {infografia.imagenes?.[0] && (
          <img
            src={infografia.imagenes[0]}
            alt="Infografía"
            className="w-full h-64 object-cover rounded"
          />
        )}

        <p className="mt-4 text-gray-700">{infografia.descripcion}</p>

        <div
          className="prose max-w-none mt-4"
          dangerouslySetInnerHTML={{ __html: infografia.texto }}
        />

        <hr className="my-4" />
        <h3 className="text-lg font-semibold">Comentarios</h3>

        <div className="space-y-2 mt-2">
          {comentarios.length === 0 && (
            <p className="text-gray-500">No hay comentarios todavía.</p>
          )}
          {comentarios.map((c) => (
            <div key={c._id} className="bg-gray-100 p-2 rounded">
              <strong>{c.usuarioId?.nombre || 'Usuario'}</strong>: {c.contenido}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            className="flex-1 border px-3 py-2 rounded"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
          <button
            className="bg-fondoInstitucional text-white px-4 py-2 rounded"
            onClick={handleEnviarComentario}
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfografiaModal;
