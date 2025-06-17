import React from 'react';

const VistaPreviaModal = ({ datos, onClose }) => {
  const { titulo, fecha, descripcion, imagenes, plantilla } = datos;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-fondoInstitucional">Vista Previa</h2>

        <p className="text-lg font-semibold mb-1">{titulo}</p>
        <p className="text-sm text-gray-600 mb-2">{fecha}</p>
        <p className="text-sm text-gray-700 mb-4">{descripcion}</p>

        {imagenes?.[0] && (
          <img
            src={URL.createObjectURL(imagenes[0])}
            alt="Imagen previa"
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        {plantilla && (
          <div className="text-sm text-gray-500">
            Plantilla seleccionada:
            <img
              src={`https://picsum.photos/seed/plantilla${plantilla}/100/60`}
              alt={`Plantilla ${plantilla}`}
              className="inline-block ml-2 rounded shadow"
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default VistaPreviaModal;
