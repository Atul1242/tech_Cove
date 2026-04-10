import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  locationName: string;
  locationId: string;
  seatId: string;
  seatNumber: string;
  seatType: string;
  floor: number;
  zone: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  amenities: string[];
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  amount: number;
  checkInDeadline: string;
  checkedInAt?: string;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  cancelBooking: (id: string) => void;
  checkIn: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = 'studycove_bookings';

// Seed with a couple of demo bookings so MyBookings isn't empty on first load
const seedBookings: Booking[] = [
  {
    id: 'demo-001',
    locationName: 'Delhi Central',
    locationId: 'delhi-central',
    seatId: 'seat-004',
    seatNumber: 'A1-04',
    seatType: 'Window Seat',
    floor: 1,
    zone: 'Zone A',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '14:00',
    duration: 240,
    amenities: ['Power Outlet', 'WiFi', 'Window View'],
    status: 'upcoming',
    amount: 280,
    checkInDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-002',
    locationName: 'Delhi Central',
    locationId: 'delhi-central',
    seatId: 'seat-009',
    seatNumber: 'Q2-01',
    seatType: 'Quiet Zone',
    floor: 2,
    zone: 'Quiet Zone',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '13:00',
    duration: 240,
    amenities: ['Power Outlet', 'WiFi', 'Silent Environment'],
    status: 'completed',
    amount: 260,
    checkInDeadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    checkedInAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return seedBookings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (data: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...data,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)
    );
  };

  const checkIn = (id: string) => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'active', checkedInAt: new Date().toISOString() } : b)
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, checkIn }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
};
