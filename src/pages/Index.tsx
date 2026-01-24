import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryTabs } from '@/components/CategoryTabs';
import { CarCard } from '@/components/CarCard';
import { BottomNav } from '@/components/BottomNav';
import { AuthModal } from '@/components/AuthModal';
import ImageBanner from '@/components/ImageBanner';
import { useAuth } from '@/contexts/AuthContext';
import { carService } from '@/services/carService';
import { CategoryName, Car } from '@/types/car';

const Index = () => {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'Barchasi'>('Barchasi');
  const [filters, setFilters] = useState<any>({});
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        console.log('Fetching cars from API...');
        const response = await carService.getCars({
          search: searchQuery,
          min_price: filters.minPrice,
          max_price: filters.maxPrice,
          year: filters.minYear,
          fuel_type: filters.fuelType,
          transmission: filters.transmission,
        });
        
        console.log('API Response:', response);
        // Laravel paginate() returns { data: [...] }
        const carData = response.data || (Array.isArray(response) ? response : []);
        console.log('Parsed car data:', carData);
        setCars(carData);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchQuery, filters]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Category filter (if not already filtered by API)
      if (selectedCategory !== 'Barchasi' && car.category?.name !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [cars, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="safe-bottom">
        <div className="px-4 pt-4">
          <ImageBanner
            images={[
              '/images/bunner1.jpg',
              '/images/bunner2.jpg',
              '/images/bunner3.jpg'
            ]}
          />
        </div>

        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterChange={setFilters}
        />

        <CategoryTabs 
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Cars Grid */}
        <div className="px-4 pb-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Hech narsa topilmadi
              </h3>
              <p className="text-sm text-muted-foreground">
                Boshqa so'rov bilan qidirib ko'ring
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
};

export default Index;
