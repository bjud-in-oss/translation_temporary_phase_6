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
  const cropX = crop?.x || 50;
  const cropY = crop?.y || 50;
  const cropZoom = crop?.zoom || 1;

  let lineCoords = null;
  if (magnifier && containerSize.width > 0 && containerSize.height > 0) {
    lineCoords = getLineCoordinates(cropX, cropY, magnifier, containerSize.width, containerSize.height);
  }

  return (
    <div ref={containerRef} className="relative aspect-square bg-slate-900 w-full h-full overflow-hidden rounded-2xl">
      {/* Background Image (Cropped) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${block.imageId})`,
          backgroundPosition: `${cropX}% ${cropY}%`,
          backgroundSize: `${cropZoom * 100}%`,
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* SVG Line */}
      {lineCoords && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <line 
            x1={`${lineCoords.startX}%`} 
            y1={`${lineCoords.startY}%`} 
            x2={`${lineCoords.endX}%`} 
            y2={`${lineCoords.endY}%`} 
            stroke="#ef4444" 
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {/* Target Ring */}
      {magnifier && (
        <div 
          className="absolute border-2 border-red-500 rounded-full z-20 pointer-events-none"
          style={{
            left: `${cropX}%`,
            top: `${cropY}%`,
            width: `${magnifier.width / magnifier.zoom}%`,
            height: `${magnifier.height / magnifier.zoom}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
          }}
        />
      )}

      {/* Magnifier Glass */}
      {magnifier && (
        <div 
          className="absolute border-4 border-red-500 rounded-full bg-white shadow-2xl z-30 pointer-events-none"
          style={{
            left: `${magnifier.x}%`,
            top: `${magnifier.y}%`,
            width: `${magnifier.width}%`,
            height: `${magnifier.height}%`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${block.imageId})`,
            backgroundPosition: `${cropX}% ${cropY}%`,
            backgroundSize: `${cropZoom * magnifier.zoom * 100}%`,
            backgroundRepeat: 'no-repeat'
          }}
        />
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
