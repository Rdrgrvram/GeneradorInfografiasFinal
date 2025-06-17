import React from 'react';

const Toast = ({ mensaje, tipo = 'success', onClose }) => {
  const backgroundColor = tipo === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-5 right-5 ${backgroundColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}>
      <span className="font-semibold">{mensaje}</span>
      <button
        onClick={onClose}
        className="text-white font-bold ml-4 hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
