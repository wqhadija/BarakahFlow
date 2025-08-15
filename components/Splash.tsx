
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1E1E2A] text-[#F5F5F5] animate-fade-in">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 10px #c9ada7, 0 0 20px #c9ada7, 0 0 30px #c9ada7; }
            50% { text-shadow: 0 0 20px #c9ada7, 0 0 30px #c9ada7, 0 0 40px #c9ada7; }
          }
          .animate-fade-in {
            animation: fadeIn 2s ease-in-out forwards;
          }
          .animate-glow {
            animation: glow 4s ease-in-out infinite;
          }
        `}
      </style>
      <h1 className="text-5xl font-serif italic animate-glow text-[#EAE0D5]">
        Bismillah
      </h1>
    </div>
  );
};

export default Splash;
