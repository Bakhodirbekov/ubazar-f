import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { CarCard } from '@/components/CarCard';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { favoriteService } from '@/services/favoriteService';
import { Car } from '@/types/car';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { showAuthModal, setShowAuthModal, isAuthenticated } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const data = await favoriteService.getFavorites();
        setCars(data.data || []);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="safe-bottom px-4 py-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Saralangan mashinalar
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Yoqtirgan mashinalaringizni saqlang va keyinroq oson toping
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Kirish
            </button>
          </div>
        </main>

        <BottomNav />
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="safe-bottom px-4 py-4">
        <h1 className="text-xl font-bold text-foreground mb-4">
          Saralangan
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Hozircha bo'sh
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Yoqtirgan mashinalaringizga ❤️ bosing va ular bu yerda paydo bo'ladi
            </p>
          </div>
        )}
      </main>

      <BottomNav />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
