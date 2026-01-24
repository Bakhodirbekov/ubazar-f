import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { CarCard } from '@/components/CarCard';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { carService } from '@/services/carService';
import { Car } from '@/types/car';
import { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';

export default function HotDeals() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await carService.getCars({ hot_deals: true });
        const carData = response.data || (Array.isArray(response) ? response : []);
        setCars(carData);
      } catch (error) {
        console.error('Failed to fetch hot deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotDeals();
  }, []);

  const hotDeals = cars.filter(car => car.is_hot_deal);
  const urgentDeals = cars.filter(car => !car.is_hot_deal && car.remaining_time && car.remaining_time < 4 * 3600);


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="safe-bottom px-4 py-4 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-5 text-accent-foreground">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-6 h-6" />
            <h1 className="text-xl font-bold">Tez Sotish</h1>
          </div>
          <p className="text-sm opacity-90">
            Eng arzon narxlar va taymeri kam qolgan mashinalar
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        ) : (
          <>
            {/* Hot Deals Section */}
            {hotDeals.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🔥</span>
                  <h2 className="font-semibold text-foreground">Hot Deals</h2>
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {hotDeals.length} ta
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {hotDeals.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            )}

            {/* Urgent Deals Section */}
            {urgentDeals.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold text-foreground">Tez tugaydi</h2>
                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {urgentDeals.length} ta
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {urgentDeals.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            )}

            {hotDeals.length === 0 && urgentDeals.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Hozircha hot deal yo'q
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tez orada yangi takliflar paydo bo'ladi
                </p>
              </div>
            )}
          </>
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
