import React, { useState } from 'react';

const plantillasMock = [
  {
    id: 'clasica',
    nombre: 'Clásica',
    descripcion: 'Diseño tradicional con encabezado, texto e imagen centrada.',
    imagen: 'https://via.placeholder.com/400x200.png?text=Plantilla+Clásica',
  },
  {
    id: 'moderna',
    nombre: 'Moderna',
    descripcion: 'Estilo moderno, visual limpio y elegante para datos rápidos.',
    imagen: 'https://via.placeholder.com/400x200.png?text=Plantilla+Moderna',
  },
  {
    id: 'linea-tiempo',
    nombre: 'Línea de Tiempo',
    descripcion: 'Ideal para mostrar eventos cronológicos de forma visual.',
    imagen: 'https://via.placeholder.com/400x200.png?text=Línea+de+Tiempo',
  },
];

const PlantillasInfografia = () => {
  const [seleccionada, setSeleccionada] = useState(null);

  const handleSeleccionar = (plantilla) => {
    setSeleccionada(plantilla.id);
    console.log('Plantilla seleccionada:', plantilla.nombre);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-fondoInstitucional mb-4">
        Selecciona una plantilla
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantillasMock.map((plantilla) => (
          <div
            key={plantilla.id}
            className={`bg-white rounded-lg shadow border-2 ${
              seleccionada === plantilla.id
                ? 'border-orange-500'
                : 'border-transparent'
            }`}
          >
            <img
              src={plantilla.imagen}
              alt={plantilla.nombre}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-fondoInstitucional mb-1">
                {plantilla.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{plantilla.descripcion}</p>

              <button
                onClick={() => handleSeleccionar(plantilla)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200"
              >
                {seleccionada === plantilla.id ? 'Seleccionada ✅' : 'Usar esta plantilla'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="text-center mt-6 text-orange-600 font-semibold">
          Has seleccionado: <span className="underline">{seleccionada}</span>
        </div>
      )}
    </div>
  );
};

export default PlantillasInfografia;
