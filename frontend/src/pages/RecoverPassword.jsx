import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      setMensaje('');
      return;
    }

    // Simulamos que se envió el correo
    setError('');
    setMensaje('Hemos enviado un enlace de recuperación a tu correo electrónico.');
    console.log('Solicitud de recuperación enviada para:', email);
  };

  return (
    <div className="h-screen overflow-hidden bg-fondoInstitucional flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-6 font-inter">
          Recuperar Contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mensaje && (
            <div className="text-green-600 text-sm font-medium text-center">{mensaje}</div>
          )}
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-1 font-inter">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200 transform hover:scale-105"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login">
            <button className="text-sm text-fondoInstitucional hover:underline font-inter">
              Volver al Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
