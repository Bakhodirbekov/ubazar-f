import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { categories, fuelTypes, transmissions, regions } from '@/data/mockCars';
import { cn } from '@/lib/utils';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

interface Filters {
  category: string;
  fuelType: string;
  transmission: string;
  region: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
}

const defaultFilters: Filters = {
  category: '',
  fuelType: '',
  transmission: '',
  region: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
};

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  if (!isOpen) return null;

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm fade-in">
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-card rounded-t-3xl shadow-xl slide-up overflow-hidden" style={{ top: 'inherit' }}>
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filterlar</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-4 space-y-5">
          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Kategoriya
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters(f => ({ ...f, category: f.category === cat ? '' : cat }))}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Yoqilg'i turi
            </label>
            <div className="flex flex-wrap gap-2">
              {fuelTypes.map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => setFilters(f => ({ ...f, fuelType: f.fuelType === fuel ? '' : fuel }))}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.fuelType === fuel
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {fuel}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Transmissiya
            </label>
            <div className="flex flex-wrap gap-2">
              {transmissions.map((trans) => (
                <button
                  key={trans}
                  onClick={() => setFilters(f => ({ ...f, transmission: f.transmission === trans ? '' : trans }))}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.transmission === trans
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {trans}
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Hudud
            </label>
            <div className="relative">
              <select
                value={filters.region}
                onChange={(e) => setFilters(f => ({ ...f, region: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl bg-muted text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Barcha hududlar</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Narx oralig'i (so'm)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters(f => ({ ...f, minPrice: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Yil oralig'i
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min yil"
                value={filters.minYear}
                onChange={(e) => setFilters(f => ({ ...f, minYear: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="number"
                placeholder="Max yil"
                value={filters.maxYear}
                onChange={(e) => setFilters(f => ({ ...f, maxYear: e.target.value }))}
                className="h-11 px-4 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 h-12 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
          >
            Tozalash
          </button>
          <button
            onClick={() => onApply(filters)}
            className="flex-1 h-12 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
          >
            Qo'llash
          </button>
        </div>
      </div>
    </div>
  );
}
