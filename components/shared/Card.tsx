
import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-[#2D2D39] rounded-2xl p-6 shadow-lg border border-gray-700/50 h-full flex flex-col ${className}`}>
      <div className="flex items-center mb-4">
        <span className="text-[#63b3ed]">{icon}</span>
        <h2 className="text-xl font-semibold text-[#EAE0D5] ml-3">{title}</h2>
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
