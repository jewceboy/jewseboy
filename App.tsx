
import React, { useState, useCallback } from 'react';
import { generatePresentationSlides } from './services/geminiService';
import type { SlideDeck } from './types';
import IntroScreen from './components/IntroScreen';
import LoadingSpinner from './components/LoadingSpinner';
import SlidesDisplay from './components/SlidesDisplay';

type AppState = 'initial' | 'loading' | 'success' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('initial');
  const [slideDeck, setSlideDeck] = useState<SlideDeck | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setAppState('loading');
    setError(null);
    setSlideDeck(null);
    try {
      const slides = await generatePresentationSlides();
      setSlideDeck(slides);
      setAppState('success');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }, []);

  const handleReset = () => {
    setAppState('initial');
    setSlideDeck(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <LoadingSpinner />;
      case 'success':
        return slideDeck && <SlidesDisplay slideDeck={slideDeck} onReset={handleReset} />;
      case 'error':
        return (
          <div className="text-center text-white p-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Generation Failed</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case 'initial':
      default:
        return <IntroScreen onGenerate={handleGenerate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center justify-center p-4 selection:bg-red-500 selection:text-white">
      <main className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
