import { cn } from '@/lib/utils';
import { CategoryName } from '@/types/car';

interface CategoryTabsProps {
  selected: CategoryName | 'Barchasi';
  onChange: (category: CategoryName | 'Barchasi') => void;
}

const allCategories: (CategoryName | 'Barchasi')[] = [
  'Barchasi',
  'Sedan',
  'SUV',
  'Hatchback',
  'Coupe',
  'Electric',
  'Truck',
];

const categoryIcons: Record<CategoryName | 'Barchasi', string> = {
  Barchasi: '🚗',
  Sedan: '🚙',
  SUV: '🚐',
  Hatchback: '🚕',
  Coupe: '🏎️',
  Electric: '⚡',
  Truck: '🚛',
};

export function CategoryTabs({ selected, onChange }: CategoryTabsProps) {
  return (
    <div className="px-4 pb-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar rounded-2xl bg-muted/40 p-2">
        {allCategories.map((category) => {
          const isActive = selected === category;

          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg scale-[1.03]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <span className="text-base">{categoryIcons[category]}</span>
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
