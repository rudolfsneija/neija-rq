import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SimpleGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

export function SimpleGallery({ images, className = '' }: SimpleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Define navigation functions with useCallback to prevent unnecessary recreations
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);
  
  // Handle keyboard navigation when expanded
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isExpanded) return;
      
      switch (e.key) {
        case 'Escape':
          setIsExpanded(false);
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling when expanded
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isExpanded, goToPrevious, goToNext]); // Added missing dependencies
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not the image
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };
  
  if (images.length === 0) {
    return null;
  }

  // We only have one image, just show it without navigation
  if (images.length === 1) {
    return (
      <>
        <div className={`${className} cursor-pointer`} onClick={toggleExpand}>
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Expanded view overlay */}
        {isExpanded && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" 
            onClick={handleBackdropClick}
          >
            <div className="relative max-h-[90vh] max-w-[90vw]">
              <button 
                className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white hover:bg-black focus:outline-none z-10"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <img 
                src={images[0].src} 
                alt={images[0].alt} 
                className="max-h-[90vh] max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  // Multiple images - show navigation
  return (
    <>
      <div className={`relative ${className}`}>
        <div 
          className="h-full w-full overflow-hidden cursor-pointer" 
          onClick={toggleExpand}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="h-full w-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
        </div>
        
        {/* Navigation buttons - only show for multiple images */}
        <button
          onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Expanded view overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" 
          onClick={handleBackdropClick}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button 
              className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white hover:bg-black focus:outline-none z-10"
              onClick={() => setIsExpanded(false)}
            >
              <X className="h-6 w-6" />
            </button>
            
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className="max-h-[90vh] max-w-full object-contain"
            />
            
            {/* Navigation buttons for expanded view */}
            <div className="absolute inset-0 flex items-center justify-between">
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="ml-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="mr-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
            
            {/* Image counter for expanded view */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-black/50 px-3 py-1 text-sm text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}