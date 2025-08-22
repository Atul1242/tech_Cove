export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  image: string;
  occupancy: number;
  hours: string;
  totalSeats: number;
  availableSeats: number;
  pricePerDay: number;
  amenities: string[];
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  noiseLevel: 'quiet' | 'moderate' | 'busy';
  rating: number;
  reviewCount: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  popular?: boolean;
  type: 'day' | 'monthly' | 'premium';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  locationId: string;
  image: string;
  capacity: number;
  registered: number;
  price: number;
  category: string;
  instructor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membershipType: 'day' | 'monthly' | 'premium' | null;
  membershipExpiry?: string;
  joinedAt: string;
  isAdmin: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  locationId: string;
  date: string;
  timeSlot: string;
  seatNumber?: string;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  amount: number;
  checkInTime?: string;
  checkOutTime?: string;
  qrCode: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'joinedAt' | 'isAdmin'>) => Promise<void>;
  isLoading: boolean;
}
