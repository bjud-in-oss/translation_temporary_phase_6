import React, { useState } from 'react';
import { StorySlide } from '../../src/types/Onboarding';

const mockGuide: StorySlide[] = [
  {
    id: 'slide-1',
    layout: '1-col',
    blocks: [
      {
        id: 'block-1',
        type: 'text',
        textContent: 'Välkommen till BYOK'
      }
    ]
  },
  {
    id: 'slide-2',
    layout: '2-col',
    blocks: [
      {
        id: 'block-2',
        type: 'image',
        imageId: 'https://picsum.photos/seed/byok1/800/800',
        textOverlay: { text: 'Steg 1: Skapa konto', theme: 'dark' }
      },
      {
        id: 'block-3',
        type: 'image',
        imageId: 'https://picsum.photos/seed/byok2/800/800'
      }
    ]
  }
];

const ByokWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const slides = mockGuide;
  const currentSlide = slides[currentStep];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col z-50">
      {/* Top: Progress bars */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex gap-2">
        {slides.map((slide, index) => (
          <div key={slide.id} className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                index <= currentStep ? 'bg-white w-full' : 'bg-transparent w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Middle: Grid */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 z-10">
        <div className={`w-full max-w-5xl grid gap-4 ${
          currentSlide.layout === '2-col' ? 'md:grid-cols-2' : 
          currentSlide.layout === '3-col' ? 'md:grid-cols-3' : 
          'grid-cols-1'
        } grid-cols-1`}>
          {currentSlide.blocks.map(block => (
            <div key={block.id} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center">
              {block.type === 'image' && block.imageId && (
                <img src={block.imageId} alt="" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
              )}
              {block.type === 'text' && (
                <div className="p-8 text-center text-2xl font-bold">
                  {block.textContent}
                </div>
              )}
              {block.textOverlay && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-xl text-white text-center">
                  {block.textOverlay.text}
                </div>
              )}
              {/* <MagnifierViewer /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Zones */}
      <div 
        className="absolute inset-y-0 left-0 w-1/4 z-30 cursor-pointer group flex items-center pl-4"
        onClick={handlePrev}
      >
        {currentStep > 0 && (
          <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        )}
      </div>
      <div 
        className="absolute inset-y-0 right-0 w-1/4 z-30 cursor-pointer group flex items-center justify-end pr-4"
        onClick={handleNext}
      >
        {currentStep < slides.length - 1 && (
          <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ByokWizard;
