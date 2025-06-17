import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const CrearInfografia = ({ setVistaActiva }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenBase64, setImagenBase64] = useState('');
  const [cargando, setCargando] = useState(false);

  const exportRef = useRef();

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenBase64(reader.result);
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/api/infografias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo,
          descripcion: contenido,
          imagenes: [imagenBase64],
          texto: contenido,
          esPublica: false
        })
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(`❌ ${data.mensaje || 'Error desconocido al crear'}`);
      } else {
        toast.success('✅ Infografía creada correctamente');
        setTitulo('');
        setContenido('');
        setImagen(null);
        setImagenBase64('');
        setTimeout(() => setVistaActiva('mis'), 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const exportarPDF = async () => {
    const contenedor = exportRef.current;
    if (!contenedor) {
      toast.error('❌ No se encontró el contenido para exportar');
      return;
    }

    const canvas = await html2canvas(contenedor, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${titulo || 'infografia'}.pdf`);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-fondoInstitucional">Crear Infografía</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Ej. Independencia de Bolivia"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Contenido</label>
          <ReactQuill
            theme="snow"
            value={contenido}
            onChange={setContenido}
            className="bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Imagen de vista previa</label>
          <input type="file" accept="image/*" onChange={handleImagenChange} />
          {imagen && <img src={imagen} alt="Vista previa" className="mt-4 max-h-48" />}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={cargando}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold"
          >
            {cargando ? 'Guardando...' : 'Guardar Infografía'}
          </button>

          <button
            type="button"
            onClick={exportarPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
          >
            Exportar a PDF
          </button>
        </div>
      </form>

      {/* Contenido oculto pero visible para html2canvas */}
      <div
        ref={exportRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '794px', // tamaño A4 en px a 96 DPI aprox
          padding: '30px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#e76f00' }}>{titulo}</h1>
        {imagen && <img src={imagen} alt="Vista previa" style={{ maxWidth: '100%', margin: '20px 0' }} />}
        <div dangerouslySetInnerHTML={{ __html: contenido }} />
      </div>
    </div>
  );
};

export default CrearInfografia;
