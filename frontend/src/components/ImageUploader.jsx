import { useState } from 'react';

const API_BASE_URL = "https://sofia-primera.onrender.com/";

export function ImageUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/photos/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onUploadSuccess();
        e.target.value = ""; // Limpia el input para permitir volver a subir el mismo archivo si se desea
      } else {
        alert('Vaya, parece que ese archivo no es una foto válida.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema de conexión para subir la foto.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-pink-200 rounded-2xl bg-pink-50 hover:border-pink-300 transition-colors duration-300">
      
      {/* Icono decorativo grande */}
      <div className="text-6xl mb-4 opacity-80">📸</div>

      <label className={`cursor-pointer group relative px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 ease-out 
        ${uploading 
          ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white hover:from-pink-600 hover:to-fuchsia-700 hover:shadow-pink-200 hover:-translate-y-0.5'
        }`}>
        
        {/* Efecto de brillo al hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
        
        <span className="relative flex items-center gap-2">
          {uploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subiendo magia...
            </>
          ) : (
            '✨ Subir nuevo recuerdo'
          )}
        </span>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      
      <p className="text-sm text-pink-400 mt-4 font-medium bg-white px-4 py-1 rounded-full shadow-inner border border-pink-100">
        Formatos dulces: JPG, PNG, WEBP ✨
      </p>
    </div>
  );
}
