// Mock data for user portal features

export interface BookLoan {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  borrowDate: string;
  dueDate: string;
  renewalsLeft: number;
  status: 'active' | 'overdue' | 'returned';
  isbn: string;
}

export interface UpcomingDue {
  id: string;
  type: 'book' | 'seat' | 'event';
  title: string;
  dueDate: string;
  dueTime?: string;
  priority: 'high' | 'medium' | 'low';
  actionUrl: string;
}

export interface ReservedSeat {
  id: string;
  locationName: string;
  date: string;
  startTime: string;
  endTime: string;
  seatNumber: string;
  amenities: string[];
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface SubscriptionStatus {
  plan: 'basic' | 'standard' | 'premium' | 'student';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  price: number;
  features: string[];
  daysRemaining: number;
}

export interface Notification {
  id: string;
  type: 'due_reminder' | 'renewal' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DigitalID {
  memberId: string;
  qrCode: string;
  nfcEnabled: boolean;
  validFrom: string;
  validUntil: string;
  memberSince: string;
  tier: string;
}

// Mock Book Loans
export const mockBookLoans: BookLoan[] = [
  {
    id: 'loan-001',
    title: 'The Psychology of Learning',
    author: 'John Anderson',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3b4c8d2b?w=100&h=150&fit=crop',
    borrowDate: '2026-03-25',
    dueDate: '2026-04-10',
    renewalsLeft: 2,
    status: 'active',
    isbn: '978-0-123456-78-9'
  },
  {
    id: 'loan-002',
    title: 'Deep Work: Rules for Focused Success',
    author: 'Cal Newport',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop',
    borrowDate: '2026-03-20',
    dueDate: '2026-04-05',
    renewalsLeft: 1,
    status: 'active',
    isbn: '978-1-456789-01-2'
  },
  {
    id: 'loan-003',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop',
    borrowDate: '2026-03-15',
    dueDate: '2026-03-30',
    renewalsLeft: 0,
    status: 'active',
    isbn: '978-2-345678-90-1'
  },
  {
    id: 'loan-004',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887cf646?w=100&h=150&fit=crop',
    borrowDate: '2026-03-01',
    dueDate: '2026-03-25',
    renewalsLeft: 0,
    status: 'overdue',
    isbn: '978-3-456789-01-2'
  }
];

// Mock Upcoming Dues
export const mockUpcomingDues: UpcomingDue[] = [
  {
    id: 'due-001',
    type: 'book',
    title: 'Atomic Habits',
    dueDate: '2026-04-08',
    priority: 'high',
    actionUrl: '/my-bookings'
  },
  {
    id: 'due-002',
    type: 'book',
    title: 'The Psychology of Learning',
    dueDate: '2026-04-10',
    priority: 'medium',
    actionUrl: '/my-bookings'
  },
  {
    id: 'due-003',
    type: 'seat',
    title: 'Delhi Central - Seat A-25',
    dueDate: '2026-04-08',
    dueTime: '17:00',
    priority: 'high',
    actionUrl: '/check-in'
  },
  {
    id: 'due-004',
    type: 'event',
    title: 'Productivity Workshop',
    dueDate: '2026-04-12',
    dueTime: '14:00',
    priority: 'low',
    actionUrl: '/events'
  }
];

// Mock Reserved Seats
export const mockReservedSeats: ReservedSeat[] = [
  {
    id: 'seat-001',
    locationName: 'Delhi Central',
    date: '2026-04-08',
    startTime: '09:00',
    endTime: '17:00',
    seatNumber: 'A-25',
    amenities: ['Power Outlet', 'Standing Desk', 'Monitor'],
    status: 'confirmed'
  },
  {
    id: 'seat-002',
    locationName: 'Mumbai Bandra',
    date: '2026-04-10',
    startTime: '10:00',
    endTime: '18:00',
    seatNumber: 'B-12',
    amenities: ['Power Outlet', 'Quiet Zone'],
    status: 'confirmed'
  },
  {
    id: 'seat-003',
    locationName: 'Bangalore Koramangala',
    date: '2026-04-15',
    startTime: '08:00',
    endTime: '16:00',
    seatNumber: 'C-08',
    amenities: ['Power Outlet', 'Standing Desk', 'Natural Light'],
    status: 'pending'
  }
];

// Mock Subscription Status
export const mockSubscription: SubscriptionStatus = {
  plan: 'premium',
  startDate: '2025-12-01',
  endDate: '2026-06-01',
  autoRenew: true,
  price: 2999,
  features: [
    'Unlimited study hours',
    'All locations access',
    'Priority booking',
    'Free book loans (up to 5)',
    'Event discounts',
    'Dedicated support'
  ],
  daysRemaining: 54
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'due_reminder',
    title: 'Book Due Tomorrow',
    message: 'Atomic Habits is due tomorrow. Consider renewing if you need more time.',
    timestamp: '2026-04-07T10:00:00',
    read: false,
    actionUrl: '/my-bookings'
  },
  {
    id: 'notif-002',
    type: 'renewal',
    title: 'Renewal Successful',
    message: 'Deep Work has been renewed. New due date: April 15, 2026.',
    timestamp: '2026-04-05T14:30:00',
    read: true
  },
  {
    id: 'notif-003',
    type: 'promotion',
    title: 'Weekend Special',
    message: 'Get 20% off on all events this weekend. Use code: STUDY20',
    timestamp: '2026-04-04T09:00:00',
    read: true,
    actionUrl: '/events'
  },
  {
    id: 'notif-004',
    type: 'system',
    title: 'New Location Opening',
    message: 'StudyCove Pune is now open! Book your first visit and get 50 bonus points.',
    timestamp: '2026-04-01T12:00:00',
    read: true,
    actionUrl: '/locations'
  }
];

// Mock Digital ID
export const mockDigitalID: DigitalID = {
  memberId: 'SC-2024-78542',
  qrCode: 'STUDYCOVE-MEMBER-SC202478542-PREMIUM',
  nfcEnabled: true,
  validFrom: '2025-12-01',
  validUntil: '2026-06-01',
  memberSince: '2024-03-15',
  tier: 'Premium'
};

// Helper function to calculate days until due
export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Helper function to check if overdue
export const isOverdue = (dueDate: string): boolean => {
  return getDaysUntilDue(dueDate) < 0;
};

// Helper function to format due date
export const formatDueDate = (dueDate: string): string => {
  const days = getDaysUntilDue(dueDate);
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `Due in ${days} days`;
};