import Readable from "../a11y/Readable";

const sample = [
  {
    id: 'galapagos',
    title: 'Islas Galápagos',
    desc: 'Rutas guiadas accesibles, barcos con rampas y personal capacitado. Zonas de observación adaptadas.',
    img: '/images/galapagos.jpg',
    badges: ['♿ Accesible', 'Guía accesible', 'Transporte adaptado']
  },
  {
    id: 'quito',
    title: 'Quito - Centro Histórico',
    desc: 'Circuitos peatonales, museos con audioguía y rampas en puntos clave.',
    img: '/images/quito.jpg',
    badges: ['Ruta urbana', 'Museos accesibles']
  },
  {
    id: 'amazon',
    title: 'Amazonía',
    desc: 'Experiencias inclusivas en la selva con rutas adaptadas y alojamiento accesible.',
    img: '/images/amazonia.jpg',
    badges: ['Aventura adaptada', 'Lodges accesibles']
  }
];

export default function Destinos(){
  return (
    <Readable>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Destinos</h1>
          <p className="text-sm text-gray-600">Explora lugares adaptados y planifica tu viaje con confianza.</p>
        </div>

        <p className="text-gray-700 max-w-3xl">
          Seleccionamos destinos con infraestructuras accesibles, guías formados y opciones de transporte adaptado. En cada ficha encontrarás
          información sobre accesibilidad física, auditiva y sensorial, además de recomendaciones prácticas.
        </p>

        <div className="flex gap-3 flex-wrap">
          <button className="px-3 py-1 rounded-full border">Todos</button>
          <button className="px-3 py-1 rounded-full border">Costa</button>
          <button className="px-3 py-1 rounded-full border">Sierra</button>
          <button className="px-3 py-1 rounded-full border">Amazonía</button>
          <button className="px-3 py-1 rounded-full border">Islas</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sample.map(d => (
            <article key={d.id} className="rounded-xl border bg-white shadow-sm overflow-hidden">
              <img src={d.img} alt={d.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{d.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{d.desc}</p>
                <div className="flex gap-2 flex-wrap mt-3">
                  {d.badges.map(b => (
                    <span key={b} className="text-xs px-2 py-1 rounded-full bg-gray-100">{b}</span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <a href={`/app/destinos/${d.id}`} className="text-blue-600 underline">Ver ficha</a>
                  <button className="px-3 py-1 rounded bg-blue-600 text-white">Solicitar asistencia</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-8 p-4 bg-gray-50 rounded">
          <h4 className="font-semibold">Consejos de accesibilidad</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Contacta con el operador antes de reservar para confirmar servicios adaptados.</li>
            <li>Solicita información sobre plazas de aparcamiento reservadas y rampas de embarque.</li>
            <li>Pregunta por itinerarios alternativos para personas con movilidad reducida o hipersensibilidad sensorial.</li>
          </ul>
        </section>
      </section>
    </Readable>
  );
}
