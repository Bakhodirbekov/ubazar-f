import React, { useEffect, useState } from "react";
import { bannerService, Banner } from "@/services/bannerService";

interface ImageBannerProps {
  images?: string[]; // Local images fallback
  interval?: number; // auto-slide interval in ms (default 5000)
}

export default function ImageBanner({
  images = [],
  interval = 5000,
}: ImageBannerProps) {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [useLocalImages, setUseLocalImages] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await bannerService.getBanners();
        if (data && data.length > 0) {
          setBanners(data);
          setUseLocalImages(false);
        } else if (images.length > 0) {
          // Fallback to local images
          setUseLocalImages(true);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
        if (images.length > 0) {
          setUseLocalImages(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [images]);

  useEffect(() => {
    const totalSlides = useLocalImages ? images.length : banners.length;
    if (totalSlides === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, interval);

    return () => clearInterval(timer);
  }, [useLocalImages ? images.length : banners.length, interval]);

  if (loading) return null;
  
  const totalSlides = useLocalImages ? images.length : banners.length;
  if (totalSlides === 0) return null;

  return (
    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-card cursor-pointer" onClick={() => {
      if (!useLocalImages && banners[current]?.link) {
        window.open(banners[current].link, '_blank');
      }
    }}>
      {/* Image Stack */}
      {useLocalImages ? (
        images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Banner ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))
      ) : (
        banners.map((banner, index) => (
          <img
            key={banner.id}
            src={banner.image_url}
            alt={banner.title || "Banner"}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))
      )}

      {/* Text Overlay - only show for API banners with title */}
      {!useLocalImages && banners[current]?.title && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">
            {banners[current].title}
          </h2>
        </div>
      )}

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 items-center pointer-events-none">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-3 h-3 bg-white shadow-md"
                : "w-2 h-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

