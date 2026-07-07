"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center p-8 overflow-hidden">
        {images.length > 0 ? (
          <img
            key={active}
            src={images[active]}
            alt={name}
            className="w-full h-full object-contain animate-[fadeIn_0.25s_ease]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <ImageOff className="w-10 h-10" strokeWidth={1.2} />
            <span className="text-sm">Rasm mavjud emas</span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-20 h-20 shrink-0 rounded-2xl border-2 bg-gray-50 p-1.5 transition-all duration-200 ${
                active === i
                  ? "border-black"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-contain rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
