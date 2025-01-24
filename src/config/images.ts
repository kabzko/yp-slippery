import { OptimizedImage } from '../components/common/OptimizedImage';

// Define image sizes for different contexts
export const imageSizes = {
  thumbnail: 400,
  small: 800,
  medium: 1200,
  large: 1600,
  hero: 2000,
} as const;

// Define image quality presets
export const imageQualities = {
  low: 70,
  medium: 80,
  high: 90,
  lossless: 100,
} as const;

// Image optimization config
export const imageConfig = {
  defaultQuality: imageQualities.high,
  defaultFormat: 'webp',
  placeholderColor: '#ffffff',
  lazyLoadOffset: '100px',
} as const;

// Helper function to get optimized image URL with layout preservation
export const getOptimizedImageUrl = (
  src: string,
  width: number = imageSizes.large,
  quality: number = imageConfig.defaultQuality,
  preserveQuality: boolean = false
) => {
  const url = new URL(src, import.meta.url);
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', preserveQuality ? '100' : quality.toString());
  url.searchParams.set('format', 'webp');
  url.searchParams.set('fit', 'cover');
  return url.href;
};

// Background image specific optimization
export const getOptimizedBackgroundUrl = (src: string) => {
  return getOptimizedImageUrl(src, imageSizes.hero, imageQualities.high, true);
};
