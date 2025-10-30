import Readable from "../a11y/Readable";

const restaurants = [
  { id: 'r1', name: 'Casa del Sabor', desc: 'Restaurante con rampas, menús en braille y opciones sin gluten.', img: '/images/restaurant1.jpg', features: ['Rampas','Menú en braille','Opciones sin gluten'] },
  { id: 'r2', name: 'Mar y Tierra', desc: 'Acceso adaptado y personal capacitado en atención a personas con movilidad reducida.', img: '/images/restaurant2.jpg', features: ['Acceso adaptado','Reservas accesibles'] },
  { id: 'r3', name: 'Sabores Andinos', desc: 'Espacios amplios entre mesas y menú visual para personas con dificultades de comunicación.', img: '/images/restaurant3.jpg', features: ['Espacio amplio','Menú visual'] }
];

export default function Gastronomia() {
  return (
    <Readable>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gastronomía</h1>
          <p className="text-sm text-gray-600">Disfruta la cocina local con opciones inclusivas.</p>
        </div>

        <p className="text-gray-700 max-w-3xl">
          Nuestra selección de restaurantes incluye lugares que adoptan buenas prácticas de accesibilidad: entradas sin escalones, menús alternativos,
          atención capacitada y áreas adaptadas. Aquí encontrarás ejemplos y recomendaciones.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(r => (
            <article key={r.id} className="rounded-xl border bg-white shadow-sm overflow-hidden">
              <img src={r.img} alt={r.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{r.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{r.desc}</p>
                <div className="flex gap-2 flex-wrap mt-3">
                  {r.features.map(f => <span key={f} className="text-xs px-2 py-1 rounded-full bg-gray-100">{f}</span>)}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <a href={`/app/gastronomia/${r.id}`} className="text-blue-600 underline">Ver detalles</a>
                  <button className="px-3 py-1 rounded bg-green-600 text-white">Reservar</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-8 p-4 bg-gray-50 rounded">
          <h4 className="font-semibold">Consejos para comer fuera</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Indica siempre restricciones alimentarias al hacer la reserva.</li>
            <li>Pide información sobre accesibilidad del baño y la entrada.</li>
            <li>Solicita la carta en formato accesible (braille, digital o texto grande) si la necesitas.</li>
          </ul>
        </section>
      </section>
    </Readable>
  );
}
