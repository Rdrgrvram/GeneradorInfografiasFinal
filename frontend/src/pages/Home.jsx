import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
  const acercaRef = useRef(null);
  const equipoRef = useRef(null);

  const scrollToAcerca = () => {
    const yOffset = -380;
    const y = acercaRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
    window.scrollTo({ top: y, behavior: 'smooth' }); // ✅
  };
  
  const scrollToEquipo = () => {
    equipoRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-inter bg-gray-50">
      <Navbar onScrollAcerca={scrollToAcerca} onScrollEquipo={scrollToEquipo} />
      <HeroSection />
      <Features />
      <div ref={acercaRef}>
        <AboutSection />
      </div>
      <div ref={equipoRef}>
        <TeamSection />
      </div>
      <section
          className="bg-orange-500 text-white py-16 px-6 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Eres administrador?
          </h2>
          <p className="text-lg mb-6">
            Inicia sesion con este boton y accede a la base de datos.
          </p>
          <Link to="/admin">
            <button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded shadow transform hover:scale-105 transition duration-200">
              Iniciar sesion como administrador
            </button>
          </Link>
        </section>

      <Footer />
    </div>
  );
};

export default Home;
