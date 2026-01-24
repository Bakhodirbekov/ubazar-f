import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Phone, MessageCircle, MapPin, Calendar, Gauge, Fuel, Settings, Palette, CheckCircle, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ImageModal } from '@/components/ImageModal';
import { useCountdown } from '@/hooks/useCountdown';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { carService } from '@/services/carService';
import { favoriteService } from '@/services/favoriteService';
import { Car } from '@/types/car';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        const data = await carService.getCar(Number(id));
        setCar(data);
      } catch (error) {
        console.error('Failed to fetch car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isAuthenticated || !id) return;
      try {
        const response = await favoriteService.checkFavorite(Number(id));
        setIsFavorite(response.is_favorite);
      } catch (error) {
        console.error('Failed to check favorite:', error);
      }
    };
    checkFavorite();
  }, [id, isAuthenticated]);

  const { isExpired } = useCountdown(car?.timer_end_at);
  const canViewPrice = car?.price_visible || isExpired;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Mashina topilmadi</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (favoriteLoading || !id) return;
    setFavoriteLoading(true);
    
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(Number(id));
        toast({ description: 'Sevimlilardan o\'chirildi' });
      } else {
        await favoriteService.addFavorite(Number(id));
        toast({ description: 'Sevimlilarga qo\'shildi ❤️' });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast({ 
        description: 'Xatolik yuz berdi', 
        variant: 'destructive' 
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${car?.brand} ${car?.model}`,
      text: `${car?.brand} ${car?.model} - ${car?.year} yil`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({ description: 'Havola nusxalandi!' });
      }
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (!isExpired && !car?.price_visible) {
      return;
    }
    // Use contact_phone if available, otherwise fallback to user phone
    const phoneNumber = car?.contact_phone || car?.user?.phone || '+998901234567';
    window.location.href = `tel:${phoneNumber}`;
  };

  const allImageUrls = car.images?.map(img => img.image_url) || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImageUrls.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImageUrls.length) % allImageUrls.length);
  };

  const specs = [
    { icon: Calendar, label: 'Yil', value: car.year },
    { icon: Gauge, label: 'Masofa', value: car.mileage && car.mileage !== null ? `${car.mileage.toLocaleString()} km` : 'Noma\'lum' },
    { icon: Fuel, label: 'Yoqilg\'i', value: car.fuel_type || 'Noma\'lum' },
    { icon: Settings, label: 'Transmissiya', value: car.transmission || 'Noma\'lum' },
    { icon: Palette, label: 'Holati', value: car.condition || 'Noma\'lum' },
    { icon: MapPin, label: 'Manzil', value: car.location || 'Sergeli' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        images={allImageUrls}
        currentIndex={currentImage}
        onClose={() => setIsModalOpen(false)}
        onImageChange={setCurrentImage}
      />

      {/* Image Gallery */}
      <div className="relative group bg-card">
        <div 
          className="aspect-[16/9] md:aspect-[21/9] bg-muted cursor-pointer relative overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={allImageUrls[currentImage] || '/placeholder-car.png'}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Image Navigation Arrows */}
          {allImageUrls.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails Strip */}
        {allImageUrls.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar bg-card border-b">
            {allImageUrls.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={cn(
                  'flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all',
                  idx === currentImage 
                    ? 'border-accent ring-2 ring-accent/20' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Navigation Overlays */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center pointer-events-auto shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleFavorite}
              disabled={favoriteLoading}
              className={cn(
                'w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all shadow-sm',
                isFavorite ? 'bg-accent text-accent-foreground' : 'bg-card/90',
                favoriteLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Badges Over Image */}
        <div className="absolute bottom-16 left-4 flex flex-col gap-2 pointer-events-none">
          {!isExpired && (
            <CountdownTimer timerEndAt={car.timer_end_at} />
          )}
          {car.is_hot_deal && (
            <div className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-sm font-bold w-fit shadow-lg">
              🔥 Hot Deal
            </div>
          )}
        </div>

        {/* Image Counter Badge */}
        {allImageUrls.length > 1 && (
          <div className="absolute bottom-16 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 font-medium">
            <span className="text-accent">{currentImage + 1}</span> / {allImageUrls.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-4">
        {/* Title & Price */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {car.brand} {car.model}
              </h1>
              <p className="text-sm text-muted-foreground">{car.year} yil</p>
            </div>
            <span className={cn(
              'px-3 py-1 rounded-lg text-xs font-semibold',
              car.condition === 'Yangi' 
                ? 'bg-success/10 text-success' 
                : 'bg-muted text-muted-foreground'
            )}>
              {car.condition}
            </span>
          </div>

          {/* Price */}
          {canViewPrice ? (
            <p className="text-2xl font-bold text-accent">
              {formatPrice(car.price)}
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold blur-price text-muted-foreground">
                {formatPrice(car.price)}
              </p>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Taymer tugashi kutilmoqda</span>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {car.location || 'Sergeli'}
          </div>
        </div>

        {/* Specs */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Texnik ma'lumotlar</h2>
          <div className="grid grid-cols-2 gap-4">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engine */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-semibold text-foreground mb-3">Dvigatel</h2>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-sm text-foreground">
              {car.fuel_type 
                ? `${car.fuel_type.charAt(0).toUpperCase() + car.fuel_type.slice(1)} Dvigatel`
                : 'Noma\'lum Dvigatel'
              }
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h2 className="font-semibold text-foreground mb-3">Tavsif</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {car.description}
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4">
        <div className="flex gap-3">
          <button
            onClick={handleContact}
            disabled={!canViewPrice && !car.price_visible}
            className={cn(
              'flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all',
              canViewPrice || car.price_visible
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <Phone className="w-4 h-4" />
            {canViewPrice || car.price_visible ? 'Qo\'ng\'iroq qilish' : 'Taymer tugashini kuting'}
          </button>
          <button
            onClick={handleContact}
            disabled={!canViewPrice && !car.price_visible}
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
              canViewPrice || car.price_visible
                ? 'bg-success text-primary-foreground'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
