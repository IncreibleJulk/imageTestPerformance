'use client';

import { useEffect, useState } from 'react';

interface ImageItem {
  id: string;
  author: string;
  download_url: string;
}

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API real con imágenes de alta resolución
    fetch('https://picsum.photos/v2/list?page=1&limit=5')
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🚫 Versión lenta (sin optimización)</h1>

      <section style={{ margin: '2rem 0' }}>
        <h2>🖼️ Imágenes desde API externa (alta resolución)</h2>
        {loading ? (
          <p>Cargando imágenes...</p>
        ) : (
          images.map((img) => (
            <div key={img.id} style={{ marginBottom: '2rem' }}>
              <p>{img.author}</p>
              <img
                src={img.download_url}
                alt={`By ${img.author}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
}
