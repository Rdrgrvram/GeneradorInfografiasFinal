import React from 'react';

const AboutSection = () => {
  return (
    <section
      id="acerca"
      className="bg-fondoInstitucional text-white py-16 px-6 text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          ¿Qué es este generador?
        </h2>
        <p
          className="text-gray-300 text-lg leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Es un generador automatizado de infografías históricas que facilita la visualización
          de eventos, personajes y fechas relevantes. Diseñado para transformar datos estructurados
          en contenido visual atractivo, es ideal para la educación, la cultura y la difusión histórica.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
