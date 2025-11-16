
import React from 'react';

interface IntroScreenProps {
  onGenerate: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onGenerate }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                <span className="text-red-600">TED</span>-Style Talk
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-2">Generator</p>
        </div>
      <p className="max-w-2xl text-gray-400 mb-8 text-base md:text-lg">
        Create a compelling 5-minute presentation on the pros and cons of social media for teenagers. Click the button below to generate your script instantly.
      </p>
      <button
        onClick={onGenerate}
        className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 transform hover:scale-105"
      >
        Generate My Talk
      </button>
    </div>
  );
};

export default IntroScreen;
