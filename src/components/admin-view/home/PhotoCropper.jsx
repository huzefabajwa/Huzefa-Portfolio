"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, X, Loader2, Image as ImageIcon, ZoomIn, ZoomOut, RotateCw, RotateCcw, Crop } from "lucide-react";

// Helper to center the initial crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

// Draw the cropped area to a canvas and return a Blob
async function getCroppedImg(image, crop, rotation = 0) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  
  // Calculate bounding box of the rotated image
  const rad = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  const bBoxWidth = image.naturalWidth * cos + image.naturalHeight * sin;
  const bBoxHeight = image.naturalWidth * sin + image.naturalHeight * cos;

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate to center, rotate, translate back
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rad);
  ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);

  // Draw the full image
  ctx.drawImage(image, 0, 0);

  // Now create the final cropped canvas
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) return null;

  croppedCanvas.width = crop.width;
  croppedCanvas.height = crop.height;

  croppedCtx.drawImage(
    canvas,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    croppedCanvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
  });
}

export default function PhotoCropper({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const fileInputRef = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [aspect, setAspect] = useState(1); // Default to 1:1 (Square)
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const imgRef = useRef(null);

  // Handle Drag & Drop / Selection
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Reset crop
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
        setIsModalOpen(true);
        // Reset transform values
        setScale(1);
        setRotation(0);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files[0]) {
      const fakeEvent = { target: { files: [e.dataTransfer.files[0]] } };
      onSelectFile(fakeEvent);
    }
  }, []);

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
    imgRef.current = e.currentTarget;
  }

  function handleAspectClick(newAspect) {
    setAspect(newAspect);
    if (imgRef.current && newAspect) {
      setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, newAspect));
    }
  }

  async function handleApplyCrop() {
    if (!imgRef.current || !crop) return;
    setUploading(true);
    setError("");

    try {
      const blob = await getCroppedImg(imgRef.current, crop, rotation);
      if (!blob) throw new Error("Failed to crop image");

      const fd = new FormData();
      fd.append("file", blob, "profile_cropped.jpg");

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (data.success) {
        onChange(data.url);
        setIsModalOpen(false);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      setError("Cropping/Upload failed — check your connection");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5" style={{ color: "#8DA0BC" }}>
        <ImageIcon size={11} /> Profile Photo
      </label>

      {/* Main Dropzone / Preview */}
      {!value ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          className="flex flex-col items-center justify-center gap-3 rounded-xl transition-all hover:bg-white/5"
          style={{
            height: 160,
            border: `2px dashed ${drag ? "#00A1E0" : "rgba(255,255,255,0.1)"}`,
            background: drag ? "rgba(0,161,224,0.05)" : "rgba(255,255,255,0.02)",
            cursor: "pointer",
          }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "rgba(0,161,224,0.12)", border: "1px solid rgba(0,161,224,0.3)" }}>
            <Upload size={20} style={{ color: "#00A1E0" }} />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold" style={{ color: "#8DA0BC" }}>Click or drag & drop your photo</p>
            <p className="text-[10px] mt-0.5" style={{ color: "#3D5170" }}>JPG, PNG, WebP — max 10 MB</p>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden group" style={{ border: "1px solid rgba(0,161,224,0.3)", aspectRatio: "1/1", maxWidth: 200, background: "#050D1A" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="profile preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(5,13,26,0.75)" }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-500/30 transition-colors"
              style={{ background: "rgba(0,161,224,0.2)", border: "1px solid rgba(0,161,224,0.4)", color: "#00A1E0" }}
            >
              <Upload size={12} /> Replace
            </button>
            <button
              onClick={() => onChange("")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-500/30 transition-colors"
              style={{ background: "rgba(255,80,80,0.15)", border: "1px solid rgba(255,80,80,0.3)", color: "#FF6B6B" }}
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onSelectFile} />

      {error && (
        <p className="text-xs px-3 py-2 rounded-lg" style={{ color: "#FF6B6B", background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)" }}>
          ⚠ {error}
        </p>
      )}
      <p className="text-xs" style={{ color: "#3D5170" }}>This photo appears in the hero section of your portfolio. Crop exactly as you want it.</p>

      {/* Full Screen Cropper Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10">
          <div className="bg-[#0b1426] border border-white/10 rounded-2xl p-6 w-full max-w-4xl max-h-full overflow-y-auto shadow-2xl flex flex-col md:flex-row gap-8">
            
            {/* Left: Image Crop Area */}
            <div className="flex-1 flex flex-col items-center justify-center bg-black/50 rounded-xl overflow-hidden min-h-[300px] md:min-h-[500px]">
              {!!imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  aspect={aspect}
                  circularCrop={aspect === 1} // Makes crop UI circular if 1:1
                  className="max-h-[500px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    onLoad={onImageLoad}
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease",
                      maxHeight: "500px",
                    }}
                  />
                </ReactCrop>
              )}
            </div>

            {/* Right: Controls Area */}
            <div className="w-full md:w-72 flex flex-col gap-6 py-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Crop size={18} className="text-blue-400" />
                  Adjust Photo
                </h3>
                <p className="text-xs text-slate-400 mt-1">Drag handles to crop, use tools below to fine-tune.</p>
              </div>

              {/* Aspect Ratio Presets */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleAspectClick(1)} className={`py-2 rounded-lg text-xs font-semibold border transition-all ${aspect === 1 ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
                    1:1 Square
                  </button>
                  <button onClick={() => handleAspectClick(3/4)} className={`py-2 rounded-lg text-xs font-semibold border transition-all ${aspect === 3/4 ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
                    3:4 Portrait
                  </button>
                  <button onClick={() => handleAspectClick(4/3)} className={`py-2 rounded-lg text-xs font-semibold border transition-all ${aspect === 4/3 ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
                    4:3 Landscape
                  </button>
                  <button onClick={() => handleAspectClick(undefined)} className={`py-2 rounded-lg text-xs font-semibold border transition-all ${aspect === undefined ? 'bg-blue-500/20 border-blue-400 text-blue-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}>
                    Free
                  </button>
                </div>
              </div>

              {/* Zoom */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                  <span>Zoom</span>
                  <span className="text-blue-400">{scale.toFixed(1)}x</span>
                </label>
                <div className="flex items-center gap-3">
                  <ZoomOut size={16} className="text-slate-400" />
                  <input
                    type="range"
                    min="0.5" max="3" step="0.1"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-full appearance-none"
                  />
                  <ZoomIn size={16} className="text-slate-400" />
                </div>
              </div>

              {/* Rotation */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                  <span>Rotation</span>
                  <span className="text-blue-400">{rotation}°</span>
                </label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setRotation(r => r - 90)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors" title="Rotate Left 90°">
                    <RotateCcw size={16} />
                  </button>
                  <input
                    type="range"
                    min="-180" max="180" step="1"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-full appearance-none"
                  />
                  <button onClick={() => setRotation(r => r + 90)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors" title="Rotate Right 90°">
                    <RotateCw size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-6 flex gap-3">
                <button
                  onClick={() => { setIsModalOpen(false); setImgSrc(""); setCrop(undefined); }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyCrop}
                  disabled={uploading}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : "Apply & Save"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
