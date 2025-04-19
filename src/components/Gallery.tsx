// src/components/Gallery.tsx
import React, { useEffect, useState, useRef } from 'react';

const GALLERY_API = 'https://dawsoncommunitysports.onrender.com';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${GALLERY_API}/images`);
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to load images', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await fetch(`${GALLERY_API}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      await fetchImages();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-12 mb-12 text-center">
      <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-4">📸 Event Gallery</h2>
      <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
        Celebrate your subdivision’s moments! Upload your favorite photos and see them in the slideshow below.
      </p>

      <form
        onSubmit={handleUpload}
        className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="border border-gray-300 px-4 py-2 rounded shadow-sm text-sm dark:bg-gray-700 dark:text-white w-64"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {images.length > 0 ? (
        <div className="relative w-full h-[28rem] max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 transition">
          <img
            src={`${GALLERY_API}/uploads/${images[currentIdx]}`}
            alt={`Slide ${currentIdx + 1}`}
            className="object-contain w-full h-full transition duration-700 ease-in-out"
          />
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No images uploaded yet. Be the first to share a moment!</p>
      )}
    </div>
  );
};

export default Gallery;
