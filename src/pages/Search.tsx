import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { BottomNav } from '@/components/BottomNav';
import { CarCard } from '@/components/CarCard';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { carService } from '@/services/carService';
import { Car } from '@/types/car';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await carService.getCars({
          search: searchQuery,
          min_price: filters.minPrice,
          max_price: filters.maxPrice,
          year: filters.minYear,
          fuel_type: filters.fuelType,
          transmission: filters.transmission,
        });
        
        const carData = response.data || (Array.isArray(response) ? response : []);
        setCars(carData);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters]);

  const hasActiveFilters = Object.values(filters).some(v => v);


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="safe-bottom">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterChange={setFilters}
        />

        <div className="px-4 pb-4">
          {/* Search Status */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Qidirilmoqda...' : `${cars.length} ta natija`}
              {hasActiveFilters && ' (filtrlangan)'}
            </p>
          </div>

          {/* Results */}
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
                <SearchIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Hech narsa topilmadi
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Boshqa so'rov yoki filterlar bilan qidirib ko'ring
              </p>
            </div>
          )}
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
