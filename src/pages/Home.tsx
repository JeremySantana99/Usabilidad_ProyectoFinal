import { useEffect, useState } from "react";
import Readable from "../a11y/Readable";
import { testimonials } from '../data/demo';

export default function Home() {
  // Videos destacados de destinos
  const videos = ["/videos/video1.mp4", "/videos/video2.mp4", "/videos/video3.mp4"];
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((v) => (v + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Servicios turísticos destacados
  const services = [
    { 
      icon: "🏖️", 
      title: "Playas Paradisíacas", 
      desc: "Descubre las mejores playas de Ecuador con servicios completos y actividades para todos." 
    },
    { 
      icon: "🏰", 
      title: "Rutas Históricas", 
      desc: "Explora el rico patrimonio cultural e histórico de nuestras ciudades coloniales." 
    },
    { 
      icon: "🌋", 
      title: "Aventura Natural", 
      desc: "Experiencias únicas en volcanes, selvas y reservas naturales." 
    },
    { 
      icon: "🍽️", 
      title: "Gastronomía Local", 
      desc: "Degusta la auténtica cocina ecuatoriana en los mejores restaurantes." 
    },
  ];

  // Galería de destinos destacados
  const gallery = [
    { 
      id: "galapagos",
      src: "/images/galapagos.jpg", 
      alt: "Islas Galápagos - Tortugas gigantes en su hábitat natural",
      title: "Islas Galápagos"
    },
    { 
      id: "quito",
      src: "/images/quito.jpg", 
      alt: "Centro Histórico de Quito - Vista panorámica de la Basílica",
      title: "Quito Colonial"
    },
    { 
      id: "cuenca",
      src: "/images/cuenca.jpg", 
      alt: "Cuenca - Catedral Nueva al atardecer",
      title: "Cuenca Patrimonio"
    },
    { 
      id: "baños",
      src: "/images/banos.jpg", 
      alt: "Baños de Agua Santa - Cascada del Pailón del Diablo",
      title: "Baños Aventura"
    },
    { 
      id: "montanita",
      src: "/images/montanita.jpg", 
      alt: "Montañita - Playa al atardecer con surfistas",
      title: "Montañita Surf"
    },
    { 
      id: "amazonía",
      src: "/images/amazonia.jpg", 
      alt: "Amazonía ecuatoriana - Selva tropical y río Napo",
      title: "Amazonía"
    },
  ];

  // Los testimonios ahora se importan desde demo.ts

  return (
    <Readable>
      {/* Sección de bienvenida + videos (ya existente) */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-4xl font-bold">UN MUNDO SIN BARRERAS TE ESPERA</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          En Centro Turístico EC creemos que el turismo deben ser experiencias unicas.
          Explora playas, rutas y ciudades accesibles donde cada detalle está diseñado para tu comodidad y libertad para disfrutar
        </p>

        {/* Botones principales */}
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="/destinos"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Ver Destinos
          </a>
          <a
            href="/eventos"
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            Ver Eventos
          </a>
        </div>

        {/* Carrusel de video accesible */}
        <div className="max-w-4xl mx-auto mt-10">
          <video
            key={currentVideo}
            src={videos[currentVideo]}
            className="w-full rounded-xl border"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Video informativo de turismo accesible"
          />
        </div>
      </section>

      {/* NUEVAS SECCIONES DEBAJO DE LOS VIDEOS */}

      {/* 2️⃣ Servicios inclusivos */}
      <section aria-labelledby="servicios-inclusivos" className="max-w-6xl mx-auto px-4 mt-20">
        <h2 id="servicios-inclusivos" className="text-3xl font-bold text-center mb-8">
          Servicios inclusivos
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              className="p-6 rounded-2xl border shadow-sm bg-white text-center hover:shadow-lg transition"
              aria-labelledby={`svc-${s.title}`}
            >
              <div aria-hidden="true" className="text-5xl mb-3">{s.icon}</div>
              <h3 id={`svc-${s.title}`} className="font-semibold text-lg">{s.title}</h3>
              <p className="text-gray-600 mt-1">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3️⃣ Galería de experiencias */}
      <section aria-labelledby="galeria" className="max-w-6xl mx-auto px-4 mt-20">
        <h2 id="galeria" className="text-3xl font-bold text-center mb-8">
          Galería de experiencias
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img) => (
            <figure key={img.id} className="overflow-hidden rounded-2xl border bg-white hover:shadow-lg transition group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <figcaption className="p-3 bg-white">
                <h3 className="font-semibold text-lg text-blue-700">{img.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{img.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 4️⃣ Testimonios */}
      <section aria-labelledby="testimonios" className="max-w-5xl mx-auto px-4 mt-20 mb-16">
        <h2 id="testimonios" className="text-3xl font-bold text-center mb-8">
          Testimonios
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="border-l-4 border-blue-600 pl-5 pr-4 py-4 rounded-r-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg leading-relaxed italic text-gray-800">"{t.quote}"</p>
              <footer className="mt-3 text-sm text-gray-600">
                — <strong>{t.author}</strong>{t.role ? `, ${t.role}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </Readable>
  );
}
