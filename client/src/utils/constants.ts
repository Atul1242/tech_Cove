export const BRAND = {
  name: 'StudyCove',
  tagline: 'Your guaranteed quiet seat—any day.',
  description: 'Premium study spaces with guaranteed seating, perfect acoustics, and all the amenities you need to focus and succeed.'
};

export const NAVIGATION = {
  public: [
    { label: 'Locations', path: '/locations' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Features', path: '/features' },
    { label: 'Events', path: '/events' },
    { label: 'Blog', path: '/blog' }
  ],
  member: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Book Seat', path: '/book-seat' },
    { label: 'My Bookings', path: '/my-bookings' },
    { label: 'Membership', path: '/membership' },
    { label: 'Check-in', path: '/check-in' },
    { label: 'Billing', path: '/billing' },
    { label: 'Rewards', path: '/rewards' },
    { label: 'Support', path: '/support' }
  ],
  admin: [
    { label: 'Overview', path: '/admin' },
    { label: 'Live Floor', path: '/admin/live-floor' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Members', path: '/admin/members' },
    { label: 'Payments', path: '/admin/payments' },
    { label: 'Events & Content', path: '/admin/events' },
    { label: 'Analytics', path: '/admin/analytics' },
    { label: 'Settings', path: '/admin/settings' }
  ],
  footer: [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Product',
      links: [
        { label: 'Locations', path: '/locations' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Features', path: '/features' },
        { label: 'Mobile App', path: '/app' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Community', path: '/community' },
        { label: 'Status', path: '/status' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Refund Policy', path: '/refunds' },
        { label: 'Guidelines', path: '/guidelines' }
      ]
    }
  ]
};

export const CONTACT = {
  phone: '+91 98765 43210',
  email: 'hello@studycove.in',
  address: 'StudyCove HQ, Connaught Place, New Delhi - 110001',
  social: {
    facebook: 'https://facebook.com/studycove',
    twitter: 'https://twitter.com/studycove',
    instagram: 'https://instagram.com/studycove',
    linkedin: 'https://linkedin.com/company/studycove'
  }
};

export const FEATURES = [
  {
    icon: 'fas fa-volume-mute',
    title: 'Noise-Controlled',
    description: 'Acoustic panels and strict noise policies ensure perfect focus',
    color: 'var(--support-moss)'
  },
  {
    icon: 'fas fa-wifi',
    title: 'High-Speed WiFi',
    description: 'Blazing fast internet for research and online learning',
    color: 'var(--accent-1)'
  },
  {
    icon: 'fas fa-coffee',
    title: 'Cafe & Snacks',
    description: 'Fresh coffee and healthy snacks to fuel your studies',
    color: 'var(--support-amber)'
  },
  {
    icon: 'fas fa-charging-station',
    title: 'Power Outlets',
    description: 'Individual charging stations at every seat',
    color: 'var(--accent-2)'
  },
  {
    icon: 'fas fa-shield-alt',
    title: '24/7 Security',
    description: 'Round-the-clock security for your peace of mind',
    color: 'var(--support-coral)'
  },
  {
    icon: 'fas fa-parking',
    title: 'Free Parking',
    description: 'Complimentary parking for all members',
    color: 'var(--support-moss)'
  }
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    icon: 'fas fa-search',
    title: 'Find Your Space',
    description: 'Browse available study spots near you with real-time occupancy updates and amenity details.'
  },
  {
    step: 2,
    icon: 'fas fa-calendar-check',
    title: 'Book Instantly',
    description: 'Reserve your seat for hours, days, or get a monthly pass. Cancel anytime with flexible policies.'
  },
  {
    step: 3,
    icon: 'fas fa-qrcode',
    title: 'Check-in & Study',
    description: 'Scan your QR code, settle into your guaranteed seat, and focus on what matters most.'
  }
];
