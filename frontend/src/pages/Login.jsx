import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword] = useState(false);
  const [token2FA, setToken2FA] = useState('');
  const [userId, setUserId] = useState(null);
  const [show2FA, setShow2FA] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          correo: email, 
          contrasena: password }),
      });

      const data =  await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      if(data.requiere2FA) {
        setUserId(data.userId);
        setShow2FA(true);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol || 'editor');
      localStorage.setItem('nombre', data.nombre || '');

      alert('Inicio de sesión exitoso');
      navigate('/dashboard');
    }
    catch (error) {
      setError(error.message);
    }
  };    

  const handle2FAVerify = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/usuarios/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token: token2FA }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Código 2FA inválido');
      }

      localStorage.setItem('token', data.token);
      alert('Inicio de sesión con 2FA exitoso');
      navigate('/dashboard');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-fondoInstitucional flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-fondoInstitucional mb-6 font-inter">
          Iniciar Sesión
        </h2>
         {error && <div className="text-red-600 text-sm font-medium text-center">{error}</div>}

        {!show2FA ? (
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="********"
              />
              {/* Aquí podríamos poner un botón de mostrar contraseña en el futuro */}
            </div>
          </div>

          <div className="text-right">
            <Link to="/recover">
              <button type="button" className="text-sm text-orange-500 hover:underline font-inter">
                ¿Olvidaste tu contraseña?
              </button>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200 transform hover:scale-105 mt-2"
          >
            Iniciar Sesión
          </button>
        </form>
         ) : (
        
        <div className="space-y-5">
            <label className="block text-gray-700 font-semibold font-inter">
              Código de autenticación 2FA
            </label>
            <input
              type="text"
              value={token2FA}
              onChange={(e) => setToken2FA(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handle2FAVerify}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition duration-200"
            >
              Verificar 2FA
            </button>
          </div>
        )}
        {/* Registro */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
          <Link to="/register">
            <button className="text-orange-500 hover:underline mt-1">
              Regístrate
            </button>
          </Link>
        </div>

        {/* Volver al Inicio */}
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

export default Login;
