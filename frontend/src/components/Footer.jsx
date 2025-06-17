import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-fondoInstitucional text-gray-300 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Información del proyecto */}
        <div className="md:w-1/2">
          <h3 className="text-white text-xl font-bold mb-2">
            Generador de Infografías Automatizadas
          </h3>
          <p>
            Proyecto académico desarrollado por la <br />
            <span className="font-semibold text-white">
              Universidad Católica Boliviana “San Pablo”
            </span>
          </p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-orange-400 transition">Contacto</a>
            <a href="#" className="hover:text-orange-400 transition">Términos de Uso</a>
            <a href="#" className="hover:text-orange-400 transition">Privacidad</a>
          </div>
        </div>

        {/* Frase institucional y créditos */}
        <div className="md:w-1/2 text-right">
          <p className="italic text-gray-400 mb-2">
            “Comprometidos con la visualización educativa del patrimonio histórico de Bolivia.”
          </p>
          <p className="text-sm">Versión 1.0 | Diseñado por el equipo de Ingeniería de Sistemas</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 text-center text-sm text-orange-400 border-t border-gray-700 pt-6">
        © 2025 Universidad Católica Boliviana. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
