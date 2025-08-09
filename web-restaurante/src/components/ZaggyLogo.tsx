import React from 'react';

interface ZaggyLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'symbol' | 'text';
  color?: 'default' | 'white' | 'dark';
  className?: string;
}

const ZaggyLogo: React.FC<ZaggyLogoProps> = ({ 
  size = 'medium', 
  variant = 'full', 
  color = 'default',
  className = ''
}) => {
  const getLogoSize = () => {
    switch (size) {
      case 'small': return 'text-lg h-6';
      case 'large': return 'text-3xl h-10';
      default: return 'text-xl h-8';
    }
  };

  const getLogoColor = () => {
    switch (color) {
      case 'white': return 'text-white';
      case 'dark': return 'text-gray-900';
      default: return 'text-zaggy-orange';
    }
  };

  const logoClasses = `${getLogoSize()} ${getLogoColor()} ${className}`;

  if (variant === 'symbol') {
    return (
      <div className={`flex items-center ${logoClasses}`}>
        <span className="font-black tracking-tight">Z</span>
        <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-t-transparent border-b-transparent border-l-current ml-1"></div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span className={`font-bold tracking-tight ${logoClasses}`}>
        Zaggy
      </span>
    );
  }

  return (
    <div className={`flex items-center ${logoClasses}`}>
      <span className="font-black tracking-tight">Z</span>
      <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-t-transparent border-b-transparent border-l-current ml-1"></div>
      <span className="font-bold tracking-tight">aggy</span>
    </div>
  );
};

export default ZaggyLogo;