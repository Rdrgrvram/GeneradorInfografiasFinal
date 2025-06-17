import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ExportadorSimple = () => {
  const ref = useRef();

  const exportarPDF = async () => {
    const input = ref.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('infografia.pdf');
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={exportarPDF} className="bg-green-600 text-white px-4 py-2 rounded">
        Exportar PDF
      </button>

      <div
        ref={ref}
        style={{
          width: '800px',
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#fff',
          color: '#000',
          fontFamily: 'Arial',
          border: '1px solid #ccc'
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#e76f00' }}>Título de prueba</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Google-flutter-logo.png/768px-Google-flutter-logo.png"
          alt="demo"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p>
          Este es un contenido de prueba con texto. Aquí puedes colocar cualquier contenido HTML.
        </p>
      </div>
    </div>
  );
};

export default ExportadorSimple;
