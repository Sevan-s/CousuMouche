import { useEffect, useState } from "react";

type Props = {
  images: string[];
  interval?: number;
  className?: string;
};

export default function CustomCarousel({ images, interval = 5000, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const n = images.length;

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % n), interval);
    return () => clearInterval(id);
  }, [n, interval]);

  const go = (i: number) => setIdx((i + n) % n);

  return (
    <div className={`relative h-full ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="h-full w-full relative">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          ))}
        </div>
        {n > 1 && (
          <>
            <button
              onClick={() => go(idx - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-black/30 hover:bg-black/40 text-white"
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              onClick={() => go(idx + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-black/30 hover:bg-black/40 text-white"
              aria-label="Suivant"
            >
              ›
            </button>
          </>
        )}
        {n > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${
                  i === idx ? "bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}