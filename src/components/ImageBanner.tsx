import React, { useEffect, useState } from "react";
import { bannerService, Banner } from "@/services/bannerService";

interface ImageBannerProps {
  interval?: number; // auto-slide interval in ms (default 5000)
}

export default function ImageBanner({
  interval = 5000,
}: ImageBannerProps) {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await bannerService.getBanners();
      setBanners(data);
      setLoading(false);
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(timer);
  }, [banners.length, interval]);

  if (loading || banners.length === 0) return null;

  const currentBanner = banners[current];

  return (
    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-card cursor-pointer" onClick={() => currentBanner.link && window.open(currentBanner.link)}>
      {/* Image Stack */}
      {banners.map((banner, index) => (
        <img
          key={banner.id}
          src={banner.image_url}
          alt={banner.title || "Banner"}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">
          {currentBanner.title || "Bizning Hamkorlar"}
        </h2>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 items-center pointer-events-none">
        {banners.map((_, i) => (
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

