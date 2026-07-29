// =========================================================================
// File: src/components/OptimizedFrameImage.tsx
// Description: Enterprise-grade image optimization in Pure React
// =========================================================================
import React from 'react';

interface Props {
  readonly altName: string;
  readonly baseImageName: string; // example: "rayban-aviator"
}

export const OptimizedFrameImage = ({ altName, baseImageName }: Props) => {
  return (
    <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-lg">
      
      {/* 
        We use <picture> to support AVIF first if the patient's browser is modern,
        otherwise we fall back to WebP as a safe alternative plan!
      */}
      <picture>
        <source 
          type="image/avif" 
          srcSet={`/assets/${baseImageName}-400w.avif 400w, /assets/${baseImageName}-800w.avif 800w`} 
        />
        <source 
          type="image/webp" 
          srcSet={`/assets/${baseImageName}-400w.webp 400w, /assets/${baseImageName}-800w.webp 800w`} 
        />
        
        {/* The core tag that gathers the magic rules */}
        <img
          // The old default image (for fossilized browsers)
          src={`/assets/${baseImageName}-800w.jpg`}
          
          alt={altName}
          
          // 1. Protect the screen from earthquakes (CLS Prevention)
          width="800"
          height="600"
          
          // 2. Lazy loading (don't load it unless it gets close to the screen)
          loading="lazy"
          
          // 3. Help the processor decode the image in the background without freezing the UI
          decoding="async"
          
          // Give the browser a clue about the expected image size on screen so it chooses the right resolution
          sizes="(max-width: 600px) 400px, 800px"
          
          className="w-full h-auto object-cover transition-opacity duration-500 hover:scale-105"
        />
      </picture>
      
    </div>
  );
};