export const PLACEHOLDER_IMAGE = {
  CARD: 'https://via.placeholder.com/300x200?text=No+Image',
  CARD_ERROR: 'https://via.placeholder.com/300x200?text=Image+Not+Available',
  DETAIL: 'https://via.placeholder.com/600x400?text=No+Image',
  DETAIL_ERROR: 'https://via.placeholder.com/600x400?text=Image+Not+Available',
};

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
const IMAGE_DOMAINS = ['googleusercontent.com', 'googleapis.com'];
const IMAGE_KEYWORDS = ['image', 'img'];

export const isValidImageUrl = (url: string): boolean => {
  if (!url.trim()) return false;
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const isImageUrl = (url: string): boolean => {
  if (!url.trim()) return false;
  
  const lowerUrl = url.toLowerCase();
  
  return (
    IMAGE_EXTENSIONS.some(ext => lowerUrl.includes(ext)) ||
    IMAGE_KEYWORDS.some(keyword => lowerUrl.includes(keyword)) ||
    IMAGE_DOMAINS.some(domain => lowerUrl.includes(domain))
  );
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
): void => {
  const target = e.target as HTMLImageElement;
  target.src = fallbackUrl;
};

export const validateAndLoadImage = (
  url: string,
  onSuccess: (url: string) => void,
  onError: (error: string) => void
): (() => void) => {
  if (!url.trim()) {
    onError('');
    return () => {};
  }

  if (!isValidImageUrl(url)) {
    onError('Please enter a valid URL (e.g.: https://example.com/image.jpg)');
    return () => {};
  }

  const img = new Image();
  let cancelled = false;

  img.onload = () => {
    if (!cancelled) {
      onSuccess(url);
    }
  };

  img.onerror = () => {
    if (!cancelled) {
      if (!isImageUrl(url)) {
        onError('URL may not point to an image or the image is unavailable. Check the URL or try another link.');
      } else {
        onError('Failed to load image. Check the URL or try another link.');
      }
    }
  };

  img.src = url;

  return () => {
    cancelled = true;
  };
};

