import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyBackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
}

const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({
  src,
  className = '',
  children
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <LazyLoadImage
        src={src}
        effect="blur"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        afterLoad={() => setIsLoaded(true)}
        wrapperClassName="absolute inset-0"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default LazyBackgroundImage;
