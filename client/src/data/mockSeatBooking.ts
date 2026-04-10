// Mock data for Space Allocation & Booking Engine

export interface Seat {
  id: string;
  seatNumber: string;
  type: 'standard' | 'standing' | 'pod' | 'collaborative' | 'window' | 'quiet';
  floor: number;
  zone: string;
  amenities: string[];
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  currentBooking?: CurrentBooking;
  hourlyRate: number;
  maxCapacity: number;
  hasMonitor: boolean;
  hasPowerOutlet: boolean;
  isQuietZone: boolean;
  isWindowSeat: boolean;
  isStandingDesk: boolean;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface CurrentBooking {
  id: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  checkedIn: boolean;
}

export interface BookingSlot {
  id: string;
  seatId: string;
  seatNumber: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: 'available' | 'booked' | 'held';
  price: number;
}

export interface UserBooking {
  id: string;
  seatId: string;
  seatNumber: string;
  seatType: string;
  locationName: string;
  floor: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  amenities: string[];
  status: 'confirmed' | 'pending' | 'checked-in' | 'completed' | 'cancelled' | 'no-show';
  checkInDeadline: string;
  checkedInAt?: string;
  price: number;
  createdAt: string;
}

export interface FloorPlan {
  floor: number;
  name: string;
  width: number;
  height: number;
  zones: Zone[];
  entrances: { x: number; y: number }[];
  facilities: Facility[];
}

export interface Zone {
  id: string;
  name: string;
  type: 'quiet' | 'collaborative' | 'mixed';
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'restroom' | 'cafe' | 'printer' | 'meeting_room' | 'phone_booth' | 'water' | 'exit';
  coordinates: {
    x: number;
    y: number;
  };
  icon: string;
}

// Amenity options for filtering
export const amenityOptions = [
  { id: 'monitor', label: 'Dual Monitors', icon: 'fa-desktop' },
  { id: 'power', label: 'Power Outlet', icon: 'fa-plug' },
  { id: 'quiet', label: 'Quiet Zone', icon: 'fa-volume-mute' },
  { id: 'window', label: 'Window Seat', icon: 'fa-sun' },
  { id: 'standing', label: 'Standing Desk', icon: 'fa-arrows-alt-v' },
  { id: 'collaborative', label: 'Collaborative Space', icon: 'fa-users' }
];

// Seat type options
export const seatTypes = [
  { id: 'standard', label: 'Standard Desk', icon: 'fa-chair', description: 'Classic workspace with essential amenities' },
  { id: 'standing', label: 'Standing Desk', icon: 'fa-arrows-alt-v', description: 'Height-adjustable desk for active working' },
  { id: 'pod', label: 'Deep Work Pod', icon: 'fa-cube', description: 'Enclosed private space for focused work' },
  { id: 'collaborative', label: 'Discussion Room', icon: 'fa-users', description: 'Open space for team collaboration' },
  { id: 'window', label: 'Window Seat', icon: 'fa-sun', description: 'Natural light with scenic views' },
  { id: 'quiet', label: 'Quiet Zone', icon: 'fa-volume-mute', description: 'Silent area for deep concentration' }
];

// Time slot options for micro-booking
export const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00'
];

// Duration options for micro-booking (in minutes)
export const durationOptions = [
  { value: 45, label: '45 minutes', description: 'Quick session' },
  { value: 60, label: '1 hour', description: 'Standard session' },
  { value: 90, label: '1.5 hours', description: 'Extended session' },
  { value: 120, label: '2 hours', description: 'Half-day session' },
  { value: 180, label: '3 hours', description: 'Deep work session' },
  { value: 240, label: '4 hours', description: 'Full half-day' },
  { value: 360, label: '6 hours', description: 'Extended work day' },
  { value: 480, label: '8 hours', description: 'Full day' }
];

// Mock Seats Data
export const mockSeats: Seat[] = [
  // Floor 1 - Standard & Standing Desks
  {
    id: 'seat-001',
    seatNumber: 'A1-01',
    type: 'standard',
    floor: 1,
    zone: 'Zone A',
    amenities: ['Power Outlet', 'WiFi'],
    status: 'available',
    hourlyRate: 50,
    maxCapacity: 1,
    hasMonitor: false,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 50, y: 80, width: 40, height: 30 }
  },
  {
    id: 'seat-002',
    seatNumber: 'A1-02',
    type: 'standard',
    floor: 1,
    zone: 'Zone A',
    amenities: ['Power Outlet', 'WiFi', 'Dual Monitors'],
    status: 'occupied',
    hourlyRate: 75,
    maxCapacity: 1,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 100, y: 80, width: 40, height: 30 },
    currentBooking: {
      id: 'booking-001',
      userId: 'user-002',
      userName: 'Rahul S.',
      startTime: '09:00',
      endTime: '17:00',
      checkedIn: true
    }
  },
  {
    id: 'seat-003',
    seatNumber: 'A1-03',
    type: 'standing',
    floor: 1,
    zone: 'Zone A',
    amenities: ['Power Outlet', 'WiFi', 'Standing Desk'],
    status: 'available',
    hourlyRate: 60,
    maxCapacity: 1,
    hasMonitor: false,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: true,
    coordinates: { x: 150, y: 80, width: 40, height: 30 }
  },
  {
    id: 'seat-004',
    seatNumber: 'A1-04',
    type: 'window',
    floor: 1,
    zone: 'Zone A',
    amenities: ['Power Outlet', 'WiFi', 'Window View'],
    status: 'reserved',
    hourlyRate: 70,
    maxCapacity: 1,
    hasMonitor: false,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: true,
    isStandingDesk: false,
    coordinates: { x: 200, y: 80, width: 40, height: 30 }
  },
  {
    id: 'seat-005',
    seatNumber: 'B1-01',
    type: 'standard',
    floor: 1,
    zone: 'Zone B',
    amenities: ['Power Outlet', 'WiFi'],
    status: 'available',
    hourlyRate: 50,
    maxCapacity: 1,
    hasMonitor: false,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 50, y: 150, width: 40, height: 30 }
  },
  {
    id: 'seat-006',
    seatNumber: 'B1-02',
    type: 'standard',
    floor: 1,
    zone: 'Zone B',
    amenities: ['Power Outlet', 'WiFi', 'Dual Monitors'],
    status: 'occupied',
    hourlyRate: 75,
    maxCapacity: 1,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 100, y: 150, width: 40, height: 30 },
    currentBooking: {
      id: 'booking-002',
      userId: 'user-003',
      userName: 'Priya M.',
      startTime: '10:00',
      endTime: '18:00',
      checkedIn: true
    }
  },
  {
    id: 'seat-007',
    seatNumber: 'B1-03',
    type: 'standing',
    floor: 1,
    zone: 'Zone B',
    amenities: ['Power Outlet', 'WiFi', 'Standing Desk'],
    status: 'available',
    hourlyRate: 60,
    maxCapacity: 1,
    hasMonitor: false,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: true,
    coordinates: { x: 150, y: 150, width: 40, height: 30 }
  },
  {
    id: 'seat-008',
    seatNumber: 'B1-04',
    type: 'window',
    floor: 1,
    zone: 'Zone B',
    amenities: ['Power Outlet', 'WiFi', 'Window View', 'Dual Monitors'],
    status: 'available',
    hourlyRate: 85,
    maxCapacity: 1,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: true,
    isStandingDesk: false,
    coordinates: { x: 200, y: 150, width: 40, height: 30 }
  },

  // Floor 2 - Quiet Zone & Pods
  {
    id: 'seat-009',
    seatNumber: 'Q2-01',
    type: 'quiet',
    floor: 2,
    zone: 'Quiet Zone',
    amenities: ['Power Outlet', 'WiFi', 'Silent Environment'],
    status: 'available',
    hourlyRate: 65,
    maxCapacity: 1,
    hasMonitor: false,
    hasPowerOutlet: true,
    isQuietZone: true,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 50, y: 80, width: 40, height: 30 }
  },
  {
    id: 'seat-010',
    seatNumber: 'Q2-02',
    type: 'quiet',
    floor: 2,
    zone: 'Quiet Zone',
    amenities: ['Power Outlet', 'WiFi', 'Silent Environment', 'Dual Monitors'],
    status: 'occupied',
    hourlyRate: 90,
    maxCapacity: 1,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: true,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 100, y: 80, width: 40, height: 30 },
    currentBooking: {
      id: 'booking-003',
      userId: 'user-004',
      userName: 'Amit K.',
      startTime: '08:00',
      endTime: '14:00',
      checkedIn: true
    }
  },
  {
    id: 'seat-011',
    seatNumber: 'P2-01',
    type: 'pod',
    floor: 2,
    zone: 'Pod Zone',
    amenities: ['Power Outlet', 'WiFi', 'Private Enclosure', 'Dual Monitors', 'Adjustable Lighting'],
    status: 'available',
    hourlyRate: 120,
    maxCapacity: 1,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: true,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 180, y: 80, width: 60, height: 40 }
  },
  {
    id: 'seat-012',
    seatNumber: 'P2-02',
    type: 'pod',
    floor: 2,
    zone: 'Pod Zone',
    amenities: ['Power Outlet', 'WiFi', 'Private Enclosure', 'Dual Monitors', 'Adjustable Lighting'],
    status: 'reserved',
    hourlyRate: 120,
    maxCapacity: 1,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: true,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 250, y: 80, width: 60, height: 40 }
  },

  // Floor 3 - Collaborative Spaces
  {
    id: 'seat-013',
    seatNumber: 'C3-01',
    type: 'collaborative',
    floor: 3,
    zone: 'Collaboration Hub',
    amenities: ['Power Outlet', 'WiFi', 'Whiteboard', 'Large Display'],
    status: 'available',
    hourlyRate: 150,
    maxCapacity: 4,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 50, y: 80, width: 80, height: 50 }
  },
  {
    id: 'seat-014',
    seatNumber: 'C3-02',
    type: 'collaborative',
    floor: 3,
    zone: 'Collaboration Hub',
    amenities: ['Power Outlet', 'WiFi', 'Whiteboard', 'Large Display', 'Video Conferencing'],
    status: 'occupied',
    hourlyRate: 200,
    maxCapacity: 6,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 150, y: 80, width: 100, height: 50 },
    currentBooking: {
      id: 'booking-004',
      userId: 'user-005',
      userName: 'Team Alpha',
      startTime: '11:00',
      endTime: '13:00',
      checkedIn: true
    }
  },
  {
    id: 'seat-015',
    seatNumber: 'D3-01',
    type: 'collaborative',
    floor: 3,
    zone: 'Discussion Room',
    amenities: ['Power Outlet', 'WiFi', 'TV Screen', 'Conference Phone'],
    status: 'available',
    hourlyRate: 100,
    maxCapacity: 3,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 50, y: 160, width: 70, height: 45 }
  },
  {
    id: 'seat-016',
    seatNumber: 'D3-02',
    type: 'collaborative',
    floor: 3,
    zone: 'Discussion Room',
    amenities: ['Power Outlet', 'WiFi', 'TV Screen', 'Conference Phone'],
    status: 'maintenance',
    hourlyRate: 100,
    maxCapacity: 3,
    hasMonitor: true,
    hasPowerOutlet: true,
    isQuietZone: false,
    isWindowSeat: false,
    isStandingDesk: false,
    coordinates: { x: 140, y: 160, width: 70, height: 45 }
  }
];

// Mock Floor Plans
export const mockFloorPlans: FloorPlan[] = [
  {
    floor: 1,
    name: 'Ground Floor - Standard Workspace',
    width: 400,
    height: 300,
    zones: [
      { id: 'zone-a', name: 'Zone A', type: 'mixed', coordinates: { x: 30, y: 50, width: 230, height: 70 }, color: 'rgba(122, 199, 155, 0.2)' },
      { id: 'zone-b', name: 'Zone B', type: 'mixed', coordinates: { x: 30, y: 130, width: 230, height: 70 }, color: 'rgba(255, 214, 63, 0.2)' }
    ],
    entrances: [{ x: 20, y: 150 }],
    facilities: [
      { id: 'fac-1', name: 'Restroom', type: 'restroom', coordinates: { x: 350, y: 50 }, icon: 'fa-restroom' },
      { id: 'fac-2', name: 'Cafe', type: 'cafe', coordinates: { x: 350, y: 150 }, icon: 'fa-coffee' },
      { id: 'fac-3', name: 'Exit', type: 'exit', coordinates: { x: 20, y: 250 }, icon: 'fa-door-open' }
    ]
  },
  {
    floor: 2,
    name: 'First Floor - Quiet Zone & Pods',
    width: 400,
    height: 300,
    zones: [
      { id: 'zone-quiet', name: 'Quiet Zone', type: 'quiet', coordinates: { x: 30, y: 50, width: 130, height: 70 }, color: 'rgba(108, 160, 255, 0.2)' },
      { id: 'zone-pod', name: 'Pod Zone', type: 'quiet', coordinates: { x: 170, y: 50, width: 150, height: 70 }, color: 'rgba(255, 122, 110, 0.2)' }
    ],
    entrances: [{ x: 20, y: 150 }],
    facilities: [
      { id: 'fac-4', name: 'Restroom', type: 'restroom', coordinates: { x: 350, y: 50 }, icon: 'fa-restroom' },
      { id: 'fac-5', name: 'Water', type: 'water', coordinates: { x: 350, y: 150 }, icon: 'fa-tint' }
    ]
  },
  {
    floor: 3,
    name: 'Second Floor - Collaboration Hub',
    width: 400,
    height: 300,
    zones: [
      { id: 'zone-collab', name: 'Collaboration Hub', type: 'collaborative', coordinates: { x: 30, y: 50, width: 230, height: 90 }, color: 'rgba(255, 107, 53, 0.2)' },
      { id: 'zone-discuss', name: 'Discussion Rooms', type: 'collaborative', coordinates: { x: 30, y: 150, width: 200, height: 70 }, color: 'rgba(255, 199, 102, 0.2)' }
    ],
    entrances: [{ x: 20, y: 150 }],
    facilities: [
      { id: 'fac-6', name: 'Printer', type: 'printer', coordinates: { x: 350, y: 50 }, icon: 'fa-print' },
      { id: 'fac-7', name: 'Phone Booth', type: 'phone_booth', coordinates: { x: 350, y: 150 }, icon: 'fa-phone' }
    ]
  }
];

// Mock User Bookings
export const mockUserBookings: UserBooking[] = [
  {
    id: 'ub-001',
    seatId: 'seat-004',
    seatNumber: 'A1-04',
    seatType: 'Window Seat',
    locationName: 'Delhi Central',
    floor: 1,
    date: '2026-04-08',
    startTime: '14:00',
    endTime: '18:00',
    duration: 240,
    amenities: ['Power Outlet', 'WiFi', 'Window View'],
    status: 'confirmed',
    checkInDeadline: '2026-04-08T14:15:00',
    price: 280,
    createdAt: '2026-04-07T10:30:00'
  },
  {
    id: 'ub-002',
    seatId: 'seat-011',
    seatNumber: 'P2-01',
    seatType: 'Deep Work Pod',
    locationName: 'Delhi Central',
    floor: 2,
    date: '2026-04-09',
    startTime: '09:00',
    endTime: '12:00',
    duration: 180,
    amenities: ['Power Outlet', 'WiFi', 'Private Enclosure', 'Dual Monitors', 'Adjustable Lighting'],
    status: 'pending',
    checkInDeadline: '2026-04-09T09:15:00',
    price: 360,
    createdAt: '2026-04-08T08:00:00'
  }
];

// Helper functions
export const getSeatsByFloor = (floor: number): Seat[] => {
  return mockSeats.filter(seat => seat.floor === floor);
};

export const getSeatsByAmenity = (amenity: string): Seat[] => {
  return mockSeats.filter(seat => {
    switch (amenity) {
      case 'monitor': return seat.hasMonitor;
      case 'power': return seat.hasPowerOutlet;
      case 'quiet': return seat.isQuietZone;
      case 'window': return seat.isWindowSeat;
      case 'standing': return seat.isStandingDesk;
      case 'collaborative': return seat.type === 'collaborative';
      default: return true;
    }
  });
};

export const getAvailableSeats = (): Seat[] => {
  return mockSeats.filter(seat => seat.status === 'available');
};

export const getOccupiedSeats = (): Seat[] => {
  return mockSeats.filter(seat => seat.status === 'occupied');
};

export const getFloorPlan = (floor: number): FloorPlan | undefined => {
  return mockFloorPlans.find(fp => fp.floor === floor);
};

export const calculatePrice = (hourlyRate: number, durationMinutes: number): number => {
  const hours = durationMinutes / 60;
  return Math.round(hourlyRate * hours);
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${hours}h ${mins}m`;
};

export const getSeatStatusColor = (status: Seat['status']): string => {
  switch (status) {
    case 'available': return '#22c55e'; // green
    case 'occupied': return '#ef4444'; // red
    case 'reserved': return '#f59e0b'; // yellow/amber
    case 'maintenance': return '#6b7280'; // gray
    default: return '#6b7280';
  }
};

export const getOccupancyStats = (floor?: number): { total: number; available: number; occupied: number; reserved: number } => {
  const seats = floor ? getSeatsByFloor(floor) : mockSeats;
  return {
    total: seats.length,
    available: seats.filter(s => s.status === 'available').length,
    occupied: seats.filter(s => s.status === 'occupied').length,
    reserved: seats.filter(s => s.status === 'reserved').length
  };
};