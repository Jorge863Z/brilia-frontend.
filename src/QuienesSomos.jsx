import React from 'react';

export default function QuienesSomos() {
  return (
    <div className="bg-slate-50 font-sans text-slate-800 animate-fadeIn">
      
      {/* 🏙️ ENCABEZADO DE LA SECCIÓN */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Nuestra Esencia
          </h1>
          <p className="text-indigo-200 text-base md:text-lg max-w-xl mx-auto font-medium">
            Conoce los valores, el equipo y el compromiso detrás de cada espacio que hacemos brillar.
          </p>
        </div>
      </section>

      {/* 📖 SECCIÓN PRINCIPAL: QUIÉNES SOMOS */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-slate-100 flex flex-col gap-8">
          
          {/* Bloque 1: Presentación */}
          <div className="border-l-4 border-indigo-600 pl-4 md:pl-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">¿Quiénes Somos?</h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Somos una empresa especializada en servicios de limpieza, comprometida con la calidad, 
              la puntualidad y la confianza; en <strong className="text-indigo-600 font-semibold">Brilia</strong> transformamos 
              cada espacio en un lugar limpio, ordenado y lleno de armonía.
            </p>
          </div>

          {/* Bloque 2: Nuestro Equipo */}
          <div className="border-l-4 border-purple-600 pl-4 md:pl-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Nuestro Equipo y Cuidado</h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Nuestro equipo está conformado por personal capacitado y de confianza, que cuida cada 
              detalle como si fuera su propio hogar. Utilizamos productos seguros y eficaces, para 
              garantizar un entorno saludable para ti y tu familia.
            </p>
          </div>

          {/* Bloque 3: Propósito */}
          <div className="border-l-4 border-emerald-500 pl-4 md:pl-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Nuestra Promesa</h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Ya sea una limpieza profunda, mantenimiento regular o un servicio especial, en 
              <strong> Brilia</strong> nos encargamos de que tu hogar siempre brille con esa sensación de 
              frescura, orden y bienestar que mereces.
            </p>
          </div>

        </div>
      </section>

      {/* 🛡️ PILARES DE CONFIANZA BRILIA */}
      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">Los Valores que Nos Guían</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <span className="text-3xl block mb-3">✨</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Calidad Absoluta</h3>
              <p className="text-slate-600 text-sm leading-relaxed">No dejamos esquinas sin revisar. Nos apasiona ver la transformación impecable de tu entorno.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <span className="text-3xl block mb-3">⏰</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Puntualidad Marcial</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Respetamos tu agenda. Llegamos con puntualidad exacta equipados con todo lo necesario.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <span className="text-3xl block mb-3">🛡️</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Seguridad y Confianza</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Personal estrictamente seleccionado para brindarte tranquilidad absoluta mientras cuidamos tu espacio.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}