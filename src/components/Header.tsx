export default function Header(){
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-yellow-300 px-3 py-1 rounded">
        Saltar al contenido principal
      </a>
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-6">
        <strong>Turismo Accesible</strong>
        <a href="#">Inicio</a>
        <a href="#">Destinos</a>
        <a href="#">Gastronomia</a>
        <a href="#">Eventos</a>
        <a href="#">Accesible</a>
      </nav>
    </header>
  );
}
