import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!nombre || !email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nombre: nombre, 
          correo: email, 
          contrasena: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar el usuario');
      }


    alert('Usuario registrado exitosamente');
    navigate('/login');
    }
    catch (error) {
      setError(error.message);
    }
  }
  

  return (
    <div className="h-screen overflow-hidden bg-fondoInstitucional flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-6 font-inter">
          Crear cuenta de Editor
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-1 font-inter">
              Nombre completo
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Tu nombre completo"
            />
          </div>

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

          <div>
            <label className="block text-gray-700 font-semibold mb-1 font-inter">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200 transform hover:scale-105"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/">
            <button className="w-full bg-fondoInstitucional hover:bg-gray-800 text-white py-2 rounded font-semibold transition duration-200 mt-4">
              Volver al Inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
