import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const entrarComoInvitado = () => {
    localStorage.setItem('rol', 'invitado'); // Guardar rol invitado
    navigate('/dashboard'); // Redirigir al dashboard
  };
  return (
    <section className="bg-white px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* Lado izquierdo: texto y botón */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Transforma datos históricos en infografías visuales
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Genera contenido llamativo, educativo y automatizado para difundir la historia de forma moderna.
        </p>
        <div className="space-y-2">
        <button
            onClick={entrarComoInvitado}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded shadow transition duration-200 w-full md:w-auto"
          >
            Empezar ahora
          </button>
        </div>
      </div>

      {/* Lado derecho: imagen */}
      <div className="w-full md:w-[400px]">
        <img
          src="https://picsum.photos/400/250"
          alt="Infografía"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;

