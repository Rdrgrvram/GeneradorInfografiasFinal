import React from 'react';
import { Link } from 'react-router-dom';

const RecoverConfirm = () => {
  return (
    <div className="h-screen overflow-hidden bg-fondoInstitucional flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-6 font-inter">
          ¡Correo enviado!
        </h2>

        <p className="text-gray-700 text-center mb-6">
          Hemos enviado un enlace de recuperación a tu correo electrónico.  
          Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200">
              Volver al Login
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-fondoInstitucional hover:bg-gray-800 text-white py-2 rounded font-semibold transition duration-200">
              Ir al Inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecoverConfirm;
