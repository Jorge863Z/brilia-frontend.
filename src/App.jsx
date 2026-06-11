import React, { useState } from 'react';
import Inicio from "./Inicio";
import Paquetes from './Paquetes'; 
import QuienesSomos from "./QuienesSomos"; 
import Referencias from "./Referencias";

// 🌟 Importamos el nuevo logo de Brilia
import logoBrilia from './assets/logo.png';

export default function App() {
  const [ventana, setVentana] = useState('inicio');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      
      {/* 🧭 NAVBAR / MENÚ DE NAVEGACIÓN */}
      <nav className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50 px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* 🌟 LOGO DE BRILIA */}
          <div 
            className="flex items-center cursor-pointer transition-transform duration-200 active:scale-95" 
            onClick={() => setVentana('inicio')}
          >
            <img 
              src={logoBrilia} 
              alt="BRILIA" 
              className="h-11 w-auto object-contain" 
            />
          </div>
          
          {/* 🔘 MENÚ DE BOTONES CON LOS COLORES DEL LOGO (Teal / Cyan) */}
          <div className="flex gap-6 font-semibold text-sm text-slate-600">
            <button 
              onClick={() => setVentana('inicio')} 
              className={`transition-colors duration-200 ${
                ventana === 'inicio' 
                  ? 'text-teal-600 font-extrabold border-b-2 border-teal-600 pb-1' 
                  : 'hover:text-cyan-500'
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setVentana('quienes-somos')} 
              className={`transition-colors duration-200 ${
                ventana === 'quienes-somos' 
                  ? 'text-teal-600 font-extrabold border-b-2 border-teal-600 pb-1' 
                  : 'hover:text-cyan-500'
              }`}
            >
              Quiénes Somos
            </button>
            <button 
              onClick={() => setVentana('referencias')} 
              className={`transition-colors duration-200 ${
                ventana === 'referencias' 
                  ? 'text-teal-600 font-extrabold border-b-2 border-teal-600 pb-1' 
                  : 'hover:text-cyan-500'
              }`}
            >
              Galería
            </button>
            <button 
              onClick={() => setVentana('paquetes')} 
              className={`transition-colors duration-200 ${
                ventana === 'paquetes' 
                  ? 'text-teal-600 font-extrabold border-b-2 border-teal-600 pb-1' 
                  : 'hover:text-cyan-500'
              }`}
            >
              Paquetes y Reserva
            </button>
          </div>
        </div>
      </nav>

      {/* 💻 CONTENEDOR DINÁMICO DE VENTANAS */}
      <main className="flex-grow">
        {ventana === 'inicio' && (
          <Inicio setVentana={setVentana} />
        )}

        {ventana === 'quienes-somos' && (
          <QuienesSomos />
        )}

        {ventana === 'paquetes' && (
          <div className="py-12 px-4 max-w-7xl mx-auto">
            <Paquetes />
          </div>
        )}

        {ventana === 'referencias' && (
          <Referencias />
        )}
      </main>

      {/* 👣 FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <p>© 2026 BRILIA Servicios de Limpieza. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}