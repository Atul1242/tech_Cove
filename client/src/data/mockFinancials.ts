// Mock data for Financials & Subscription Engine

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'student';
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limits: {
    bookingHoursPerMonth: number;
    bookLoansPerMonth: number;
    eventDiscount: number;
    priorityBooking: boolean;
  };
  popular?: boolean;
}

export interface UserSubscription {
  id: string;
  planId: string;
  planName: string;
  tier: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod?: PaymentMethod;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  nextBillingAmount: number;
  pauseHistory: PauseRecord[];
}

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'credit_card' | 'debit_card' | 'net_banking' | 'wallet';
  name: string;
  last4?: string;
  upiId?: string;
  bankName?: string;
  isDefault: boolean;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'subscription' | 'booking' | 'penalty' | 'refund' | 'reward';
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  description: string;
  invoiceId: string;
  paymentMethod?: string;
}

export interface Penalty {
  id: string;
  type: 'late_return' | 'no_show' | 'damage' | 'lost_item';
  relatedItemId: string;
  relatedItemName: string;
  amount: number;
  originalDueDate: string;
  incurredDate: string;
  status: 'pending' | 'paid' | 'waived' | 'disputed';
  daysOverdue?: number;
  description: string;
}

export interface UsageAnalytics {
  period: string;
  totalHoursStudied: number;
  totalBookings: number;
  booksBorrowed: number;
  eventsAttended: number;
  moneySavedByBorrowing: number;
  averageSessionLength: number;
  mostVisitedLocation: string;
  favoriteSeatType: string;
  streakDays: number;
  productivityScore: number;
  focusTimeBreakdown: {
    deepWork: number;
    collaborative: number;
    reading: number;
  };
  weeklyTrend: {
    week: string;
    hours: number;
  }[];
  comparisonWithPreviousMonth: {
    hoursChange: number;
    bookingsChange: number;
    savingsChange: number;
  };
}

export interface FocusReport {
  id: string;
  month: string;
  year: number;
  generatedDate: string;
  summary: {
    totalHours: number;
    totalSessions: number;
    booksRead: number;
    moneySaved: number;
    productivityScore: number;
  };
  highlights: string[];
  achievements: Achievement[];
  recommendations: string[];
  nextMonthGoals: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'productivity' | 'consistency' | 'social' | 'financial';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Subscription Plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    tier: 'basic',
    monthlyPrice: 999,
    yearlyPrice: 9999,
    features: [
      '20 hours of study time per month',
      'Access to standard seats',
      '2 book loans per month',
      'Basic amenities',
      'Email support'
    ],
    limits: {
      bookingHoursPerMonth: 20,
      bookLoansPerMonth: 2,
      eventDiscount: 5,
      priorityBooking: false
    }
  },
  {
    id: 'plan-standard',
    name: 'Standard',
    tier: 'standard',
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    features: [
      '50 hours of study time per month',
      'Access to all seat types',
      '5 book loans per month',
      '10% event discount',
      'Priority email support',
      'Free coffee vouchers'
    ],
    limits: {
      bookingHoursPerMonth: 50,
      bookLoansPerMonth: 5,
      eventDiscount: 10,
      priorityBooking: false
    },
    popular: true
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    tier: 'premium',
    monthlyPrice: 3499,
    yearlyPrice: 34999,
    features: [
      'Unlimited study hours',
      'All locations access',
      '10 book loans per month',
      '20% event discount',
      'Priority booking',
      'Dedicated support',
      'Free printing (50 pages/month)',
      'Locker access'
    ],
    limits: {
      bookingHoursPerMonth: -1, // unlimited
      bookLoansPerMonth: 10,
      eventDiscount: 20,
      priorityBooking: true
    }
  },
  {
    id: 'plan-student',
    name: 'Student',
    tier: 'student',
    monthlyPrice: 799,
    yearlyPrice: 7999,
    features: [
      '30 hours of study time per month',
      'Access to standard & quiet seats',
      '3 book loans per month',
      '15% event discount',
      'Student community access',
      'Exam season bonuses'
    ],
    limits: {
      bookingHoursPerMonth: 30,
      bookLoansPerMonth: 3,
      eventDiscount: 15,
      priorityBooking: false
    }
  }
];

// User's Current Subscription
export const mockUserSubscription: UserSubscription = {
  id: 'sub-001',
  planId: 'plan-standard',
  planName: 'Standard',
  tier: 'standard',
  status: 'active',
  startDate: '2025-12-01',
  endDate: '2026-06-01',
  autoRenew: true,
  billingCycle: 'monthly',
  nextBillingDate: '2026-05-01',
  nextBillingAmount: 1999,
  pauseHistory: [
    {
      startDate: '2026-01-15',
      endDate: '2026-01-30',
      reason: 'Vacation'
    }
  ],
  paymentMethod: {
    id: 'pm-001',
    type: 'upi',
    name: 'UPI - GPay',
    upiId: 'user@okaxis',
    isDefault: true,
    icon: 'fa-mobile-alt'
  }
};

// Payment Methods
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-001',
    type: 'upi',
    name: 'UPI - GPay',
    upiId: 'user@okaxis',
    isDefault: true,
    icon: 'fa-mobile-alt'
  },
  {
    id: 'pm-002',
    type: 'credit_card',
    name: 'HDFC Credit Card',
    last4: '4532',
    isDefault: false,
    icon: 'fa-credit-card'
  },
  {
    id: 'pm-003',
    type: 'net_banking',
    name: 'SBI Net Banking',
    bankName: 'State Bank of India',
    isDefault: false,
    icon: 'fa-university'
  }
];

// Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    type: 'subscription',
    amount: 1999,
    status: 'completed',
    date: '2026-04-01',
    description: 'Standard Plan - Monthly Subscription',
    invoiceId: 'INV-2026-0401',
    paymentMethod: 'UPI - GPay'
  },
  {
    id: 'txn-002',
    type: 'booking',
    amount: 280,
    status: 'completed',
    date: '2026-04-05',
    description: 'Seat Booking - A1-04 (4 hours)',
    invoiceId: 'INV-2026-0402',
    paymentMethod: 'UPI - GPay'
  },
  {
    id: 'txn-003',
    type: 'penalty',
    amount: 50,
    status: 'pending',
    date: '2026-04-06',
    description: 'Late Return - "Atomic Habits" (2 days overdue)',
    invoiceId: 'INV-2026-0403'
  },
  {
    id: 'txn-004',
    type: 'booking',
    amount: 360,
    status: 'completed',
    date: '2026-04-07',
    description: 'Pod Booking - P2-01 (3 hours)',
    invoiceId: 'INV-2026-0404',
    paymentMethod: 'HDFC Credit Card'
  },
  {
    id: 'txn-005',
    type: 'reward',
    amount: -100,
    status: 'completed',
    date: '2026-04-08',
    description: 'Reward Points Redemption',
    invoiceId: 'INV-2026-0405'
  }
];

// Penalties
export const mockPenalties: Penalty[] = [
  {
    id: 'pen-001',
    type: 'late_return',
    relatedItemId: 'book-003',
    relatedItemName: 'Atomic Habits',
    amount: 50,
    originalDueDate: '2026-04-04',
    incurredDate: '2026-04-06',
    status: 'pending',
    daysOverdue: 2,
    description: 'Book returned 2 days after due date'
  },
  {
    id: 'pen-002',
    type: 'no_show',
    relatedItemId: 'booking-005',
    relatedItemName: 'Seat B1-03',
    amount: 100,
    originalDueDate: '2026-03-28',
    incurredDate: '2026-03-28',
    status: 'paid',
    description: 'No check-in within grace period'
  }
];

// Usage Analytics
export const mockUsageAnalytics: UsageAnalytics = {
  period: 'April 2026',
  totalHoursStudied: 47,
  totalBookings: 12,
  booksBorrowed: 4,
  eventsAttended: 2,
  moneySavedByBorrowing: 2450,
  averageSessionLength: 3.9,
  mostVisitedLocation: 'Delhi Central',
  favoriteSeatType: 'Window Seat',
  streakDays: 7,
  productivityScore: 87,
  focusTimeBreakdown: {
    deepWork: 28,
    collaborative: 12,
    reading: 7
  },
  weeklyTrend: [
    { week: 'Week 1', hours: 10 },
    { week: 'Week 2', hours: 14 },
    { week: 'Week 3', hours: 12 },
    { week: 'Week 4', hours: 11 }
  ],
  comparisonWithPreviousMonth: {
    hoursChange: 15,
    bookingsChange: 3,
    savingsChange: 450
  }
};

// Focus Report
export const mockFocusReport: FocusReport = {
  id: 'report-2026-03',
  month: 'March',
  year: 2026,
  generatedDate: '2026-04-01',
  summary: {
    totalHours: 32,
    totalSessions: 9,
    booksRead: 3,
    moneySaved: 2000,
    productivityScore: 82
  },
  highlights: [
    'You studied 15% more hours than last month!',
    'Your deep work sessions increased by 8 hours',
    'You saved ₹2,000 by borrowing books instead of buying',
    'You maintained a 7-day streak!'
  ],
  achievements: [
    {
      id: 'ach-001',
      title: 'Deep Work Champion',
      description: 'Completed 20+ hours of deep work in a month',
      icon: 'fa-brain',
      earnedDate: '2026-03-31',
      category: 'productivity',
      rarity: 'rare'
    },
    {
      id: 'ach-002',
      title: 'Bookworm',
      description: 'Read 3 books this month',
      icon: 'fa-book-reader',
      earnedDate: '2026-03-31',
      category: 'productivity',
      rarity: 'common'
    },
    {
      id: 'ach-003',
      title: 'Consistency King',
      description: 'Maintained a 7-day streak',
      icon: 'fa-fire',
      earnedDate: '2026-03-25',
      category: 'consistency',
      rarity: 'epic'
    }
  ],
  recommendations: [
    'Try booking a Deep Work Pod for your most productive hours (9 AM - 12 PM)',
    'Consider upgrading to Premium for unlimited hours and priority booking',
    'Join the upcoming "Productivity Workshop" on April 15th'
  ],
  nextMonthGoals: [
    'Log 50 hours of study time',
    'Read 4 books',
    'Maintain a 14-day streak',
    'Attend 3 community events'
  ]
};

// Payment Gateway Options
export const paymentGateways = [
  { id: 'upi', name: 'UPI', icon: 'fa-mobile-alt', description: 'Pay using any UPI app' },
  { id: 'credit_card', name: 'Credit Card', icon: 'fa-credit-card', description: 'Visa, Mastercard, RuPay' },
  { id: 'debit_card', name: 'Debit Card', icon: 'fa-credit-card', description: 'All major banks' },
  { id: 'net_banking', name: 'Net Banking', icon: 'fa-university', description: '40+ banks supported' },
  { id: 'wallet', name: 'Wallets', icon: 'fa-wallet', description: 'Paytm, PhonePe, Amazon Pay' }
];

// Helper functions
export const calculatePenalty = (daysOverdue: number, type: 'book' | 'seat' = 'book'): number => {
  const baseRate = type === 'book' ? 25 : 50; // per day
  return Math.min(daysOverdue * baseRate, type === 'book' ? 500 : 1000); // max cap
};

export const getTotalPendingPenalties = (): number => {
  return mockPenalties
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const getPlanById = (id: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find(p => p.id === id);
};

export const getDaysRemaining = (endDate: string): number => {
  const today = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const canUserBook = (): { allowed: boolean; reason?: string } => {
  const pendingPenalties = getTotalPendingPenalties();
  if (pendingPenalties > 0) {
    return { 
      allowed: false, 
      reason: `You have pending dues of ${formatCurrency(pendingPenalties)}. Please clear them to continue booking.`
    };
  }
  return { allowed: true };
};