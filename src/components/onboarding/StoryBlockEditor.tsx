import React, { useState } from 'react';
import { StoryBlock } from '../../types/Onboarding';
import MagnifierViewer from './MagnifierViewer';

const StoryBlockEditor: React.FC = () => {
  const [block, setBlock] = useState<StoryBlock>({
    id: 'test',
    type: 'image',
    imageId: 'https://picsum.photos/seed/editor/800/450',
    crop: { x: 50, y: 50, zoom: 1 },
    magnifier: { x: 75, y: 50, width: 30, height: 30, zoom: 2, targetX: 50, targetY: 50 },
    textOverlay: { text: 'Test text', theme: 'dark', x: 10, y: 70, width: 80, fontSize: 100 }
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(block, null, 2));
    alert('Kopierat till urklipp!');
  };

  const updateCrop = (key: keyof NonNullable<StoryBlock['crop']>, value: number) => {
    setBlock(prev => ({
      ...prev,
      crop: { ...prev.crop!, [key]: value }
    }));
  };

  const updateMagnifier = (key: keyof NonNullable<StoryBlock['magnifier']>, value: number) => {
    setBlock(prev => ({
      ...prev,
      magnifier: { ...prev.magnifier!, [key]: value }
    }));
  };

  const updateText = (text: string) => {
    setBlock(prev => ({
      ...prev,
      textOverlay: { ...prev.textOverlay!, text }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col md:flex-row gap-8">
      {/* Vänster: Live Preview */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4 text-slate-300">Live Preview (1:1 Aspect Ratio)</h2>
        <div className="w-full max-w-md">
          <MagnifierViewer block={block} />
        </div>
      </div>

      {/* Höger: Reglage */}
      <div className="flex-1 bg-slate-900 p-6 rounded-2xl border border-slate-800 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">StoryBlock Editor</h2>

        {/* Sektion A: Crop / Bakgrund */}
        <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">A. Crop / Bakgrund (Point of Interest)</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>X Position (%)</span>
                <span className="text-slate-400">{block.crop?.x}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.crop?.x}
                onChange={(e) => updateCrop('x', Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Y Position (%)</span>
                <span className="text-slate-400">{block.crop?.y}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.crop?.y}
                onChange={(e) => updateCrop('y', Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Zoom (1x - 5x)</span>
                <span className="text-slate-400">{block.crop?.zoom}x</span>
              </div>
              <input 
                type="range" min="1" max="5" step="0.1" value={block.crop?.zoom}
                onChange={(e) => updateCrop('zoom', Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Sektion B: Magnifier / Glaset */}
        <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-orange-400">B. Magnifier / Glaset</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Målpunkt X (%)</span>
                <span className="text-slate-400">{block.magnifier?.targetX}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.magnifier?.targetX}
                onChange={(e) => updateMagnifier('targetX', Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Målpunkt Y (%)</span>
                <span className="text-slate-400">{block.magnifier?.targetY}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.magnifier?.targetY}
                onChange={(e) => updateMagnifier('targetY', Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Position X (%)</span>
                <span className="text-slate-400">{block.magnifier?.x}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.magnifier?.x}
                onChange={(e) => updateMagnifier('x', Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Position Y (%)</span>
                <span className="text-slate-400">{block.magnifier?.y}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.magnifier?.y}
                onChange={(e) => updateMagnifier('y', Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Bredd (%)</span>
                  <span className="text-slate-400">{block.magnifier?.width}%</span>
                </div>
                <input 
                  type="range" min="10" max="50" value={block.magnifier?.width}
                  onChange={(e) => updateMagnifier('width', Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Höjd (%)</span>
                  <span className="text-slate-400">{block.magnifier?.height}%</span>
                </div>
                <input 
                  type="range" min="10" max="50" value={block.magnifier?.height}
                  onChange={(e) => updateMagnifier('height', Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Inre Zoom (1x - 5x)</span>
                <span className="text-slate-400">{block.magnifier?.zoom}x</span>
              </div>
              <input 
                type="range" min="1" max="5" step="0.1" value={block.magnifier?.zoom}
                onChange={(e) => updateMagnifier('zoom', Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Sektion C: Text */}
        <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-indigo-400">C. Text Overlay</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-slate-300">Textinnehåll</label>
              <input 
                type="text" 
                value={block.textOverlay?.text || ''}
                onChange={(e) => updateText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Position X (%)</span>
                <span className="text-slate-400">{block.textOverlay?.x || 10}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.textOverlay?.x || 10}
                onChange={(e) => setBlock(prev => ({ ...prev, textOverlay: { ...prev.textOverlay!, x: Number(e.target.value) } }))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Position Y (%)</span>
                <span className="text-slate-400">{block.textOverlay?.y || 70}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.textOverlay?.y || 70}
                onChange={(e) => setBlock(prev => ({ ...prev, textOverlay: { ...prev.textOverlay!, y: Number(e.target.value) } }))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Bredd (%)</span>
                <span className="text-slate-400">{block.textOverlay?.width || 80}%</span>
              </div>
              <input 
                type="range" min="10" max="100" value={block.textOverlay?.width || 80}
                onChange={(e) => setBlock(prev => ({ ...prev, textOverlay: { ...prev.textOverlay!, width: Number(e.target.value) } }))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Höjd (%) (0 = auto)</span>
                <span className="text-slate-400">{block.textOverlay?.height || 0}%</span>
              </div>
              <input 
                type="range" min="0" max="100" value={block.textOverlay?.height || 0}
                onChange={(e) => setBlock(prev => ({ ...prev, textOverlay: { ...prev.textOverlay!, height: Number(e.target.value) } }))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Textstorlek (%)</span>
                <span className="text-slate-400">{block.textOverlay?.fontSize || 100}%</span>
              </div>
              <input 
                type="range" min="50" max="200" value={block.textOverlay?.fontSize || 100}
                onChange={(e) => setBlock(prev => ({ ...prev, textOverlay: { ...prev.textOverlay!, fontSize: Number(e.target.value) } }))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Export */}
        <button 
          onClick={handleCopy}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        >
          Kopiera Block JSON
        </button>
      </div>
    </div>
  );
};

export default StoryBlockEditor;
