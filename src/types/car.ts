export interface Car {
  id: number;
  user_id: number;
  category_id: number;
  subcategory_id?: number;
  title: string;
  description: string;
  price: number;
  price_visible: boolean;
  brand: string;
  model: string;
  year: number;
  color?: string;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  engine_size?: string;
  condition?: string;
  location?: string;
  contact_phone?: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  is_hot_deal: boolean;
  is_featured: boolean;
  posted_at?: string;
  timer_end_at?: string;
  timer_expired: boolean;
  created_at: string;
  images: Array<{
    id: number;
    image_path: string;
    image_url: string;
    is_primary: boolean;
  }>;
  category?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
    phone?: string;
  };
  remaining_time?: number;
}

export interface User {
  id: number;
  name: string;
  phone?: string;
  email: string;
  address?: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'user';
}

export type CategoryName = 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Electric' | 'Truck';
