import React from 'react';

const Features = () => {
  return (
    <section
      className="bg-fondoInstitucional text-white py-16 px-6"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="p-6 shadow rounded bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <h3 className="text-2xl font-bold mb-2 text-gray-800">🎨 Visual</h3>
          <p className="text-gray-600">
            Infografías llamativas y claras para destacar datos históricos con diseño moderno.
          </p>
        </div>

        {/* Feature 2 */}
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="p-6 shadow rounded bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <h3 className="text-2xl font-bold mb-2 text-gray-800">⚡ Rápido</h3>
          <p className="text-gray-600">
            Generación automática a partir de datos estructurados como CSV o JSON.
          </p>
        </div>

        {/* Feature 3 */}
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          className="p-6 shadow rounded bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <h3 className="text-2xl font-bold mb-2 text-gray-800">🎓 Educativo</h3>
          <p className="text-gray-600">
            Facilita el aprendizaje interactivo de la historia con contenido visual automatizado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
