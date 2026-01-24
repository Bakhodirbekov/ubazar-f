import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onImageChange: (index: number) => void;
}

export function ImageModal({ 
  isOpen, 
  images, 
  currentIndex, 
  onClose, 
  onImageChange 
}: ImageModalProps) {
  const [localIndex, setLocalIndex] = useState(currentIndex);

  useEffect(() => {
    setLocalIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, localIndex, onClose]);

  const handlePrevious = () => {
    const newIndex = localIndex === 0 ? images.length - 1 : localIndex - 1;
    setLocalIndex(newIndex);
    onImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = localIndex === images.length - 1 ? 0 : localIndex + 1;
    setLocalIndex(newIndex);
    onImageChange(newIndex);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        type="button"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[localIndex] || '/placeholder-car.png'}
          alt={`Car image ${localIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />

        {/* Image Counter */}
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium">
          {localIndex + 1} / {images.length}
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[55] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            type="button"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[55] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            type="button"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[55] flex gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl max-w-[90vw] overflow-x-auto no-scrollbar border border-white/10">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setLocalIndex(idx);
                onImageChange(idx);
              }}
              className={cn(
                'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300',
                idx === localIndex 
                  ? 'border-accent scale-110 shadow-lg' 
                  : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
              )}
              type="button"
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
