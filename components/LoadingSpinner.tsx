
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
       <div className="w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin"></div>
       <h2 className="text-2xl font-semibold text-white tracking-wide">Crafting Your Talk...</h2>
       <p className="text-gray-400 max-w-md">
        Our AI is analyzing the topic, structuring the narrative, and adding that signature TED-style flair. This may take a moment.
       </p>
    </div>
  );
};

export default LoadingSpinner;
