import React, { useEffect, useState } from 'react';

const RevisarPeticiones = () => {
  const [infografias, setInfografias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch('http://localhost:3001/api/infografias/pendientes', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setInfografias(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        setInfografias([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const aprobarInfografia = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3001/api/infografias/aprobar/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return alert('❌ Error al aprobar infografía');
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
      if (!res.ok) return alert('❌ Error al rechazar infografía');
      alert('🚫 Infografía rechazada');
      setInfografias(prev => prev.filter(i => i._id !== id));
    } catch (error) {
      console.error(error);
      alert('❌ Error de conexión');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-8">📤 Revisión de Infografías Pendientes</h2>

      {loading ? (
        <div className="flex justify-center items-center h-48 text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mr-3"></div>
          <span className="text-orange-600 font-medium">Cargando peticiones...</span>
        </div>
      ) : infografias.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-6">No hay infografías pendientes por revisar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infografias.map((info) => (
            <div key={info._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {info.imagenes?.[0] && (
                <img
                  src={info.imagenes[0]}
                  alt={info.titulo}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <h3 className="text-lg font-bold text-fondoInstitucional mb-2">{info.titulo}</h3>

                <div
                  className="prose prose-sm max-h-48 overflow-y-auto mb-4"
                  dangerouslySetInnerHTML={{ __html: info.descripcion }}
                />

                <div className="flex justify-between gap-2 mt-4">
                  <button
                    onClick={() => aprobarInfografia(info._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    ✅ Aprobar
                  </button>
                  <button
                    onClick={() => rechazarInfografia(info._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    🚫 Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RevisarPeticiones;
