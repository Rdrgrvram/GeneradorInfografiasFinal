import React, { useEffect, useState } from 'react';
import InfografiaCard from './InfografiaCard';
import moment from 'moment';

const MisInfografias = () => {
  const [infografias, setInfografias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarInfografias = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/infografias/mias', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInfografias(data);
          setError('');
        } else {
          setError(data.mensaje || 'Error al cargar infografías.');
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError('❌ No se pudo conectar con el servidor.');
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarInfografias();
  }, []);

  const handleEliminar = (id) => {
    setInfografias((prev) => prev.filter((inf) => inf._id !== id));
  };

  const agruparPorEstado = (estado) =>
    infografias.filter((i) => i.estado === estado);

  const renderSeccion = (titulo, estado, color) => {
    const lista = agruparPorEstado(estado);
    if (lista.length === 0) return null;

    return (
      <div className="mb-12">
        <h3 className={`text-xl font-semibold mb-4 border-l-4 pl-3 ${color}`}>{titulo}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((infografia) => (
            <InfografiaCard
              key={infografia._id}
              infografia={{
                ...infografia,
                imagen: infografia.imagenes?.[0] || '',
                fecha: moment(infografia.fechaCreacion).format('DD/MM/YYYY'),
              }}
              onEliminar={handleEliminar}
              onActualizar={cargarInfografias}
              onVer={() => alert(`Vista previa: ${infografia.titulo}`)}
              onEditar={() => alert(`Editar: ${infografia.titulo}`)}
            />
          ))}
        </div>
      </div>
    );
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center text-gray-600 h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mr-3"></div>
        <span className="text-orange-600 font-medium">Cargando infografías...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-6 font-semibold bg-red-100 border border-red-300 p-4 rounded-lg shadow">
        {error}
      </div>
    );
  }

  if (infografias.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10 italic">
        No has creado ninguna infografía aún.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-10">
        📁 Mis Infografías
      </h2>

      {renderSeccion('✅ Aprobadas', 'aprobada', 'border-green-500 text-green-700')}
      {renderSeccion('🕒 Pendientes de revisión', 'pendiente', 'border-yellow-500 text-yellow-700')}
      {renderSeccion('📝 Borradores', 'borrador', 'border-blue-500 text-blue-700')}
      {renderSeccion('🚫 Rechazadas', 'rechazada', 'border-red-500 text-red-700')}
    </div>
  );
};

export default MisInfografias;
