import React from 'react';

const SectionHeader = ({ 
  subtitle, 
  title,  
  className = "", 
  centered = true 
}) => {
  return (
    <div className={`mb-10 sm:mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <p className="text-orange-500 font-bold mb-3 sm:mb-4 text-lg sm:text-xl tracking-wider uppercase">
        {subtitle}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-gray-800 bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6">
        {title}
      </h2>
      <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full mb-4"></div>
      
    </div>
  );
};

export default SectionHeader;
