import { useEffect, useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PhotoGrid } from './components/PhotoGrid';

const API_BASE_URL = "https://bug-free-cod-5g64gvrpvxj9hxv-8000.app.github.dev";

export default function App() {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/photos`);
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      
      const data = await res.json();
      
      // Validación de seguridad para evitar pantallas en blanco si data no es un Array
      if (Array.isArray(data)) {
        const fullUrlPhotos = data.map(photo => ({
          ...photo,
          url: `${API_BASE_URL}${photo.url}`
        }));
        setPhotos(fullUrlPhotos);
      } else {
        console.error("La API no devolvió un array válido:", data);
        setPhotos([]);
      }
    } catch (err) {
      console.error('Error al cargar las fotos:', err);
      setPhotos([]);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen">
      {/* HEADER REDISEÑADO */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-pink-100 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <span className="absolute top-0 left-1/4 text-amber-400 animate-pulse text-2xl">✨</span>
          <span className="absolute bottom-2 right-1/4 text-amber-300 text-xl">🌟</span>
          
          <p className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-1">La galería mágica de</p>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-pink-600 drop-shadow-[0_2px_2px_rgba(236,72,153,0.3)]">
            Sofía
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mt-3 rounded-full"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-pink-100/50 rounded-3xl -rotate-1 scale-105"></div>
          <div className="relative bg-white p-2 rounded-3xl shadow-xl border border-pink-50">
            <ImageUploader onUploadSuccess={fetchPhotos} />
          </div>
        </div>

        <PhotoGrid photos={photos} />
      </main>
      
      <footer className="py-10 text-center text-pink-300 text-sm font-sofia">
        Hecho con ❤️ para Sofía
      </footer>
    </div>
  );
}