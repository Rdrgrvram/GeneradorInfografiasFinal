import React, { useState } from 'react';

const CrearInfografia = () => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      titulo,
      fecha,
      descripcion,
      imagenes,
      plantillaSeleccionada
    });
    // Después guardaríamos en backend
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-fondoInstitucional">Crear Nueva Infografía</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Título */}
        <div>
          <label className="block font-semibold mb-1">Título de la Infografía</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ej: Revolución de Chuquisaca"
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block font-semibold mb-1">Fecha o Periodo</label>
          <input
            type="text"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ej: 25 de mayo de 1809"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            placeholder="Describe el evento histórico..."
          />
        </div>

        {/* Subir Imágenes */}
        <div>
          <label className="block font-semibold mb-1">Imágenes</label>
          <input
            type="file"
            multiple
            onChange={handleImagenesChange}
            className="block w-full text-sm text-gray-500"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {imagenes.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-24 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>

        {/* Selección de Plantilla */}
        <div>
          <label className="block font-semibold mb-2">Selecciona una Plantilla</label>
          <div className="flex gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                onClick={() => setPlantillaSeleccionada(num)}
                className={`border-2 rounded cursor-pointer overflow-hidden ${
                  plantillaSeleccionada === num ? 'border-orange-500' : 'border-gray-300'
                }`}
              >
                <img
                  src={`https://picsum.photos/seed/plantilla${num}/100/100`}
                  alt={`Plantilla ${num}`}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded"
          >
            Vista Previa
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded"
          >
            Guardar Infografía
          </button>
        </div>

      </form>
    </div>
  );
};

export default CrearInfografia;
