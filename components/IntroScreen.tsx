import React from 'react';

interface IntroScreenProps {
  onGenerate: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onGenerate }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                Your Gaming <span className="text-red-600">Superpowers</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-2">A TED-Style Talk Generator</p>
        </div>
      <p className="max-w-2xl text-gray-400 mb-8 text-base md:text-lg">
        Discover the hidden skills you're learning from video games. Generate a compelling 5-minute talk that proves gaming is more than just a game. Click below to unlock your script!
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