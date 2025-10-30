import Readable from "../a11y/Readable";

const events = [
  { id: 'e1', title: 'Festival de Música Inclusiva', date: '2025-11-12', place: 'Parque Central', features: ['Intérprete LSE','Área reservada','Bucle magnético'] },
  { id: 'e2', title: 'Feria Gastronómica', date: '2025-12-05', place: 'Malecón', features: ['Acceso adaptado','Señalética en braille'] },
  { id: 'e3', title: 'Ruta Patrimonial Guiada', date: '2025-11-20', place: 'Quito', features: ['Audioguía','Rutas adaptadas'] }
];

export default function Eventos() {
  return (
    <Readable>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Eventos</h1>
          <p className="text-sm text-gray-600">Agenda de actividades inclusivas y eventos adaptados.</p>
        </div>

        <p className="text-gray-700 max-w-3xl">
          Consulta la programación de eventos que priorizan la accesibilidad: intérpretes, subtítulos en pantallas,
          bucles magnéticos y rutas limpias para circulación. Reserva tu entrada y solicita adaptaciones con antelación.
        </p>

        <div className="space-y-4">
          {events.map(ev => (
            <article key={ev.id} className="p-4 border rounded bg-white shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{ev.title}</h3>
                  <p className="text-sm text-gray-600">{ev.place} — <time dateTime={ev.date}>{ev.date}</time></p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex gap-2">
                    {ev.features.map(f => <span key={f} className="text-xs px-2 py-1 rounded bg-gray-100">{f}</span>)}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 rounded bg-blue-600 text-white">Ver entradas</button>
                    <button className="px-3 py-1 rounded border">Solicitar adaptación</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-6 p-4 bg-gray-50 rounded">
          <h4 className="font-semibold">Cómo solicitar adaptaciones</h4>
          <ol className="list-decimal list-inside text-gray-700 mt-2">
            <li>Contacta con el organizador con al menos 48 horas de antelación.</li>
            <li>Describe la adaptación requerida: asiento reservado, intérprete, acceso específico, etc.</li>
            <li>Confirma por escrito la petición y guarda el comprobante.</li>
          </ol>
        </section>
      </section>
    </Readable>
  );
}
