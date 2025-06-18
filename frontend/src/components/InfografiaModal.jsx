import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const InfografiaModal = ({ infografia, onClose, onNuevoComentario }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [rol, setRol] = useState('');

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

    setRol(localStorage.getItem('rol') || '');
    if (infografia) fetchComentarios();
  }, [infografia]);

  const handleEnviarComentario = async () => {
    if (!nuevoComentario.trim() || rol === 'invitado') return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          infografiaId: infografia._id,
          contenido: nuevoComentario,
        }),
      });

      if (!res.ok) throw new Error('Error al comentar');

      const nuevo = await res.json();
      setComentarios([...comentarios, nuevo]);
      setNuevoComentario('');

      if (onNuevoComentario) {
        onNuevoComentario(infografia._id);
      }
    } catch (error) {
      console.error('Error al comentar:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh] shadow-lg">
        
        {/* Botón cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-fondoInstitucional mb-3">{infografia.titulo}</h2>

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

        <hr className="my-6" />

        <h3 className="text-lg font-semibold mb-2">Comentarios</h3>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {comentarios.length === 0 && (
            <p className="text-gray-500">No hay comentarios todavía.</p>
          )}
          {comentarios.map((c) => (
            <div key={c._id} className="bg-gray-100 p-2 rounded text-sm">
              <strong>{c.usuarioId?.nombre || 'Usuario'}:</strong> {c.contenido}
            </div>
          ))}
        </div>

        {/* Caja de comentario */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder={rol === 'invitado' ? 'Inicia sesión para comentar' : 'Escribe un comentario...'}
            className="flex-1 border px-3 py-2 rounded text-sm"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            disabled={rol === 'invitado'}
          />
          <button
            className={`px-4 py-2 rounded text-sm font-semibold ${
              rol === 'invitado'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-fondoInstitucional text-white hover:bg-orange-700 transition'
            }`}
            onClick={handleEnviarComentario}
            disabled={rol === 'invitado'}
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfografiaModal;
