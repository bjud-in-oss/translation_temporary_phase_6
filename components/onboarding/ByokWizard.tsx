import React, { useState } from 'react';
import { StorySlide } from '../../types/Onboarding';
import MagnifierViewer from './MagnifierViewer';
import { SYSTEM_GUIDE } from '../../data/StoryGuideData';
import { auth } from '../../firebase';
import { signInAnonymously } from 'firebase/auth';
import { createOrganization } from '../../services/byokService';
import { useAppStore } from '../../stores/useAppStore';
import QRCode from 'react-qr-code';

const ByokWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const slides = SYSTEM_GUIDE.slides;
  const currentSlide = slides[currentStep];

  const [selectedSfu, setSelectedSfu] = useState<'livekit' | 'daily' | 'cloudflare' | null>(null);
  const [geminiKey, setGeminiKey] = useState('');
  const [sfuKey1, setSfuKey1] = useState('');
  const [sfuKey2, setSfuKey2] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const { setUserRole } = useAppStore();

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

  const handleSave = async () => {
    if (!selectedSfu || !geminiKey || !sfuKey1) {
      setError('Fyll i alla obligatoriska fält.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      await signInAnonymously(auth);

      const code = await createOrganization(
        'Min Församling',
        selectedSfu || 'cloudflare',
        {
          geminiKey,
          sfuKey1,
          sfuKey2,
        }
      );
      setInviteCode(code);
      setIsSaved(true);
      setUserRole('admin');
      
      setCurrentStep(slides.length - 1);
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || 'Ett fel uppstod vid sparandet.');
    } finally {
      setIsSaving(false);
    }
  };

  const isInteractiveSlide = currentSlide.blocks.some(b => b.type === 'sfu-choice' || b.type === 'keys-input' || b.type === 'outro');
  const hasKeysInput = currentSlide.blocks.some(b => b.type === 'keys-input');
  const hasOutro = currentSlide.blocks.some(b => b.type === 'outro');

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
              {block.type === 'image' && block.imageId ? (
                <MagnifierViewer block={block} />
              ) : block.type === 'text' ? (
                <div className="p-8 text-center text-2xl font-bold">
                  {block.textContent}
                </div>
              ) : block.type === 'sfu-choice' ? (
                <div className="p-8 flex flex-col items-center justify-center space-y-6 w-full h-full">
                  <h2 className="text-3xl font-bold mb-4">Välj SFU Leverantör</h2>
                  <button 
                    onClick={() => setSelectedSfu('livekit')}
                    className={`w-full max-w-md p-6 rounded-xl border-2 transition-all ${selectedSfu === 'livekit' ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600 hover:border-slate-400'}`}
                  >
                    <div className="text-2xl font-bold">LiveKit</div>
                    <div className="text-slate-400">Bäst för produktion</div>
                  </button>
                  <button 
                    onClick={() => setSelectedSfu('daily')}
                    className={`w-full max-w-md p-6 rounded-xl border-2 transition-all ${selectedSfu === 'daily' ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600 hover:border-slate-400'}`}
                  >
                    <div className="text-2xl font-bold">Daily.co</div>
                    <div className="text-slate-400">Enkelt att komma igång</div>
                  </button>
                  <button 
                    onClick={() => setSelectedSfu('cloudflare')}
                    className={`w-full max-w-md p-6 rounded-xl border-2 transition-all ${selectedSfu === 'cloudflare' ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600 hover:border-slate-400'}`}
                  >
                    <div className="text-2xl font-bold">Cloudflare Calls</div>
                    <div className="text-slate-400">Serverless & skalbart</div>
                  </button>
                </div>
              ) : block.type === 'keys-input' ? (
                <div className="p-8 flex flex-col items-center justify-center space-y-6 w-full h-full">
                  <h2 className="text-3xl font-bold mb-4">Ange dina nycklar</h2>
                  
                  <div className="w-full max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Gemini API Key</label>
                      <input 
                        type="password" 
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        placeholder="AIzaSy..."
                      />
                    </div>

                    {selectedSfu === 'livekit' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">LiveKit API Key</label>
                          <input 
                            type="text" 
                            value={sfuKey1}
                            onChange={(e) => setSfuKey1(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">LiveKit API Secret</label>
                          <input 
                            type="password" 
                            value={sfuKey2}
                            onChange={(e) => setSfuKey2(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}

                    {selectedSfu === 'daily' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Daily API Key</label>
                        <input 
                          type="password" 
                          value={sfuKey1}
                          onChange={(e) => setSfuKey1(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    )}

                    {selectedSfu === 'cloudflare' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Cloudflare App ID</label>
                          <input 
                            type="text" 
                            value={sfuKey1}
                            onChange={(e) => setSfuKey1(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Cloudflare App Secret</label>
                          <input 
                            type="password" 
                            value={sfuKey2}
                            onChange={(e) => setSfuKey2(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}

                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {isSaving ? 'Sparar...' : 'Spara Nycklar'}
                    </button>
                  </div>
                </div>
              ) : block.type === 'outro' ? (
                <div className="p-8 flex flex-col items-center justify-center space-y-8 w-full h-full">
                  <h2 className="text-4xl font-bold text-green-400">Allt är klart!</h2>
                  <p className="text-xl text-center text-slate-300">
                    Din församling är nu uppsatt och redo för AI-tolkning.
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl">
                    <QRCode value={`${window.location.origin}/?invite=${inviteCode}`} size={200} />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-slate-400 mb-2">Din inbjudningskod:</p>
                    <div className="text-3xl font-mono font-bold tracking-widest bg-slate-900 px-6 py-3 rounded-lg">
                      {inviteCode}
                    </div>
                  </div>

                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors"
                  >
                    Gå till rummet
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Zones */}
      {!isInteractiveSlide && (
        <>
          <div 
            className="absolute inset-y-0 left-0 w-1/6 z-40 cursor-pointer group flex items-center pl-4"
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
            className="absolute inset-y-0 right-0 w-1/6 z-40 cursor-pointer group flex items-center justify-end pr-4"
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
        </>
      )}

      {/* Fallback navigation for interactive slides */}
      {isInteractiveSlide && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 z-50 pointer-events-none">
          {currentStep > 0 && !hasOutro ? (
            <button 
              onClick={handlePrev}
              className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Föregående
            </button>
          ) : <div />}
          
          {currentStep < slides.length - 1 && !hasKeysInput && !hasOutro ? (
            <button 
              onClick={handleNext}
              className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Nästa
            </button>
          ) : <div />}
        </div>
      )}
    </div>
  );
};

export default ByokWizard;
