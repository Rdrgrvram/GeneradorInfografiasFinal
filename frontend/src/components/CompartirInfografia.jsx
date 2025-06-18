import React from 'react';
import { Share2, FileDown, Copy } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CompartirInfografia = ({ selector = '.prose' ,titulo}) => {
  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✅ URL copiada al portapapeles');
  };

  const handleShareWhatsApp = () => {
    const mensaje = encodeURIComponent(`¡Mira esta infografía! ${window.location.href}`);
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
  };

  const handleExportPDF = async () => {
  const elemento = document.querySelector(selector);
  if (!elemento) return alert('⚠️ No se encontró la infografía para exportar.');

  // Mostrar todo el contenido temporalmente (quita el overflow)
  const originalOverflow = elemento.style.overflow;
  const originalMaxHeight = elemento.style.maxHeight;

  elemento.style.overflow = 'visible';
  elemento.style.maxHeight = 'none';

  await new Promise((resolve) => setTimeout(resolve, 300)); // pequeño delay para render

  const canvas = await html2canvas(elemento, {
    scale: 2,
    useCORS: true,
  });

  // Restaurar estilos originales
  elemento.style.overflow = originalOverflow;
  elemento.style.maxHeight = originalMaxHeight;

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight < pageHeight) {
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  } else {
    let position = 10;
    let remainingHeight = imgHeight;
    const imgHeightPerPage = pageHeight - 20;

    const pageCanvas = document.createElement('canvas');
    const context = pageCanvas.getContext('2d');
    pageCanvas.width = canvas.width;
    pageCanvas.height = imgHeightPerPage * (canvas.width / imgWidth);

    let pageNum = 0;
    while (remainingHeight > 0) {
      context.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
      context.drawImage(
        canvas,
        0,
        (pageNum * imgHeightPerPage * canvas.width) / imgWidth,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        canvas.width,
        pageCanvas.height
      );
      const img = pageCanvas.toDataURL('image/png');
      if (pageNum > 0) pdf.addPage();
      pdf.addImage(img, 'PNG', 10, 10, imgWidth, imgHeightPerPage);
      remainingHeight -= imgHeightPerPage;
      pageNum++;
    }
  }
    const nombreArchivo = `${(titulo || 'infografia')
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_')
    .substring(0, 50)}.pdf`;
    pdf.save(nombreArchivo);

};


  return (
    <div className="my-10 border-t pt-6">
      <h4 className="text-lg font-semibold mb-4 text-gray-700">🔗 Compartir esta infografía</h4>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleCopyURL}
          title="Copiar URL"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition duration-200"
        >
          <Copy size={18} /> Copiar URL
        </button>

        <button
          onClick={handleShareWhatsApp}
          title="Compartir por WhatsApp"
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-sm rounded-full hover:bg-green-200 transition duration-200"
        >
          <Share2 size={18} /> WhatsApp
        </button>

        <button
          onClick={handleExportPDF}
          title="Exportar como PDF"
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-sm rounded-full hover:bg-blue-200 transition duration-200"
        >
          <FileDown size={18} /> Exportar PDF
        </button>
      </div>
    </div>
  );
};

export default CompartirInfografia;
