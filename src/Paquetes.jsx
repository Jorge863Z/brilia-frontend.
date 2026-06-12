import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'react-calendar/dist/Calendar.css'; 
import 'leaflet/dist/leaflet.css'; // Estilos esenciales del mapa
import L from 'leaflet';

// 📌 SOLUCIÓN BUG DE ICONOS: Corrige el problema donde React no encuentra las imágenes del Pin de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// ➕ LISTA DE ADD-ONS DISPONIBLES (UPSELLING)
const listaAddOns = [
  { id: 'karcher', nombre: 'Limpieza con Karcher (Áreas comunes/portones)', precio: 250 },
  { id: 'refri', nombre: 'Limpieza de Refrigerador por dentro', precio: 150 },
  { id: 'horno_micro', nombre: 'Limpieza de Horno o Microondas por dentro (C/U)', precio: 100 },
  { id: 'ventanas_ext', nombre: 'Limpieza de Ventanas Exteriores', precio: 150 }
];

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
  
  // Estados del Formulario de Reserva
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccionManual, setDireccionManual] = useState('');
  const [fechaCita, setFechaCita] = useState(new Date());
  const [horaCita, setHoraCita] = useState('');
  const [isCargandoPago, setIsCargandoPago] = useState(false);

  // ➕ Estado para controlar los Add-ons seleccionados
  const [addOnsSeleccionados, setAddOnsSeleccionados] = useState([]);

  // 📆 Estado para las horas ya ocupadas en Supabase
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  // 🗺️ Estados de Posicionamiento Geográfico (Inicia centrado en Cárdenas, Tabasco)
  const [latitud, setLatitud] = useState(17.9793);
  const [longitud, setLongitud] = useState(-93.3849);

  // Horarios disponibles fijos en el Frontend
  const horariosDisponibles = ['09:00 AM', '11:00 AM', '01:00 PM', '04:00 PM'];

  // 1. Componente interno de Leaflet para capturar los clics del usuario en el mapa
  function DetectorDeClics() {
    useMapEvents({
      click(e) {
        setLatitud(e.latlng.lat);
        setLongitud(e.latlng.lng);
        setDireccionManual(`Ubicación seleccionada en mapa (Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}) - Completa tu calle aquí: `);
      },
    });
    return null;
  }

  // 2. Cargar paquetes desde el Backend al montar la página
  useEffect(() => {
    fetch('https://brilia-backend.onrender.com/api/citas-ocupadas')
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setPaquetes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar paquetes:", err);
        setLoading(false);
      });
  }, []);

  // 📆 3. EFECTO: Consultar qué horas ya se pagaron cada vez que cambia la fecha seleccionada
  useEffect(() => {
    if (!fechaCita) return;

    const fechaFormateada = fechaCita.toISOString().split('T')[0];
    
    // 🔍 CORREGIDO: Se eliminó el residuo del localhost anterior que rompía la sintaxis del string literal
    fetch(`https://brilia-backend.onrender.com/api/citas-ocupadas?fecha=${fechaFormateada}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.horasOcupadas) {
          setHorasOcupadas(res.horasOcupadas); // Guarda las horas bloqueadas
        }
      })
      .catch((err) => console.error("Error al traer horas ocupadas:", err));
  }, [fechaCita]);

  // 4. Activa el modal al seleccionar un paquete
  const handleAbrirReserva = (paquete) => {
    setPaqueteSeleccionado(paquete);
    setAddOnsSeleccionados([]); // Resetea extras anteriores
    setHoraCita(''); // Obliga a elegir horario de nuevo
    setIsModalOpen(true);
  };

  // 5. Obtener ubicación automática por GPS del navegador
  const handleObtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitud(latitude);
          setLongitud(longitude);
          setDireccionManual(`📍 Ubicación GPS Detectada (Cárdenas) - Agrega tu Calle y Número aquí: `);
        },
        () => {
          alert("No se pudo obtener la ubicación automática. Por favor selecciona tu casa haciendo clic en el mapa.");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  // ➕ 6. Operaciones matemáticas para los Add-ons y el Total acumulado
  const obtenerCostoExtras = () => {
    return addOnsSeleccionados.reduce((total, id) => {
      const addon = listaAddOns.find(item => item.id === id);
      return total + (addon ? addon.precio : 0);
    }, 0);
  };

  const calcularTotalFinal = () => {
    const base = paqueteSeleccionado ? parseFloat(paqueteSeleccionado.precio_base) : 0;
    return base + obtenerCostoExtras();
  };

  const manejarAddOnToggle = (id) => {
    if (addOnsSeleccionados.includes(id)) {
      setAddOnsSeleccionados(addOnsSeleccionados.filter(item => item !== id));
    } else {
      setAddOnsSeleccionados([...addOnsSeleccionados, id]);
    }
  };

  // 7. Procesar Registro y Redirección Directa a Mercado Pago
  const handleAgendarYPagar = async (e) => {
    e.preventDefault();
    setIsCargandoPago(true);

    // Mapeamos los nombres de los extras activos para pasarlos al backend
    const nombresExtras = addOnsSeleccionados.map(id => {
      return listaAddOns.find(item => item.id === id)?.nombre;
    });

    try {
      // 🔍 CORREGIDO: Se cambió 'http://localhost:3005' por la URL pública de tu backend en Render
      const response = await fetch('https://brilia-backend.onrender.com/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: paqueteSeleccionado.nombre,
          price: calcularTotalFinal(), // 🌟 Enviamos el total real con adicionales
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          direccion: direccionManual,
          latitud: latitud,  
          longitud: longitud, 
          id_paquete: paqueteSeleccionado.id,
          addons: nombresExtras, // 🌟 Pasamos el array de extras para el correo
          fecha: fechaCita.toISOString().split('T')[0],
          hora_inicio: horaCita === '09:00 AM' ? '09:00:00' : horaCita === '11:00 AM' ? '11:00:00' : horaCita === '01:00 PM' ? '13:00:00' : '16:00:00'
        }),
      });

      const data = await response.json();
      if (data.id) {
        window.open(`https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${data.id}`, '_blank');
        setIsModalOpen(false);
      } else {
        alert("Error al generar la pasarela de pago");
      }
    } catch (error) {
      console.error("Error en el flujo de agendado:", error);
    } finally {
      setIsCargandoPago(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="text-xl font-semibold text-indigo-600 animate-pulse">Cargando los paquetes de BRILIA...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Nuestros Paquetes de Limpieza
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          Selecciona el servicio ideal para tu hogar o negocio y agenda en segundos.
        </p>
      </div>

      {/* Grid de Tarjetas de Catálogo */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {paquetes.map((paquete) => (
          <div key={paquete.id} className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{paquete.nombre}</h3>
              <p className="text-sm italic text-indigo-600 font-medium mt-1">{paquete.eslogan}</p>
              
              <div className="mt-4 bg-indigo-50 rounded-xl p-3 text-center">
                <span className="text-3xl font-black text-indigo-700 block">${paquete.precio_base}</span>
                <span className="text-sm text-slate-500 font-medium block mt-1">{paquete.duracion_horas} Horas de Servicio</span>
              </div>

              <p className="mt-6 text-sm text-slate-600 leading-relaxed">{paquete.descripcion}</p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleAbrirReserva(paquete)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md"
              >
                Seleccionar Paquete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EMERGENTE: FORMULARIO DE CITAS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto animate-fadeIn">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black text-slate-800 mb-2">Configura tu Cita de Limpieza</h2>
            <p className="text-sm text-indigo-600 font-semibold mb-6">Paquete seleccionado: {paqueteSeleccionado?.nombre}</p>

            <form onSubmit={handleAgendarYPagar} className="space-y-6">
              
              {/* Sección 1: Datos Personales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre</label>
                  <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-indigo-600" placeholder="Ej. Jorge" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Apellido</label>
                  <input required type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-indigo-600" placeholder="Ej. Valenzuela" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono (10 dígitos)</label>
                  <input required type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-indigo-600" placeholder="Ej. 9371234567" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico</label>
                  <input required type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-indigo-600" placeholder="jorge@example.com" />
                </div>
              </div>

              {/* Sección 2: Dirección y Mapa Real e Interactivo */}
              <div className="border-t border-slate-100 pt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dirección del Servicio (Haz clic en el mapa para marcar tu casa)</label>
                <div className="flex gap-2 mb-3">
                  <input required type="text" value={direccionManual} onChange={(e) => setDireccionManual(e.target.value)} className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-indigo-600" placeholder="Calle, Número, Colonia o Fraccionamiento..." />
                  <button type="button" onClick={handleObtenerUbicacion} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 rounded-xl transition-colors">
                    📍 Ubicación GPS
                  </button>
                </div>
                
                <div className="w-full h-52 rounded-2xl overflow-hidden border border-slate-200 relative z-0 shadow-inner">
                  <MapContainer center={[17.9793, -93.3849]} zoom={14} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[latitud, longitud]}>
                      <Popup>🧹 ¡Aquí agendaremos tu servicio de BRILIA!</Popup>
                    </Marker>
                    <DetectorDeClics />
                  </MapContainer>
                </div>
              </div>

              {/* Sección 3: Agenda (Calendario + Horas Ocupadas Dinámicas) */}
              <div className="border-t border-slate-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Selecciona el Día</label>
                  <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <Calendar 
                      onChange={setFechaCita} 
                      value={fechaCita} 
                      minDate={new Date()} 
                      className="mx-auto border-none rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Horas Disponibles para el {fechaCita.toLocaleDateString()}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {horariosDisponibles.map((hora) => {
                      const formatoDB = hora === '09:00 AM' ? '09:00:00' : hora === '11:00 AM' ? '11:00:00' : hora === '01:00 PM' ? '13:00:00' : '16:00:00';
                      
                      // 🌟 Si el horario ya fue devuelto por el Backend, se deshabilita visualmente con line-through
                      if (horasOcupadas.includes(formatoDB)) {
                        return (
                          <div key={hora} className="py-3 px-4 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 text-center cursor-not-allowed line-through select-none">
                            {hora} (Ocupado)
                          </div>
                        );
                      }

                      return (
                        <button
                          key={hora}
                          type="button"
                          onClick={() => setHoraCita(hora)}
                          className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all border text-center ${
                            horaCita === hora 
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102' 
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'
                          }`}
                        >
                          {hora}
                        </button>
                      );
                    })}
                  </div>
                  {horaCita && (
                    <p className="mt-4 text-xs text-emerald-600 font-bold bg-emerald-50 py-2 px-3 rounded-lg border border-emerald-100">
                      ✓ Seleccionado: {fechaCita.toLocaleDateString()} a las {horaCita}
                    </p>
                  )}
                </div>
              </div>

              {/* 🌟 SECCIÓN NUEVA: ADD-ONS (UPSELLING) */}
              <div className="border-t border-slate-100 pt-6 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2 tracking-wider">
                  ➕ ¿Deseas agregar algún servicio adicional?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {listaAddOns.map((addon) => (
                    <label 
                      key={addon.id} 
                      className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all select-none ${
                        addOnsSeleccionados.includes(addon.id) 
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-sm' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={addOnsSeleccionados.includes(addon.id)}
                          onChange={() => manejarAddOnToggle(addon.id)}
                          className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-xs font-semibold text-slate-700">{addon.nombre}</span>
                      </div>
                      <span className="text-xs font-extrabold text-indigo-600 shrink-0 ml-2">
                        +${addon.precio}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 🌟 SECCIÓN NUEVA: DESGLOSE DE PRECIOS ACTUALIZADOS */}
              <div className="border-t border-slate-100 pt-6">
                <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex flex-col gap-2 text-sm border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Costo base del paquete:</span>
                    <span className="font-semibold">${paqueteSeleccionado?.precio_base}.00</span>
                  </div>
                  {obtenerCostoExtras() > 0 && (
                    <div className="flex justify-between text-indigo-600 font-medium">
                      <span>Servicios adicionales:</span>
                      <span>+${obtenerCostoExtras()}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200/60 pt-2 mt-1">
                    <span>Total Neto a Pagar:</span>
                    <span className="text-indigo-600">${calcularTotalFinal()}.00 MXN</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCargandoPago || !horaCita}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg text-sm tracking-wider uppercase"
                >
                  {isCargandoPago ? 'Procesando Reserva...' : '⚡ Agendar Cita y Pagar'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
