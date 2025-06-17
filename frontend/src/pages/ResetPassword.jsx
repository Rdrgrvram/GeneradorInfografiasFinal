import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Por favor completa ambos campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    console.log('Nueva contraseña:', newPassword);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate('/login'); // Después de mostrar el toast, redirige al login
    }, 2500);
  };

  return (
    <div className="h-screen overflow-hidden bg-fondoInstitucional flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-6 font-inter">
          Cambiar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-1 font-inter">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1 font-inter">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200 transform hover:scale-105"
          >
            Guardar Nueva Contraseña
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login">
            <button className="text-sm text-fondoInstitucional hover:underline font-inter">
              ← Volver al Login
            </button>
          </Link>
        </div>
      </div>

      {showToast && (
        <Toast
          mensaje="¡Contraseña cambiada exitosamente!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ResetPassword;
