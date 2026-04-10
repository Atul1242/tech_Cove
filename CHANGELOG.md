# StudyCove - Changelog

All notable changes to the StudyCove project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Comprehensive feature documentation file (FEATURES.md)
- Changelog file for tracking all changes

---

## [1.4.0] - 2026-04-08

### Added - Financials & Subscription Engine

#### Seamless Subscription Lifecycle
- Current subscription status display with tier badge
- Plan upgrade functionality with plan comparison
- Plan downgrade option
- Subscription pause feature (1 week to 1 month)
- Subscription cancellation option
- Auto-renew toggle switch
- Billing cycle selection (monthly/yearly)
- Yearly discount calculation (shows percentage saved)
- Plan comparison cards with feature lists
- "Most Popular" badge for recommended plans
- Days remaining counter
- Next billing date and amount preview

#### Integrated Payment Gateways
- UPI payment support (GPay, PhonePe, Paytm)
- Credit Card support (Visa, Mastercard, RuPay)
- Debit Card support
- Net Banking integration (40+ banks)
- Digital Wallet support
- Multiple saved payment methods display
- Default payment method selection
- Payment method icons and details
- Add new payment method button
- Secure payment processing with loading animation
- Payment success confirmation

#### Automated Penalty Management
- Real-time penalty calculation
- Late return fees (₹25/day for books, max ₹500)
- No-show fees (₹50/day for seats, max ₹1000)
- Pending dues alert banner at top of page
- Block booking until dues cleared
- Penalty history with detailed information
- Penalty status tracking (pending, paid, waived, disputed)
- Days overdue display
- Pay all dues at once option
- Individual penalty payment
- Invoice ID for each penalty
- Account standing indicator

#### Usage Analytics & Focus Reports
- Total hours studied tracking
- Money saved by borrowing vs. buying comparison
- Books borrowed count
- Events attended count
- Productivity score (0-100)
- Focus time breakdown:
  - Deep Work hours
  - Collaborative hours
  - Reading hours
- Weekly trend visualization with progress bars
- Month-over-month comparison (hours, bookings, savings)
- Achievement badges system:
  - Common, Rare, Epic, Legendary rarity levels
  - Category badges (productivity, consistency, social, financial)
  - Badge icons and descriptions
- Personalized recommendations
- Next month goal setting
- Downloadable PDF reports
- Highlights section with key achievements
- Savings visualization (If bought vs. You spent)

#### Mock Data System for Financials
- Created `mockFinancials.ts` with comprehensive financial data
- 4 subscription plans (Basic, Standard, Premium, Student)
- User subscription details
- 3 payment methods
- 5 transaction records
- 2 penalty records
- Usage analytics data
- Focus report with achievements
- Payment gateway options
- Helper functions for calculations

#### Enhanced Membership Page
- Complete redesign with tab navigation
- Four tabs: Subscription, Payments, Penalties, Analytics
- Payment modal with gateway selection
- Pause subscription modal
- Real-time data display

---

## [1.3.0] - 2026-04-08

### Added - Space Allocation & Booking Engine

#### Interactive Real-Time Floor Plan
- SVG-based interactive floor plan visualization
- Real-time seat status color coding:
  - Green: Available
  - Red: Occupied
  - Yellow: Reserved
  - Gray: Maintenance
- Multi-floor navigation (Floors 1, 2, 3)
- Zone visualization with color-coded areas
- Facility markers (restrooms, cafe, printer, water, exits)
- Entrance marker for orientation
- Hover tooltips showing seat details
- Seat type indicators (collaborative seats show capacity)
- Occupancy statistics panel (total, available, occupied, reserved)
- Percentage occupancy display

#### Amenity Filtering System
- Filter by Dual Monitors
- Filter by Power Outlet
- Filter by Quiet Zone
- Filter by Window Seat
- Filter by Standing Desk
- Filter by Collaborative Space
- Multiple filter combination support
- Clear all filters option
- Real-time filtered results update on floor plan

#### Micro-Slot Booking
- Date selection with calendar picker
- Start time selection (30-minute intervals, 06:00-22:00)
- Duration options:
  - 45 minutes (Quick session)
  - 1 hour (Standard session)
  - 1.5 hours (Extended session)
  - 2 hours (Half-day session)
  - 3 hours (Deep work session)
  - 4 hours (Full half-day)
  - 6 hours (Extended work day)
  - 8 hours (Full day)
- Automatic end time calculation
- Dynamic pricing based on duration and seat type
- Seat type descriptions with icons
- Booking confirmation modal with summary
- Price preview before confirmation
- Loading animation during booking process
- Success confirmation with check-in reminder

#### Proximity Check-In System
- 15-minute grace period notification
- Automatic booking cancellation warning
- Check-in deadline display in booking details
- No-show prevention messaging
- Space utilization optimization notice
- Booking status tracking (confirmed, pending, checked-in, completed, cancelled, no-show)

#### Mock Data System for Seat Booking
- Created `mockSeatBooking.ts` with comprehensive seat data
- 16 mock seats across 3 floors
- Seat types: standard, standing, pod, collaborative, window, quiet
- Seat amenities and features
- Current booking information
- Floor plan layouts with zones and facilities
- User booking history
- Helper functions for filtering and calculations

#### Enhanced BookSeat Page
- Complete redesign with interactive floor plan
- Three-column layout (filters, floor plan, details)
- Real-time seat selection and preview
- Booking flow with confirmation modal

---

## [1.2.0] - 2026-04-08

### Added - Smart Inventory & Spatial Wayfinding

#### Real-Time Catalog Search
- Advanced search by title, author, or ISBN
- Genre filter dropdown (Psychology, Self-Help, Programming, Computer Science, Business, Philosophy, Data Science)
- Syllabus relevance filter for course-specific books
- Availability status filter (All/Available/Unavailable)
- Live inventory display showing copies available (e.g., "2 of 3 copies available")
- Real-time search results with instant updates
- Results count display

#### Interactive Shelf Mapping (Indoor GPS)
- 2D SVG floor map visualization
- Multi-floor navigation support (Floors 1, 2, 3)
- Animated route path from entrance to book location
- Target shelf highlighting with pulse animation
- Shelf level indicator (1-5, bottom to top)
- Aisle and shelf labels on map
- Legend and orientation markers
- Entrance marker for wayfinding
- "Show Route" toggle button
- Floor selector buttons

#### Reserve to Hold Feature
- One-click book reservation button
- 4-hour hold expiration timer
- Reservation status tracking
- Cancel reservation option
- Active reservations panel in sidebar
- Loading animation during reservation process
- Prevents other users from taking reserved books

#### Mock Data System for Book Catalog
- Created `mockBookCatalog.ts` with comprehensive book data
- 10 mock books with realistic information
- Book details: title, author, ISBN, genre, syllabus relevance, publisher, year, pages, rating
- Book location data: floor, aisle, shelf, shelf level, coordinates
- Floor map data with aisles and shelves
- Active reservations mock data
- Helper functions for search and filtering

#### New Page
- BookLocator page at `/book-locator` route
- Integrated with App.tsx routing

---

## [1.1.0] - 2026-04-08

### Added - Core User Portal & Account Management

#### Unified Dynamic Dashboard
- New tab-based navigation system (Overview, Book Loans, Due Dates, E-Library Card)
- Stats cards showing: total bookings, hours studied, streak, points, active loans, upcoming dues
- Quick actions panel with shortcuts to key features
- Upcoming due dates section with priority indicators (high/medium/low)
- Reserved seats display with status badges (confirmed/pending/cancelled)
- Subscription status banner with days remaining counter
- Notification bell with unread count badge
- Dropdown notification panel with multiple notification types

#### Automated Loan Lifecycle Management
- Book loans tab with grid layout showing all borrowed books
- One-tap renewal functionality with loading animation
- Renewal counter displaying remaining renewals per book
- Color-coded due date indicators:
  - Red: Overdue or due today
  - Yellow: Due within 3 days
  - Default: Due later
- Notification settings panel with toggles for:
  - Push notifications
  - SMS alerts
  - Email reminders
- Reminder timing configuration (24h/48h before due date)

#### Digital Identification (E-Library Card)
- Beautiful digital ID card with dark gradient design
- Scannable QR code for turnstile entry
- NFC-enabled indicator
- Member details display:
  - Member ID
  - Membership tier
  - Valid until date
  - Member since date
- "Save to Wallet" button
- "Share" button
- Usage instructions panel with three use cases:
  - Entry (turnstile access)
  - Checkout (self-checkout kiosks)
  - NFC (quick tap access)

#### Mock Data System
- Created `mockUserData.ts` with comprehensive mock data
- Mock book loans with realistic book information
- Mock upcoming dues for books, seats, and events
- Mock reserved seats with amenities
- Mock subscription status
- Mock notifications
- Mock digital ID data
- Helper functions for date calculations

### Changed
- Enhanced Dashboard component with new tab system
- Improved overall user experience with better information architecture

---

## [1.0.0] - 2026-04-08

### Added - Initial Project Setup

#### Project Infrastructure
- React 18 with TypeScript
- Vite as build tool
- Express.js backend server
- PostgreSQL database with Drizzle ORM
- Tailwind CSS for styling
- shadcn/ui component library

#### Public Pages
- Home page with hero section and features
- Locations page with location cards
- Location detail page with amenities
- Pricing page with tier comparison
- Features page
- How It Works page
- Gallery page
- Events page
- Blog page
- FAQs page
- Contact page
- Careers page

#### Member Portal
- Dashboard (basic version)
- Book a Seat page
- My Bookings page
- Membership page
- Check-in page with QR code
- Billing page
- Rewards page
- Support page

#### Admin Panel
- Overview dashboard
- Live Floor management
- Bookings management
- Members management
- Payments management
- Events & Content management
- Analytics page
- Settings page

#### Authentication
- Login page
- Sign Up page
- User session management
- Auth context provider

#### UI/UX Features
- Responsive design
- Framer Motion page transitions
- Custom color scheme with CSS variables
- Custom button styles
- Card components
- Navbar with scroll detection
- Footer component

#### Policy Pages
- Privacy Policy
- Terms of Service
- Refund Policy
- Community Guidelines

---

## [0.1.0] - 2026-03-15

### Added
- Initial project scaffolding
- Basic folder structure
- Configuration files (package.json, tsconfig.json, vite.config.ts)
- Git repository initialization

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.4.0 | 2026-04-08 | Financials & Subscription Engine features |
| 1.3.0 | 2026-04-08 | Space Allocation & Booking Engine features |
| 1.2.0 | 2026-04-08 | Smart Inventory & Spatial Wayfinding features |
| 1.1.0 | 2026-04-08 | Core User Portal & Account Management features |
| 1.0.0 | 2026-04-08 | Initial release with all basic features |
| 0.1.0 | 2026-03-15 | Project initialization |

---

## Upcoming Changes

### [1.5.0] - Planned
- Real-time notifications with WebSocket
- Email notification system
- Geolocation-based check-in
- Push notification integration

### [1.6.0] - Planned
- Social features (study buddy matching)
- Advanced analytics dashboard
- Gamification elements expansion
- Leaderboard system

### [2.0.0] - Planned
- Mobile application (iOS/Android)
- AI-powered recommendations
- Multi-language support
- Third-party integrations

---

*Last Updated: April 8, 2026*