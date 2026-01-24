import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { FilterModal } from './FilterModal';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange?: (filters: any) => void;
}

export function SearchBar({ value, onChange, onFilterChange }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="flex gap-2 px-4 py-3 sticky top-0 bg-background z-40">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Mashina qidirish..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="w-11 h-11 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <FilterModal 
        isOpen={showFilters} 
        onClose={() => setShowFilters(false)}
        onApply={(filters) => {
          onFilterChange?.(filters);
          setShowFilters(false);
        }}
      />
    </>
  );
}
