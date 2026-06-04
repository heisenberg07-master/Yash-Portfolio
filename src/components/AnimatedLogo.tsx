import React from 'react';

export default function AnimatedLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary-50 to-violet-50 dark:from-dark-800 dark:to-dark-900 border border-primary-100 dark:border-dark-600 shadow-inner flex items-center justify-center group flex-shrink-0 ${className}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-violet-500/20 animate-pulse blur-xl" />
      
      <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-md z-10 pt-[15%] transition-transform duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hoodie */}
        <path d="M 25 85 C 25 45 75 45 75 85 Z" className="fill-primary-600 dark:fill-primary-500" />
        
        {/* Head */}
        <circle cx="50" cy="35" r="16" className="fill-orange-200 dark:fill-[#ffdbb5]" />
        
        {/* Hair */}
        <path d="M 34 35 C 34 15 66 15 66 35 C 70 25 30 25 34 35 Z" className="fill-dark-900 dark:fill-black" />
        
        {/* Glasses */}
        <rect x="39" y="30" width="9" height="6" rx="1.5" className="stroke-dark-900 stroke-[2px]" />
        <rect x="52" y="30" width="9" height="6" rx="1.5" className="stroke-dark-900 stroke-[2px]" />
        <line x1="48" y1="33" x2="52" y2="33" className="stroke-dark-900 stroke-[2px]" />
        
        {/* Laptop Base */}
        <path d="M 15 85 L 85 85 L 90 92 L 10 92 Z" className="fill-gray-300 dark:fill-gray-600" />
        
        {/* Laptop Screen */}
        <rect x="22" y="50" width="56" height="35" rx="3" className="fill-dark-800" />
        
        {/* Screen Glow */}
        <rect x="25" y="53" width="50" height="29" rx="1" className="fill-primary-500/20 animate-[pulse_2s_ease-in-out_infinite]" />
        
        {/* Code Lines on Screen */}
        <line x1="30" y1="60" x2="55" y2="60" className="stroke-green-400 stroke-[2.5px] opacity-80" />
        <line x1="30" y1="68" x2="65" y2="68" className="stroke-cyan-400 stroke-[2.5px] opacity-80" />
        <line x1="30" y1="76" x2="48" y2="76" className="stroke-pink-400 stroke-[2.5px] opacity-80" />

        {/* Typing Hands */}
        <path d="M 35 70 Q 42 85 48 88" strokeLinecap="round" className="stroke-primary-700 dark:stroke-primary-600 stroke-[5px] animate-[pulse_1s_ease-in-out_infinite]" />
        <path d="M 65 70 Q 58 85 52 88" strokeLinecap="round" className="stroke-primary-700 dark:stroke-primary-600 stroke-[5px] animate-[pulse_1.2s_ease-in-out_infinite]" />
      </svg>
    </div>
  );
}
