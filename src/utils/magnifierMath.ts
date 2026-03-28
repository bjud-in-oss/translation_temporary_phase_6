import { MagnifierSettings } from '../types/Onboarding';

export const getLineCoordinates = (targetX: number, targetY: number, mag: MagnifierSettings, containerWidth: number, containerHeight: number) => {
  if (containerWidth === 0 || containerHeight === 0) return null;
  
  const aspectRatio = containerWidth / containerHeight;
  const dx = mag.x - targetX;
  const dy = (mag.y - targetY) * aspectRatio;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist === 0) return null; // Säkerhetsspärr
  
  const ux = dx / dist;
  const uy = dy / dist;
  
  const targetRx = (mag.width / mag.zoom) / 2;
  const targetRy = ((mag.height / mag.zoom) * aspectRatio) / 2;
  const r1 = 1 / Math.sqrt(Math.pow(ux / targetRx, 2) + Math.pow(uy / targetRy, 2));
  const startX = targetX + (r1 * ux);
  const startY = targetY + ((r1 * uy) / aspectRatio);
  
  const magRx = mag.width / 2;
  const magRy = (mag.height / 2) * aspectRatio;
  const r2 = 1 / Math.sqrt(Math.pow(ux / magRx, 2) + Math.pow(uy / magRy, 2));
  const endX = mag.x - (r2 * ux);
  const endY = mag.y - ((r2 * uy) / aspectRatio);
  
  return { startX, startY, endX, endY };
};
