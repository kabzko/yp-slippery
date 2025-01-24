import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = ({ src, alt, className, width, height }: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  const generateSrcSet = () => {
    const sizes = [400, 800, 1200, 1600];
    const imageUrl = new URL(src, import.meta.url);
    
    return sizes
      .map(size => {
        imageUrl.searchParams.set('w', size.toString());
        return `${imageUrl.href} ${size}w`;
      })
      .join(', ');
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
      width={width}
      height={height}
      loading="lazy"
      srcSet={generateSrcSet()}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};
