import React from 'react';

export default function Referencias() {
  // Datos simulados de tus trabajos. Después podrás cambiar las URLs por tus fotos reales
  const proyectos = [
    {
      id: 1,
      titulo: "Limpieza Residencial - Sala Premium",
      descripcion: "Mantenimiento regular con enfoque en desinfección y orden de mobiliario.",
      imagen: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      titulo: "Cocina a Fondo - Paquete Estándar",
      descripcion: "Eliminación de grasa en parrillas, campanas y abrillantado de superficies.",
      imagen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      titulo: "Espacios Corporativos - Oficinas",
      descripcion: "Limpieza y desinfección de escritorios, áreas comunes y pisos de alta circulación.",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      titulo: "Detalle en Baños - Limpieza Profunda",
      descripcion: "Remoción de sarro, desinfección total de azulejos y piezas sanitarias.",
      imagen: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      titulo: "Habitaciones - Armonía y Frescura",
      descripcion: "Tendido de camas de hotel, sacudido minucioso y aspirado de alfombras.",
      imagen: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      titulo: "Interiores Relucientes - Ventanas",
      descripcion: "Limpieza profunda de cristales y cancelería para una máxima iluminación natural.",
      imagen: "https://images.unsplash.com/photo-1603712765967-582967224417?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-slate-50 font-sans text-slate-800">
      
      {/* 📸 ENCABEZADO */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Galería de Referencias
          </h1>
          <p className="text-indigo-200 text-base md:text-lg max-w-xl mx-auto font-medium">
            Una muestra visual de la frescura, el orden y la calidad que dejamos en cada rincón.
          </p>
        </div>
      </section>

      {/* 🖼️ GRILLA DE IMÁGENES */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Contenedor de la foto con efecto Zoom en Hover */}
              <div className="relative overflow-hidden h-64 bg-slate-200">
                <img 
                  src={proyecto.imagen} 
                  alt={proyecto.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  ✨ Brilia Calidad
                </div>
              </div>

              {/* Textos del Trabajo realizado */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {proyecto.titulo}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {proyecto.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}