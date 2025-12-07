import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: '3/4' | '16/9' | 'square';
}

export default function ImageCarousel({ images, aspectRatio = '3/4' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const aspectClass = {
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-video',
    'square': 'aspect-square',
  }[aspectRatio];

  return (
    <div className="relative group">
      <div className={`${aspectClass} bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden flex items-center justify-center`}>
        <div className="text-center p-6">
          <Icon name="Image" size={48} className="mx-auto mb-3 text-purple-400" />
          <p className="text-sm text-muted-foreground">Место для изображения {currentIndex + 1}/{images.length}</p>
        </div>
      </div>
      
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur"
            onClick={prev}
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur"
            onClick={next}
          >
            <Icon name="ChevronRight" size={24} />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-purple-500 w-6' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}