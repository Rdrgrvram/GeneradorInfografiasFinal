import React, { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';

const Comentarios = ({ infografiaId, onCantidadComentariosChange }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  useEffect(() => {
    const cargarComentarios = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/comentarios/${infografiaId}`);
        const data = await res.json();
        setComentarios(data);
        if (onCantidadComentariosChange) {
          onCantidadComentariosChange(data.length);
        }
      } catch (error) {
        console.error('❌ Error al cargar comentarios:', error);
      }
    };

    if (infografiaId) cargarComentarios();
  }, [infografiaId]);

  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto: nuevoComentario, infografiaId }),
      });

      const data = await res.json();
      const nuevosComentarios = [data, ...comentarios];
      setComentarios(nuevosComentarios);
      setNuevoComentario('');

      if (onCantidadComentariosChange) {
        onCantidadComentariosChange(nuevosComentarios.length);
      }
    } catch (error) {
      console.error('❌ Error al enviar comentario:', error);
    }
  };

  return (
    <div className="mt-10">
      <hr className="my-6 border-t border-gray-300" />
      <h3 className="text-lg font-semibold mb-3">Comentarios</h3>

      <form onSubmit={enviarComentario} className="mb-6">
        <div className="flex items-start gap-3 bg-gray-100 p-3 rounded">
          <UserCircle className="text-gray-400 mt-1" size={32} />
          <div className="flex-1">
            <textarea
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="w-full border border-gray-300 rounded p-2"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
        {comentarios.map((comentario) => (
          <div key={comentario._id} className="flex gap-3 items-start bg-gray-100 p-3 rounded">
            <UserCircle className="text-gray-400 mt-1" size={32} />
            <div>
              <p className="text-sm text-gray-700">{comentario.texto}</p>
              <span className="text-xs text-gray-500 block">
                Por {comentario.autor?.nombre || 'Anónimo'} –{' '}
                {new Date(comentario.fecha).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        {comentarios.length === 0 && (
          <p className="text-sm text-gray-500">No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
};

export default Comentarios;
