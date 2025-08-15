import React from 'react';
import Header from './Header';
import FaithHub from './FaithHub';
import EnergyTracker from './EnergyTracker';
import AiDuaCompanion from './AiDuaCompanion';
import GrowthMindset from './GrowthMindset';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1E1E2A] text-[#F5F5F5] p-4 sm:p-6 lg:p-8 animate-fade-in-slow">
       <style>{`
          @keyframes fadeInSlow {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-slow {
            animation: fadeInSlow 1s ease-out forwards;
          }
        `}</style>
      <Header />
      <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div className="lg:col-span-2">
            <AiDuaCompanion />
        </div>
        <div className="lg:col-span-1">
           <FaithHub />
        </div>

        {/* Row 2 */}
        <div className="lg:col-span-2">
           <EnergyTracker />
        </div>
         <div className="lg:col-span-1">
           <GrowthMindset />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
