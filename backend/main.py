import os
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Galería Familiar API")

# Permitir solicitudes desde cualquier origen dentro de Codespaces
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Servir archivos de la carpeta uploads públicamente
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.post("/api/photos/upload")
async def upload_photo(file: UploadFile = File(...)):
    # Validar que el archivo subido sea una imagen
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo debe ser una imagen.")

    # Generar un nombre único para evitar sobreescribir archivos con el mismo nombre
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    return {
        "filename": filename,
        "url": f"/uploads/{filename}"
    }


@app.get("/api/photos")
def get_photos():
    files = os.listdir(UPLOAD_DIR)
    photos = [
        {"id": f, "url": f"/uploads/{f}"}
        for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif'))
    ]
    # Ordenar para mostrar las fotos recién subidas primero
    photos.sort(key=lambda x: os.path.getmtime(os.path.join(UPLOAD_DIR, x["id"])), reverse=True)
    return photos