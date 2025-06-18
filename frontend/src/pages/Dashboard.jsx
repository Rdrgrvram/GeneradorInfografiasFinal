import React, { useState } from 'react';
import {
  Plus, FolderOpen, Search, FileText, Home, Layers, Users, LayoutDashboard, ClipboardCheck, Menu,
} from 'lucide-react';

import CrearInfografia from '../components/CrearInfografia';
import ExplorarInfografias from '../components/ExplorarInfografias';
import PlantillasInfografia from '../components/PlantillasInfografia';
import GestionUsuarios from '../components/GestionUsuarios';
import RevisarPeticiones from '../components/RevisarPeticiones';
import MisInfografias from '../components/MisInfografias';

const Dashboard = () => {
  const [vistaActiva, setVistaActiva] = useState('inicio');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const rol = localStorage.getItem('rol') || 'editor';

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-inter">
      {/* SIDEBAR */}
      <aside className={`w-full md:w-64 bg-fondoInstitucional text-white p-6 space-y-6 shadow-md ${menuAbierto ? 'block' : 'hidden'} md:block`}>
        <div className="flex items-center gap-3 mb-8 text-lg font-semibold">
          <LayoutDashboard className="w-6 h-6 text-orange-400" />
          <span>Generador de Infografías</span>
        </div>
        <nav className="space-y-4 text-sm">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active={vistaActiva === 'inicio'} onClick={() => setVistaActiva('inicio')} />
          {(rol === 'editor' || rol === 'administrador') && (
            <>
              <SidebarItem icon={<FolderOpen size={18} />} label="Mis Infografías" active={vistaActiva === 'mis'} onClick={() => setVistaActiva('mis')} />
              <SidebarItem icon={<FileText size={18} />} label="Crear Infografía" active={vistaActiva === 'crear'} onClick={() => setVistaActiva('crear')} />
            </>
          )}
          <SidebarItem icon={<Layers size={18} />} label="Plantillas" active={vistaActiva === 'plantillas'} onClick={() => setVistaActiva('plantillas')} />
          <SidebarItem icon={<Search size={18} />} label="Explorar" active={vistaActiva === 'explorar'} onClick={() => setVistaActiva('explorar')} />
          {rol === 'administrador' && (
            <>
              <SidebarItem icon={<ClipboardCheck size={18} />} label="Revisar Peticiones" active={vistaActiva === 'revisar'} onClick={() => setVistaActiva('revisar')} />
              <SidebarItem icon={<Users size={18} />} label="Usuarios" active={vistaActiva === 'usuarios'} onClick={() => setVistaActiva('usuarios')} />
            </>
          )}
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 bg-gray-50 p-6 sm:p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="md:hidden bg-orange-500 text-white px-2 py-1 rounded"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Hola, {localStorage.getItem('nombre') || 'usuario'} 👋</h1>
              <p className="text-sm text-gray-600">Rol actual: <strong>{rol}</strong></p>
            </div>
          </div>
          <div>
            <select
              className="border border-gray-300 px-3 py-1 rounded text-sm"
              onChange={(e) => {
                if (e.target.value === 'logout') {
                  localStorage.clear();
                  window.location.href = '/login';
                }
              }}
            >
              <option value="">{localStorage.getItem('nombre') || 'Usuario'}</option>
              <option value="logout">Salir</option>
            </select>
          </div>
        </div>

        {/* VISTAS */}
        {vistaActiva === 'inicio' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {(rol === 'editor' || rol === 'administrador') && (
              <>
                <CardDashboard icon={<Plus size={28} />} label="Crear nueva infografía" onClick={() => setVistaActiva('crear')} />
                <CardDashboard icon={<FolderOpen size={28} />} label="Ver infografías guardadas" onClick={() => setVistaActiva('mis')} />
              </>
            )}
            <CardDashboard icon={<FileText size={28} />} label="Explorar infografías públicas" onClick={() => setVistaActiva('explorar')} />
            <CardDashboard icon={<Layers size={28} />} label="Usar plantillas" onClick={() => setVistaActiva('plantillas')} />
            {rol === 'administrador' && (
              <>
                <CardDashboard icon={<ClipboardCheck size={28} />} label="Revisar Peticiones" onClick={() => setVistaActiva('revisar')} />
                <CardDashboard icon={<Users size={28} />} label="Gestión de Usuarios" onClick={() => setVistaActiva('usuarios')} />
              </>
            )}
          </div>
        )}

        {vistaActiva === 'crear' && <CrearInfografia setVistaActiva={setVistaActiva} />}
        {vistaActiva === 'plantillas' && <PlantillasInfografia />}
        {vistaActiva === 'explorar' && <ExplorarInfografias />}
        {vistaActiva === 'usuarios' && rol === 'administrador' && <GestionUsuarios />}
        {vistaActiva === 'revisar' && rol === 'administrador' && <RevisarPeticiones />}
        {vistaActiva === 'mis' && <MisInfografias />}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition ${active ? 'bg-orange-500 text-white' : 'hover:bg-gray-700'}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

const CardDashboard = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 border border-gray-200 p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition cursor-pointer"
  >
    <div className="text-orange-500">{icon}</div>
    <div className="text-base font-medium">{label}</div>
  </div>
);

export default Dashboard;
