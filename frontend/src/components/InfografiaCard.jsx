import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Eye, Edit, Trash2, X, Globe, FileDown, MessageCircle, Ban } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InfografiaCard = ({ infografia, onEliminar, onActualizar, usuario}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mostrarDespublicarModal, setMostrarDespublicarModal] = useState(false);
  const [tituloEdit, setTituloEdit] = useState(infografia.titulo);
  const [contenidoEdit, setContenidoEdit] = useState(infografia.texto);
  const [imagenEdit, setImagenEdit] = useState(infografia.imagenes?.[0] || '');
  const [nuevaImagenBase64, setNuevaImagenBase64] = useState('');

  const contenidoRef = useRef();

  const handleEditar = () => setMostrarEditor(true);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNuevaImagenBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const guardarEdicion = async () => {
    const token = localStorage.getItem('token');

    const payload = {
      titulo: tituloEdit,
      texto: contenidoEdit,
      descripcion: contenidoEdit,
      imagenes: [nuevaImagenBase64 || imagenEdit],
    };

    try {
      const res = await fetch(`http://localhost:3001/api/infografias/${infografia._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert('❌ Error al actualizar');
        return;
      }

      alert('✅ Infografía actualizada');
      setMostrarEditor(false);
      if (onActualizar) onActualizar();
    } catch (err) {
      alert('❌ Error de conexión');
      console.error(err);
    }
  };
const despublicarInfografia = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`http://localhost:3001/api/infografias/despublicar/${infografia._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert('❌ Error al despublicar');
      return;
    }

    alert('✅ Infografía despublicada correctamente');
    setMostrarDespublicarModal(false);
    if (onActualizar) onActualizar();
  } catch (err) {
    console.error(err);
    alert('❌ Error de red al despublicar');
  }
};


  const handleEliminar = async () => {
    if (!window.confirm('¿Eliminar esta infografía?')) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3001/api/infografias/${infografia._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (onEliminar) onEliminar(infografia._id);
  };

  const handlePublicar = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3001/api/infografias/publicar/${infografia._id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('✅ Solicitud enviada al administrador');
    if (onActualizar) onActualizar();
  };

  const handleExportarPDF = async () => {
    const elemento = contenidoRef.current;
    const canvas = await html2canvas(elemento, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${infografia.titulo || 'infografia'}.pdf`);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={infografia.imagenes?.[0] || 'https://via.placeholder.com/400x200?text=Infografía'}
          alt={infografia.titulo}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-fondoInstitucional mb-1">{infografia.titulo}</h3>

          {/* Estado */}
          <p className="text-sm mb-2">
            Estado:{' '}
            <span className={`font-semibold ${
              infografia.estado === 'aprobada' ? 'text-green-600' :
              infografia.estado === 'rechazada' ? 'text-red-500' :
              'text-yellow-600'
            }`}>
              {infografia.estado || 'desconocido'}
            </span>
          </p>

          <div className="flex flex-wrap justify-between gap-2 text-sm mt-2">
            <button onClick={() => setMostrarModal(true)} className="text-blue-600 hover:underline">
              <Eye size={16} /> Ver
            </button>

            {!infografia.espublica && infografia.estado === 'borrador' && (
              <button onClick={handlePublicar} className="text-indigo-600 hover:underline">
                <Globe size={16} /> Publicar
              </button>
            )}

            {!infografia.espublica && ['pendiente', 'rechazada'].includes(infografia.estado) && (
              <button onClick={handlePublicar} className="text-indigo-600 hover:underline">
                <Globe size={16} /> Enviar a revisión
              </button>
            )}

            <button onClick={handleEditar} className="text-orange-500 hover:underline">
              <Edit size={16} /> Editar
            </button>

            <button onClick={handleEliminar} className="text-red-600 hover:underline">
              <Trash2 size={16} /> Eliminar
            </button>

           {infografia.estado === 'aprobada' && infografia.espublica && (
                <button
                  onClick={() => setMostrarDespublicarModal(true)}
                  className="text-gray-700 hover:underline"
                >
                  <Ban size={16} /> Despublicar
                </button>
            )}
            {infografia.estado === 'rechazada' && infografia.feedbackAdmin && (
                <button
                  onClick={() => setMostrarFeedback(true)}
                  className="text-red-500 hover:underline"
                >
                  <MessageCircle size={16} /> Ver feedback
                </button>
              )}


          </div>
        </div>
      </div>

      {/* Modal Ver */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setMostrarModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
              <X size={24} />
            </button>
            <div className="p-6" ref={contenidoRef}>
              <h2 className="text-2xl font-bold text-fondoInstitucional mb-2">{infografia.titulo}</h2>
              {infografia.imagenes?.[0] && (
                <img src={infografia.imagenes[0]} alt="Vista previa" className="w-full max-h-80 object-contain mb-4" />
              )}
              <div dangerouslySetInnerHTML={{ __html: infografia.texto }} className="prose max-w-full overflow-x-auto" />
            </div>
            <div className="p-4 flex justify-end">
              <button onClick={handleExportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                <FileDown size={18} /> Exportar a PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Feedback */}
      {mostrarFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
            <button onClick={() => setMostrarFeedback(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
              <X size={24} />
            </button>
            <h2 className="text-lg font-bold mb-4 text-red-600">Feedback del administrador</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{infografia.feedbackAdmin}</p>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {mostrarEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setMostrarEditor(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
              <X size={24} />
            </button>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-fondoInstitucional mb-4">Editar Infografía</h2>
              <input
                type="text"
                value={tituloEdit}
                onChange={(e) => setTituloEdit(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              />
              <ReactQuill value={contenidoEdit} onChange={setContenidoEdit} theme="snow" />
              <input type="file" onChange={handleImagenChange} />
              {(nuevaImagenBase64 || imagenEdit) && (
                <img src={nuevaImagenBase64 || imagenEdit} alt="Vista previa" className="max-h-48 mt-2" />
              )}
              <div className="flex justify-end">
                <button onClick={guardarEdicion} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal DESPUBLICAR */}
      {mostrarDespublicarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">¿Deseas despublicar esta infografía?</h2>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setMostrarDespublicarModal(false)} className="text-gray-600">Cancelar</button>
              <button onClick={despublicarInfografia} className="bg-red-600 text-white px-4 py-2 rounded">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfografiaCard;
