import React from 'react';

export default function Inicio({ setVentana }) {
  return (
    <div className="bg-slate-50 font-sans text-slate-800">
      
      {/* 🚀 SECCIÓN HERO - ACTUALIZADA CON COLORES DEL LOGO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950 text-white py-28 px-6 text-center overflow-hidden">
        {/* Patrón sutil de fondo */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-teal-500/30">
            ✨ Bienvenido a BRILIA
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 mb-6 leading-tight">
            Servicios de Limpieza Profesionales <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-200">
              Que Hacen Brillar Tu Hogar
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transformamos cada rincón en un lugar limpio, ordenado y lleno de armonía. Nos encargamos de todo para que disfrutes de tu tiempo libre.
          </p>
          
          {/* 🔘 BOTONES DE ACCIÓN PRINCIPALES - CLON DE TU CAPTURA DE PANTALLA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            
            {/* Botón principal con degradado premium */}
            <button 
              onClick={() => setVentana('paquetes')} 
              className="px-8 py-4 bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 hover:from-sky-500 hover:to-emerald-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-base tracking-wide"
            >
              Ver paquetes <span className="text-lg">→</span>
            </button>

            {/* Botón secundario estilizado */}
            <button 
              onClick={() => setVentana('quienes-somos')} 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 shadow-sm transition-all duration-300 text-base backdrop-blur-sm"
            >
              Conócenos
            </button>

          </div>
        </div>
      </section>

      {/* ⚙️ SECCIÓN INFORMATIVA RÁPIDA - RE-ESTILIZADA */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué elegir Brilia?</h2>
        <p className="text-slate-600 mb-12">Llevamos la limpieza residencial y comercial al siguiente nivel en Tabasco.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transform hover:scale-103 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-teal-600">✨ Calidad</h3>
            <p className="text-slate-600 text-sm">Cuidamos cada rincón y detalle con la máxima meticulosidad del mercado.</p>
          </div>
          
          {/* Tarjeta 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transform hover:scale-103 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-teal-600">⏰ Puntualidad</h3>
            <p className="text-slate-600 text-sm">Tu tiempo es sagrado. Nuestro personal llega puntual y listo para trabajar.</p>
          </div>
          
          {/* Tarjeta 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transform hover:scale-103 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 text-teal-600">🛡️ Confianza</h3>
            <p className="text-slate-600 text-sm">Personal minuciosamente seleccionado y capacitado para tu total tranquilidad.</p>
          </div>
        </div>
      </section>

    </div>
  );
}