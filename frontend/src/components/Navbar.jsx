import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onScrollAcerca, onScrollEquipo }) => {
  return (
    <nav className="bg-fondoInstitucional text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex items-center">
        <div className="flex items-end mr-4 space-x-1">
          <div className="bg-orange-500 h-5 w-4 rounded-sm"></div>
          <div className="bg-orange-500 h-8 w-4 rounded-sm"></div>
          <div className="bg-orange-500 h-11 w-4 rounded-sm"></div>
        </div>
        <span className="text-lg font-semibold font-inter">
          Generador de Infografías Históricas
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6 font-inter">
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-orange-400 transition duration-200"
        >
          Inicio
        </a>
        <button
          onClick={onScrollAcerca}
          className="hover:text-orange-400 transition duration-200"
        >
          Acerca
        </button>
        <button
          onClick={onScrollEquipo}
          className="hover:text-orange-400 transition duration-200"
        >
          Equipo
        </button>
        <Link to="/login">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
          Iniciar Sesión
        </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
