
import React, { useState } from 'react';
import type { SlideDeck } from '../types';

interface SlidesDisplayProps {
  slideDeck: SlideDeck;
  onReset: () => void;
}

const SlidesDisplay: React.FC<SlidesDisplayProps> = ({ slideDeck, onReset }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = slideDeck.slides;
  const currentSlide = slides[currentSlideIndex];

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const progressPercentage = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div className="animate-fade-in w-full flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{slideDeck.title}</h1>
      </header>
      
      <div className="bg-gray-900/80 p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-800 flex-grow flex flex-col min-h-[500px]">
        {/* Slide Content */}
        <div className="flex-grow">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6">{currentSlide.title}</h2>
            <ul className="space-y-4">
                {currentSlide.content.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-4 text-2xl mt-1">▸</span>
                        <p className="text-gray-200 text-xl md:text-2xl">{item}</p>
                    </li>
                ))}
            </ul>
        </div>

        {/* Speaker Note */}
        <div className="mt-8 p-4 bg-red-900/30 border-t-2 border-red-500/50 rounded-b-lg">
            <h3 className="text-lg font-bold text-red-400 mb-2">🎤 Speaker Note</h3>
            <p className="text-gray-300 italic">{currentSlide.speakerNote}</p>
        </div>
      </div>
      
      {/* Navigation and Progress */}
      <div className="mt-6">
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="flex justify-between items-center">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className="px-6 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
              aria-label="Previous Slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Prev
            </button>
            <span className="text-gray-400 font-medium">{currentSlideIndex + 1} / {slides.length}</span>
            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 disabled:bg-red-800 disabled:text-red-400/50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
              aria-label="Next Slide"
            >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
        <div className="text-center mt-8">
            <button
            onClick={onReset}
            className="px-6 py-2 bg-transparent border border-gray-600 text-gray-400 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-colors"
            >
            Start Over
            </button>
        </div>
      </div>
    </div>
  );
};

export default SlidesDisplay;
