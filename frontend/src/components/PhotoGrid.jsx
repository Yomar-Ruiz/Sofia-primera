export function PhotoGrid({ photos }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-inner border border-pink-100 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -top-10 -left-10 text-9xl opacity-5 text-pink-200 pointer-events-none">💕</div>
        <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 text-pink-200 pointer-events-none">🌸</div>
        
        <div className="relative z-10 flex flex-col items-center">
            <span className="text-8xl mb-6">🏜️</span>
            <h3 className="text-2xl font-bold text-pink-950 mb-2">¡Oh, el álbum está vacío!</h3>
            <p className="text-pink-400 max-w-sm">
                Parece que aún no hemos capturado momentos mágicos de Sofía. 
                ¡Usa el botón de arriba para empezar la colección!
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
      {photos.map((photo, index) => {
        const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-3'];
        const randomRotation = rotations[index % rotations.length];

        return (
          <div 
            key={photo.id || index} 
            className={`group relative transition-all duration-500 ease-out transform ${randomRotation} hover:rotate-0 hover:scale-105 hover:z-30`}
          >
            {/* EFECTO POLAROID */}
            <div className="bg-white p-3 pb-12 shadow-xl rounded-sm border border-slate-100 group-hover:shadow-pink-100 group-hover:shadow-2xl transition-shadow duration-500">
              
              {/* Contenedor de imagen seguro con relación de aspecto cuadrada de Polaroid */}
              <div className="aspect-square w-full overflow-hidden bg-slate-50 rounded-sm">
                <img
                  src={photo.url}
                  alt="Momento especial de Sofía"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Brillo decorativo al hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none"></div>

              {/* Espacio inferior de la polaroid */}
              <div className="absolute bottom-3 left-0 w-full text-center px-4">
                  <div className="h-0.5 w-8 bg-pink-100 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}