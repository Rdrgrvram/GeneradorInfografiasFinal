import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onScrollAcerca, onScrollEquipo }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="bg-fondoInstitucional text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center">
        {/* Logo y título */}
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

        {/* Ícono menú en móvil */}
        <div className="md:hidden">
          <button onClick={handleToggle}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú en pantallas grandes */}
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
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
  <div className="md:hidden mt-4 font-inter bg-fondoInstitucional p-4 rounded-lg space-y-3 shadow-lg">
    <a
      href="#"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        handleClose();
      }}
      className="block text-white hover:text-orange-400"
    >
      Inicio
    </a>
    <button
      onClick={() => {
        onScrollAcerca();
        handleClose();
      }}
      className="block text-white hover:text-orange-400"
    >
      Acerca
    </button>
    <button
      onClick={() => {
        onScrollEquipo();
        handleClose();
      }}
      className="block text-white hover:text-orange-400"
    >
      Equipo
    </button>
    <div className="pt-2">
      <Link to="/login">
        <button
          onClick={handleClose}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
      </Link>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;
