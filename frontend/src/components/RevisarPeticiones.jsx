// src/components/RevisarPeticiones.jsx
import React, { useEffect, useState } from 'react';

const RevisarPeticiones = () => {
  const [infografias, setInfografias] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/infografias/pendientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInfografias(data);
        } else {
          setInfografias([]);
          console.error('Respuesta inesperada:', data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const aprobarInfografia = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3001/api/infografias/aprobar/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        alert('❌ Error al aprobar infografía');
        return;
      }
      alert('✅ Infografía aprobada');
      setInfografias(prev => prev.filter(i => i._id !== id));
    } catch (error) {
      console.error(error);
      alert('❌ Error de conexión');
    }
  };

  const rechazarInfografia = async (id) => {
    const token = localStorage.getItem('token');
    const feedback = prompt('Ingresa el motivo del rechazo:');
    if (!feedback) return;

    try {
      const res = await fetch(`http://localhost:3001/api/infografias/rechazar/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback }),
      });
      if (!res.ok) {
        alert('❌ Error al rechazar infografía');
        return;
      }
      alert('🚫 Infografía rechazada');
      setInfografias(prev => prev.filter(i => i._id !== id));
    } catch (error) {
      console.error(error);
      alert('❌ Error de conexión');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-fondoInstitucional mb-4">Revisión de Peticiones</h2>

      {infografias.length === 0 ? (
        <p className="text-gray-600">No hay infografías pendientes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infografias.map((info) => (
            <div key={info._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{info.titulo}</h3>
              {info.imagenes?.[0] && (
                <img src={info.imagenes[0]} alt={info.titulo} className="w-full h-40 object-cover rounded mb-2" />
              )}
              <div
                dangerouslySetInnerHTML={{ __html: info.descripcion }}
                className="prose max-w-full mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => aprobarInfografia(info._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => rechazarInfografia(info._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RevisarPeticiones;
