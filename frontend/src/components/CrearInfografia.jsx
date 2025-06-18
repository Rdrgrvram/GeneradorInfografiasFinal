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
    <div className="bg-white p-10 rounded-2xl shadow-lg max-w-4xl mx-auto mt-8 space-y-8">
      <h2 className="text-3xl font-bold text-center text-fondoInstitucional border-b pb-2">Crear Nueva Infografía</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 px-4 py-2 rounded-md shadow-sm transition-all"
            placeholder="Ej. Independencia de Bolivia"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Contenido</label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <ReactQuill
              theme="snow"
              value={contenido}
              onChange={setContenido}
              className="bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Imagen de vista previa</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
          />
          {imagen && (
            <div className="mt-4">
              <img src={imagen} alt="Vista previa" className="rounded-lg border border-gray-200 shadow max-h-60 object-contain mx-auto" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            disabled={cargando}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow font-semibold transition-all"
          >
            {cargando ? 'Guardando...' : 'Guardar Infografía'}
          </button>

          <button
            type="button"
            onClick={exportarPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-semibold transition-all"
          >
            Exportar a PDF
          </button>
        </div>

        {cargando && (
          <p className="text-center text-sm text-gray-500">⏳ Guardando infografía...</p>
        )}
      </form>

      {/* Contenido oculto pero visible para html2canvas */}
      <div
        ref={exportRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '794px',
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
