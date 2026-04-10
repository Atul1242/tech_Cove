import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, decimal, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==================== USERS ====================
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  phone: varchar("phone"),
  avatar: varchar("avatar"),
  membershipType: varchar("membership_type").default("basic"),
  membershipExpiry: timestamp("membership_expiry"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
  phone: true,
  avatar: true,
  membershipType: true,
  membershipExpiry: true,
});

// ==================== LOCATIONS ====================
export const locations = pgTable("locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  address: text("address").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  pincode: varchar("pincode").notNull(),
  description: text("description"),
  amenities: jsonb("amenities").$type<string[]>().default([]),
  images: jsonb("images").$type<string[]>().default([]),
  totalSeats: integer("total_seats").default(0),
  availableSeats: integer("available_seats").default(0),
  openingTime: varchar("opening_time").default("06:00"),
  closingTime: varchar("closing_time").default("22:00"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// ==================== SEATS ====================
export const seats = pgTable("seats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  locationId: varchar("location_id").notNull().references(() => locations.id),
  seatNumber: varchar("seat_number").notNull(),
  floor: integer("floor").notNull(),
  zone: varchar("zone").notNull(),
  type: varchar("type").notNull(), // standard, standing, pod, collaborative, window, quiet
  status: varchar("status").notNull().default("available"), // available, occupied, reserved, maintenance
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  maxCapacity: integer("max_capacity").default(1),
  hasMonitor: boolean("has_monitor").default(false),
  hasPowerOutlet: boolean("has_power_outlet").default(true),
  isQuietZone: boolean("is_quiet_zone").default(false),
  isWindowSeat: boolean("is_window_seat").default(false),
  isStandingDesk: boolean("is_standing_desk").default(false),
  amenities: jsonb("amenities").$type<string[]>().default([]),
  coordinates: jsonb("coordinates").$type<{ x: number; y: number; width: number; height: number }>(),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  locationIdx: index("seats_location_idx").on(table.locationId),
  floorIdx: index("seats_floor_idx").on(table.floor),
  statusIdx: index("seats_status_idx").on(table.status),
}));

// ==================== SEAT BOOKINGS ====================
export const seatBookings = pgTable("seat_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  seatId: varchar("seat_id").notNull().references(() => seats.id),
  locationId: varchar("location_id").notNull().references(() => locations.id),
  bookingDate: timestamp("booking_date").notNull(),
  startTime: varchar("start_time").notNull(),
  endTime: varchar("end_time").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: varchar("status").notNull().default("confirmed"), // confirmed, pending, checked-in, completed, cancelled, no-show
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  checkInDeadline: timestamp("check_in_deadline"),
  checkedInAt: timestamp("checked_in_at"),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("seat_bookings_user_idx").on(table.userId),
  seatIdx: index("seat_bookings_seat_idx").on(table.seatId),
  dateIdx: index("seat_bookings_date_idx").on(table.bookingDate),
  statusIdx: index("seat_bookings_status_idx").on(table.status),
}));

// ==================== BOOKS ====================
export const books = pgTable("books", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  isbn: varchar("isbn").notNull().unique(),
  genre: varchar("genre").notNull(),
  description: text("description"),
  coverImage: varchar("cover_image"),
  publicationYear: integer("publication_year"),
  publisher: varchar("publisher"),
  pages: integer("pages"),
  language: varchar("language").default("English"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("4.0"),
  totalCopies: integer("total_copies").default(1),
  availableCopies: integer("available_copies").default(1),
  syllabusRelevance: jsonb("syllabus_relevance").$type<string[]>().default([]),
  status: varchar("status").notNull().default("available"), // available, limited, unavailable
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  genreIdx: index("books_genre_idx").on(table.genre),
  statusIdx: index("books_status_idx").on(table.status),
}));

// ==================== BOOK LOCATIONS ====================
export const bookLocations = pgTable("book_locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: varchar("book_id").notNull().references(() => books.id),
  locationId: varchar("location_id").notNull().references(() => locations.id),
  floor: integer("floor").notNull(),
  aisle: varchar("aisle").notNull(),
  shelf: varchar("shelf").notNull(),
  shelfLevel: integer("shelf_level").notNull(),
  coordinates: jsonb("coordinates").$type<{ x: number; y: number }>(),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  bookIdx: index("book_locations_book_idx").on(table.bookId),
  locationIdx: index("book_locations_location_idx").on(table.locationId),
}));

// ==================== BOOK LOANS ====================
export const bookLoans = pgTable("book_loans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bookId: varchar("book_id").notNull().references(() => books.id),
  locationId: varchar("location_id").notNull().references(() => locations.id),
  borrowDate: timestamp("borrow_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  returnDate: timestamp("return_date"),
  renewalsLeft: integer("renewals_left").default(3),
  status: varchar("status").notNull().default("active"), // active, overdue, returned
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("book_loans_user_idx").on(table.userId),
  bookIdx: index("book_loans_book_idx").on(table.bookId),
  statusIdx: index("book_loans_status_idx").on(table.status),
}));

// ==================== BOOK RESERVATIONS ====================
export const bookReservations = pgTable("book_reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bookId: varchar("book_id").notNull().references(() => books.id),
  locationId: varchar("location_id").notNull().references(() => locations.id),
  reservedAt: timestamp("reserved_at").default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull(),
  status: varchar("status").notNull().default("active"), // active, expired, picked_up, cancelled
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("book_reservations_user_idx").on(table.userId),
  bookIdx: index("book_reservations_book_idx").on(table.bookId),
  statusIdx: index("book_reservations_status_idx").on(table.status),
}));

// ==================== SUBSCRIPTION PLANS ====================
export const subscriptionPlans = pgTable("subscription_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  tier: varchar("tier").notNull(), // basic, standard, premium, student
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
  yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }).notNull(),
  features: jsonb("features").$type<string[]>().default([]),
  limits: jsonb("limits").$type<{
    bookingHoursPerMonth: number;
    bookLoansPerMonth: number;
    eventDiscount: number;
    priorityBooking: boolean;
  }>(),
  isPopular: boolean("is_popular").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// ==================== USER SUBSCRIPTIONS ====================
export const userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  planId: varchar("plan_id").notNull().references(() => subscriptionPlans.id),
  status: varchar("status").notNull().default("active"), // active, paused, cancelled, expired
  billingCycle: varchar("billing_cycle").notNull().default("monthly"), // monthly, yearly
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  autoRenew: boolean("auto_renew").default(true),
  nextBillingDate: timestamp("next_billing_date"),
  nextBillingAmount: decimal("next_billing_amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("user_subscriptions_user_idx").on(table.userId),
  statusIdx: index("user_subscriptions_status_idx").on(table.status),
}));

// ==================== PAYMENT METHODS ====================
export const paymentMethods = pgTable("payment_methods", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // upi, credit_card, debit_card, net_banking, wallet
  name: varchar("name").notNull(),
  last4: varchar("last4"),
  upiId: varchar("upi_id"),
  bankName: varchar("bank_name"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("payment_methods_user_idx").on(table.userId),
}));

// ==================== TRANSACTIONS ====================
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // subscription, booking, penalty, refund, reward
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("completed"), // completed, pending, failed, refunded
  description: text("description"),
  invoiceId: varchar("invoice_id"),
  paymentMethodId: varchar("payment_method_id").references(() => paymentMethods.id),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("transactions_user_idx").on(table.userId),
  typeIdx: index("transactions_type_idx").on(table.type),
  statusIdx: index("transactions_status_idx").on(table.status),
}));

// ==================== PENALTIES ====================
export const penalties = pgTable("penalties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // late_return, no_show, damage, lost_item
  relatedItemId: varchar("related_item_id"),
  relatedItemName: varchar("related_item_name"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  originalDueDate: timestamp("original_due_date"),
  incurredDate: timestamp("incurred_date").default(sql`now()`),
  status: varchar("status").notNull().default("pending"), // pending, paid, waived, disputed
  daysOverdue: integer("days_overdue"),
  description: text("description"),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("penalties_user_idx").on(table.userId),
  statusIdx: index("penalties_status_idx").on(table.status),
}));

// ==================== NOTIFICATIONS ====================
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // due_reminder, renewal, promotion, system, booking
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  actionUrl: varchar("action_url"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("notifications_user_idx").on(table.userId),
  readIdx: index("notifications_read_idx").on(table.read),
}));

// ==================== EVENTS ====================
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  locationId: varchar("location_id").references(() => locations.id),
  eventDate: timestamp("event_date").notNull(),
  startTime: varchar("start_time").notNull(),
  endTime: varchar("end_time").notNull(),
  capacity: integer("capacity"),
  registeredCount: integer("registered_count").default(0),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  image: varchar("image"),
  category: varchar("category"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  locationIdx: index("events_location_idx").on(table.locationId),
  dateIdx: index("events_date_idx").on(table.eventDate),
}));

// ==================== EVENT REGISTRATIONS ====================
export const eventRegistrations = pgTable("event_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  eventId: varchar("event_id").notNull().references(() => events.id),
  status: varchar("status").notNull().default("registered"), // registered, attended, cancelled
  registeredAt: timestamp("registered_at").default(sql`now()`),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("event_registrations_user_idx").on(table.userId),
  eventIdx: index("event_registrations_event_idx").on(table.eventId),
}));

// ==================== REWARDS ====================
export const rewards = pgTable("rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  points: integer("points").default(0),
  tier: varchar("tier").default("bronze"), // bronze, silver, gold, platinum
  totalEarned: integer("total_earned").default(0),
  totalRedeemed: integer("total_redeemed").default(0),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("rewards_user_idx").on(table.userId),
}));

// ==================== ACHIEVEMENTS ====================
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  icon: varchar("icon"),
  category: varchar("category").notNull(), // productivity, consistency, social, financial
  rarity: varchar("rarity").notNull().default("common"), // common, rare, epic, legendary
  criteria: jsonb("criteria").$type<Record<string, any>>(),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// ==================== USER ACHIEVEMENTS ====================
export const userAchievements = pgTable("user_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  achievementId: varchar("achievement_id").notNull().references(() => achievements.id),
  earnedAt: timestamp("earned_at").default(sql`now()`),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("user_achievements_user_idx").on(table.userId),
  achievementIdx: index("user_achievements_achievement_idx").on(table.achievementId),
}));

// ==================== USAGE ANALYTICS ====================
export const usageAnalytics = pgTable("usage_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  period: varchar("period").notNull(), // e.g., "2026-04"
  totalHoursStudied: integer("total_hours_studied").default(0),
  totalBookings: integer("total_bookings").default(0),
  booksBorrowed: integer("books_borrowed").default(0),
  eventsAttended: integer("events_attended").default(0),
  moneySaved: decimal("money_saved", { precision: 10, scale: 2 }).default("0"),
  productivityScore: integer("productivity_score").default(0),
  streakDays: integer("streak_days").default(0),
  focusTimeBreakdown: jsonb("focus_time_breakdown").$type<{
    deepWork: number;
    collaborative: number;
    reading: number;
  }>(),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("usage_analytics_user_idx").on(table.userId),
  periodIdx: index("usage_analytics_period_idx").on(table.period),
}));

// ==================== FLOOR PLANS ====================
export const floorPlans = pgTable("floor_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  locationId: varchar("location_id").notNull().references(() => locations.id),
  floor: integer("floor").notNull(),
  name: varchar("name").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  zones: jsonb("zones").$type<Array<{
    id: string;
    name: string;
    type: string;
    coordinates: { x: number; y: number; width: number; height: number };
    color: string;
  }>>(),
  facilities: jsonb("facilities").$type<Array<{
    id: string;
    name: string;
    type: string;
    coordinates: { x: number; y: number };
    icon: string;
  }>>(),
  createdAt: timestamp("created_at").default(sql`now()`),
}, (table) => ({
  locationIdx: index("floor_plans_location_idx").on(table.locationId),
}));

// ==================== BLOG POSTS ====================
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: varchar("author").notNull(),
  category: varchar("category"),
  tags: jsonb("tags").$type<string[]>().default([]),
  image: varchar("image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
}, (table) => ({
  slugIdx: index("blog_posts_slug_idx").on(table.slug),
  publishedIdx: index("blog_posts_published_idx").on(table.published),
}));

// ==================== SUPPORT TICKETS ====================
export const supportTickets = pgTable("support_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subject: varchar("subject").notNull(),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("open"), // open, in_progress, resolved, closed
  priority: varchar("priority").default("normal"), // low, normal, high, urgent
  category: varchar("category"),
  assignedTo: varchar("assigned_to"),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
}, (table) => ({
  userIdx: index("support_tickets_user_idx").on(table.userId),
  statusIdx: index("support_tickets_status_idx").on(table.status),
}));

// ==================== Insert Schemas ====================
export const insertLocationSchema = createInsertSchema(locations);
export const insertSeatSchema = createInsertSchema(seats);
export const insertSeatBookingSchema = createInsertSchema(seatBookings);
export const insertBookSchema = createInsertSchema(books);
export const insertBookLocationSchema = createInsertSchema(bookLocations);
export const insertBookLoanSchema = createInsertSchema(bookLoans);
export const insertBookReservationSchema = createInsertSchema(bookReservations);
export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans);
export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions);
export const insertPaymentMethodSchema = createInsertSchema(paymentMethods);
export const insertTransactionSchema = createInsertSchema(transactions);
export const insertPenaltySchema = createInsertSchema(penalties);
export const insertNotificationSchema = createInsertSchema(notifications);
export const insertEventSchema = createInsertSchema(events);
export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations);
export const insertRewardSchema = createInsertSchema(rewards);
export const insertAchievementSchema = createInsertSchema(achievements);
export const insertUserAchievementSchema = createInsertSchema(userAchievements);
export const insertUsageAnalyticsSchema = createInsertSchema(usageAnalytics);
export const insertFloorPlanSchema = createInsertSchema(floorPlans);
export const insertBlogPostSchema = createInsertSchema(blogPosts);
export const insertSupportTicketSchema = createInsertSchema(supportTickets);

// ==================== Type Exports ====================
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLocation = typeof locations.$inferInsert;
export type Location = typeof locations.$inferSelect;

export type InsertSeat = typeof seats.$inferInsert;
export type Seat = typeof seats.$inferSelect;

export type InsertSeatBooking = typeof seatBookings.$inferInsert;
export type SeatBooking = typeof seatBookings.$inferSelect;

export type InsertBook = typeof books.$inferInsert;
export type Book = typeof books.$inferSelect;

export type InsertBookLocation = typeof bookLocations.$inferInsert;
export type BookLocation = typeof bookLocations.$inferSelect;

export type InsertBookLoan = typeof bookLoans.$inferInsert;
export type BookLoan = typeof bookLoans.$inferSelect;

export type InsertBookReservation = typeof bookReservations.$inferInsert;
export type BookReservation = typeof bookReservations.$inferSelect;

export type InsertSubscriptionPlan = typeof subscriptionPlans.$inferInsert;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

export type InsertUserSubscription = typeof userSubscriptions.$inferInsert;
export type UserSubscription = typeof userSubscriptions.$inferSelect;

export type InsertPaymentMethod = typeof paymentMethods.$inferInsert;
export type PaymentMethod = typeof paymentMethods.$inferSelect;

export type InsertTransaction = typeof transactions.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;

export type InsertPenalty = typeof penalties.$inferInsert;
export type Penalty = typeof penalties.$inferSelect;

export type InsertNotification = typeof notifications.$inferInsert;
export type Notification = typeof notifications.$inferSelect;

export type InsertEvent = typeof events.$inferInsert;
export type Event = typeof events.$inferSelect;

export type InsertEventRegistration = typeof eventRegistrations.$inferInsert;
export type EventRegistration = typeof eventRegistrations.$inferSelect;

export type InsertReward = typeof rewards.$inferInsert;
export type Reward = typeof rewards.$inferSelect;

export type InsertAchievement = typeof achievements.$inferInsert;
export type Achievement = typeof achievements.$inferSelect;

export type InsertUserAchievement = typeof userAchievements.$inferInsert;
export type UserAchievement = typeof userAchievements.$inferSelect;

export type InsertUsageAnalytics = typeof usageAnalytics.$inferInsert;
export type UsageAnalytics = typeof usageAnalytics.$inferSelect;

export type InsertFloorPlan = typeof floorPlans.$inferInsert;
export type FloorPlan = typeof floorPlans.$inferSelect;

export type InsertBlogPost = typeof blogPosts.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertSupportTicket = typeof supportTickets.$inferInsert;
export type SupportTicket = typeof supportTickets.$inferSelect;