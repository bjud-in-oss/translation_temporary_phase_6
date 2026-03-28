import React, { useRef, useEffect, useState } from 'react';
import { StoryBlock } from '../../types/Onboarding';
import { getLineCoordinates } from '../../utils/magnifierMath';

interface Props {
  block: StoryBlock;
}

const MagnifierViewer: React.FC<Props> = ({ block }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      // Debounce or just use requestAnimationFrame for smooth updates
      window.requestAnimationFrame(() => {
        if (!entries[0]) return;
        const { width, height } = entries[0].contentRect;
        setContainerSize({ width, height });
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (block.type !== 'image' || !block.imageId) return null;

  const { crop, magnifier } = block;

  // Kom ihåg att använda magnifier.targetX/Y för lineCoords istället för crop.x/y!
  const lineCoords = crop && magnifier && containerSize.width > 0
    ? getLineCoordinates(magnifier.targetX, magnifier.targetY, magnifier, containerSize.width, containerSize.height)
    : null;

  return (
    <div ref={containerRef} className="relative aspect-square w-full bg-slate-900 overflow-hidden rounded-2xl" style={{ containerType: 'inline-size' }}>
      
      {/* Bakgrundsbild */}
      {block.imageId && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${block.imageId})`,
            backgroundPosition: `${crop?.x || 50}% ${crop?.y || 50}%`,
            backgroundSize: `${(crop?.zoom || 1) * 100}% auto`,
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* SVG Linje (Koden är densamma, men använder lineCoords) */}
      {lineCoords && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <line x1={`${lineCoords.startX}%`} y1={`${lineCoords.startY}%`} x2={`${lineCoords.endX}%`} y2={`${lineCoords.endY}%`} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      )}

      {crop && magnifier && (
        <>
          {/* Måltavla (Target Ring) */}
          <div 
            className="absolute border-2 border-red-500 rounded-full z-20 pointer-events-none"
            style={{
              left: `${magnifier.targetX}%`,
              top: `${magnifier.targetY}%`,
              width: `${magnifier.width / magnifier.zoom}%`,
              height: `${magnifier.height / magnifier.zoom}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
            }}
          />

          {/* Förstoringsglas med Invers-Procent Trick */}
          <div 
            className="absolute border-4 border-red-500 rounded-full bg-slate-900 shadow-2xl z-30 pointer-events-none overflow-hidden"
            style={{
              left: `${magnifier.x}%`,
              top: `${magnifier.y}%`,
              width: `${magnifier.width}%`,
              height: `${magnifier.height}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                // 1. Återskapa huvudcontainerns exakta storlek i pixlar, oavsett glasets form
                width: `${(100 / (magnifier.width || 1)) * 100}%`,
                height: `${(100 / (magnifier.height || 1)) * 100}%`,
                // 2. Förskjut klonen så att targetX/Y hamnar exakt i mitten av glaset
                left: `${50 - (magnifier.targetX / (magnifier.width || 1)) * 100}%`,
                top: `${50 - (magnifier.targetY / (magnifier.height || 1)) * 100}%`,
                // 3. Zooma klonen utifrån den nya målpunkten
                transformOrigin: `${magnifier.targetX}% ${magnifier.targetY}%`,
                transform: `scale(${magnifier.zoom})`,
                // 4. Måla ut bakgrundsbilden exakt som i huvudvyn
                backgroundImage: `url(${block.imageId})`,
                backgroundPosition: `${crop.x}% ${crop.y}%`,
                backgroundSize: `${crop.zoom * 100}% auto`,
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
        </>
      )}

      {/* Text Overlay */}
      {block.textOverlay && (
        <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-xl text-center z-40 ${
          block.textOverlay.theme === 'light' ? 'bg-white/90 text-black' : 'bg-black/60 backdrop-blur-sm text-white'
        }`}>
          {block.textOverlay.text}
        </div>
      )}
    </div>
  );
};

export default MagnifierViewer;
