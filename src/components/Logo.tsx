import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showText = false, size = "md" }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizes[size]} relative flex items-center justify-center`}>
        {/* Outer Circle */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 bg-brand-teal shadow-inner" />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <span className={`font-black leading-none ${size === 'lg' ? 'text-2xl mb-1' : size === 'md' ? 'text-sm mb-0.5' : 'text-[10px]'}`}>
            MY
          </span>
          {/* Mountain Peaks */}
          <svg 
            viewBox="0 0 24 12" 
            className={`${size === 'lg' ? 'w-12' : size === 'md' ? 'w-8' : 'w-5'} fill-white`}
          >
            <path d="M0 12 L6 4 L12 10 L18 2 L24 12 Z" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <span className={`font-bold text-brand-dark tracking-tight ${textSizes[size]}`}>
          My Mountain Mover
        </span>
      )}
    </div>
  );
}
