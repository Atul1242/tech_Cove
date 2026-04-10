import { db, schema } from "./db";
import { eq, and, or, gt, lt, gte, lte, like, ilike, inArray, desc, asc, count, sum, sql } from "drizzle-orm";
import {
  users,
  locations,
  seats,
  seatBookings,
  books,
  bookLocations,
  bookLoans,
  bookReservations,
  subscriptionPlans,
  userSubscriptions,
  paymentMethods,
  transactions,
  penalties,
  notifications,
  events,
  eventRegistrations,
  rewards,
  achievements,
  userAchievements,
  usageAnalytics,
  floorPlans,
  blogPosts,
  supportTickets,
  type User,
  type InsertUser,
  type Location,
  type InsertLocation,
  type Seat,
  type InsertSeat,
  type SeatBooking,
  type InsertSeatBooking,
  type Book,
  type InsertBook,
  type BookLocation,
  type InsertBookLocation,
  type BookLoan,
  type InsertBookLoan,
  type BookReservation,
  type InsertBookReservation,
  type SubscriptionPlan,
  type InsertSubscriptionPlan,
  type UserSubscription,
  type InsertUserSubscription,
  type PaymentMethod,
  type InsertPaymentMethod,
  type Transaction,
  type InsertTransaction,
  type Penalty,
  type InsertPenalty,
  type Notification,
  type InsertNotification,
  type Event,
  type InsertEvent,
  type EventRegistration,
  type InsertEventRegistration,
  type Reward,
  type InsertReward,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
  type UsageAnalytics,
  type InsertUsageAnalytics,
  type FloorPlan,
  type InsertFloorPlan,
  type BlogPost,
  type InsertBlogPost,
  type SupportTicket,
  type InsertSupportTicket,
} from "@shared/schema";

// ==================== STORAGE INTERFACE ====================
export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

  // Locations
  getLocation(id: string): Promise<Location | undefined>;
  getAllLocations(): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: string, data: Partial<InsertLocation>): Promise<Location | undefined>;
  deleteLocation(id: string): Promise<boolean>;

  // Seats
  getSeat(id: string): Promise<Seat | undefined>;
  getSeatsByLocation(locationId: string): Promise<Seat[]>;
  getSeatsByFloor(locationId: string, floor: number): Promise<Seat[]>;
  getAvailableSeats(locationId?: string): Promise<Seat[]>;
  createSeat(seat: InsertSeat): Promise<Seat>;
  updateSeat(id: string, data: Partial<InsertSeat>): Promise<Seat | undefined>;
  updateSeatStatus(id: string, status: string): Promise<boolean>;

  // Seat Bookings
  getSeatBooking(id: string): Promise<SeatBooking | undefined>;
  getSeatBookingsByUser(userId: string): Promise<SeatBooking[]>;
  getSeatBookingsBySeat(seatId: string, date?: Date): Promise<SeatBooking[]>;
  getUpcomingBookings(userId: string): Promise<SeatBooking[]>;
  createSeatBooking(booking: InsertSeatBooking): Promise<SeatBooking>;
  updateSeatBooking(id: string, data: Partial<InsertSeatBooking>): Promise<SeatBooking | undefined>;
  cancelSeatBooking(id: string): Promise<boolean>;
  checkInBooking(id: string): Promise<boolean>;

  // Books
  getBook(id: string): Promise<Book | undefined>;
  getBookByIsbn(isbn: string): Promise<Book | undefined>;
  getAllBooks(): Promise<Book[]>;
  searchBooks(query: string, filters?: { genre?: string; availability?: string }): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: string, data: Partial<InsertBook>): Promise<Book | undefined>;
  updateBookAvailability(id: string, change: number): Promise<boolean>;

  // Book Locations
  getBookLocation(bookId: string): Promise<BookLocation | undefined>;
  createBookLocation(location: InsertBookLocation): Promise<BookLocation>;

  // Book Loans
  getBookLoan(id: string): Promise<BookLoan | undefined>;
  getBookLoansByUser(userId: string): Promise<BookLoan[]>;
  getActiveBookLoans(userId: string): Promise<BookLoan[]>;
  createBookLoan(loan: InsertBookLoan): Promise<BookLoan>;
  renewBookLoan(id: string): Promise<BookLoan | undefined>;
  returnBook(id: string): Promise<boolean>;

  // Book Reservations
  getBookReservation(id: string): Promise<BookReservation | undefined>;
  getActiveReservationsByUser(userId: string): Promise<BookReservation[]>;
  createBookReservation(reservation: InsertBookReservation): Promise<BookReservation>;
  cancelBookReservation(id: string): Promise<boolean>;

  // Subscription Plans
  getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined>;
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;

  // User Subscriptions
  getUserSubscription(userId: string): Promise<UserSubscription | undefined>;
  createUserSubscription(subscription: InsertUserSubscription): Promise<UserSubscription>;
  updateUserSubscription(id: string, data: Partial<InsertUserSubscription>): Promise<UserSubscription | undefined>;
  cancelUserSubscription(id: string): Promise<boolean>;

  // Payment Methods
  getPaymentMethod(id: string): Promise<PaymentMethod | undefined>;
  getPaymentMethodsByUser(userId: string): Promise<PaymentMethod[]>;
  createPaymentMethod(method: InsertPaymentMethod): Promise<PaymentMethod>;
  setDefaultPaymentMethod(userId: string, methodId: string): Promise<boolean>;
  deletePaymentMethod(id: string): Promise<boolean>;

  // Transactions
  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactionsByUser(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Penalties
  getPenalty(id: string): Promise<Penalty | undefined>;
  getPenaltiesByUser(userId: string): Promise<Penalty[]>;
  getPendingPenalties(userId: string): Promise<Penalty[]>;
  createPenalty(penalty: InsertPenalty): Promise<Penalty>;
  payPenalty(id: string): Promise<boolean>;

  // Notifications
  getNotification(id: string): Promise<Notification | undefined>;
  getNotificationsByUser(userId: string): Promise<Notification[]>;
  getUnreadNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: string): Promise<boolean>;
  markAllNotificationsRead(userId: string): Promise<boolean>;

  // Events
  getEvent(id: string): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, data: Partial<InsertEvent>): Promise<Event | undefined>;

  // Event Registrations
  getEventRegistration(id: string): Promise<EventRegistration | undefined>;
  getEventRegistrationsByUser(userId: string): Promise<EventRegistration[]>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;
  cancelEventRegistration(id: string): Promise<boolean>;

  // Rewards
  getReward(userId: string): Promise<Reward | undefined>;
  createReward(reward: InsertReward): Promise<Reward>;
  updateRewardPoints(userId: string, points: number): Promise<boolean>;

  // Achievements
  getAchievement(id: string): Promise<Achievement | undefined>;
  getAllAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;

  // User Achievements
  getUserAchievements(userId: string): Promise<(UserAchievement & { achievement: Achievement })[]>;
  awardAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;

  // Usage Analytics
  getUsageAnalytics(userId: string, period: string): Promise<UsageAnalytics | undefined>;
  createUsageAnalytics(analytics: InsertUsageAnalytics): Promise<UsageAnalytics>;
  updateUsageAnalytics(id: string, data: Partial<InsertUsageAnalytics>): Promise<UsageAnalytics | undefined>;

  // Floor Plans
  getFloorPlan(locationId: string, floor: number): Promise<FloorPlan | undefined>;
  getFloorPlansByLocation(locationId: string): Promise<FloorPlan[]>;
  createFloorPlan(floorPlan: InsertFloorPlan): Promise<FloorPlan>;

  // Blog Posts
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;

  // Support Tickets
  getSupportTicket(id: string): Promise<SupportTicket | undefined>;
  getSupportTicketsByUser(userId: string): Promise<SupportTicket[]>;
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  updateSupportTicket(id: string, data: Partial<InsertSupportTicket>): Promise<SupportTicket | undefined>;
}

// ==================== DATABASE STORAGE CLASS ====================
export class DatabaseStorage implements IStorage {
  // ==================== USERS ====================
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  // ==================== LOCATIONS ====================
  async getLocation(id: string): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.id, id));
    return location;
  }

  async getAllLocations(): Promise<Location[]> {
    return await db.select().from(locations).where(eq(locations.isActive, true));
  }

  async createLocation(locationData: InsertLocation): Promise<Location> {
    const [location] = await db.insert(locations).values(locationData).returning();
    return location;
  }

  async updateLocation(id: string, data: Partial<InsertLocation>): Promise<Location | undefined> {
    const [location] = await db.update(locations).set(data).where(eq(locations.id, id)).returning();
    return location;
  }

  async deleteLocation(id: string): Promise<boolean> {
    const result = await db.update(locations).set({ isActive: false }).where(eq(locations.id, id)).returning();
    return result.length > 0;
  }

  // ==================== SEATS ====================
  async getSeat(id: string): Promise<Seat | undefined> {
    const [seat] = await db.select().from(seats).where(eq(seats.id, id));
    return seat;
  }

  async getSeatsByLocation(locationId: string): Promise<Seat[]> {
    return await db.select().from(seats).where(eq(seats.locationId, locationId));
  }

  async getSeatsByFloor(locationId: string, floor: number): Promise<Seat[]> {
    return await db.select().from(seats).where(
      and(eq(seats.locationId, locationId), eq(seats.floor, floor))
    );
  }

  async getAvailableSeats(locationId?: string): Promise<Seat[]> {
    const conditions = [eq(seats.status, "available")];
    if (locationId) {
      conditions.push(eq(seats.locationId, locationId));
    }
    return await db.select().from(seats).where(and(...conditions));
  }

  async createSeat(seatData: InsertSeat): Promise<Seat> {
    const [seat] = await db.insert(seats).values(seatData).returning();
    return seat;
  }

  async updateSeat(id: string, data: Partial<InsertSeat>): Promise<Seat | undefined> {
    const [seat] = await db.update(seats).set(data).where(eq(seats.id, id)).returning();
    return seat;
  }

  async updateSeatStatus(id: string, status: string): Promise<boolean> {
    const result = await db.update(seats).set({ status }).where(eq(seats.id, id)).returning();
    return result.length > 0;
  }

  // ==================== SEAT BOOKINGS ====================
  async getSeatBooking(id: string): Promise<SeatBooking | undefined> {
    const [booking] = await db.select().from(seatBookings).where(eq(seatBookings.id, id));
    return booking;
  }

  async getSeatBookingsByUser(userId: string): Promise<SeatBooking[]> {
    return await db.select().from(seatBookings)
      .where(eq(seatBookings.userId, userId))
      .orderBy(desc(seatBookings.bookingDate));
  }

  async getSeatBookingsBySeat(seatId: string, date?: Date): Promise<SeatBooking[]> {
    const conditions = [eq(seatBookings.seatId, seatId)];
    if (date) {
      conditions.push(eq(seatBookings.bookingDate, date));
    }
    return await db.select().from(seatBookings).where(and(...conditions));
  }

  async getUpcomingBookings(userId: string): Promise<SeatBooking[]> {
    const now = new Date();
    return await db.select().from(seatBookings)
      .where(
        and(
          eq(seatBookings.userId, userId),
          gte(seatBookings.bookingDate, now),
          inArray(seatBookings.status, ["confirmed", "pending"])
        )
      )
      .orderBy(asc(seatBookings.bookingDate));
  }

  async createSeatBooking(bookingData: InsertSeatBooking): Promise<SeatBooking> {
    const [booking] = await db.insert(seatBookings).values(bookingData).returning();
    return booking;
  }

  async updateSeatBooking(id: string, data: Partial<InsertSeatBooking>): Promise<SeatBooking | undefined> {
    const [booking] = await db.update(seatBookings).set(data).where(eq(seatBookings.id, id)).returning();
    return booking;
  }

  async cancelSeatBooking(id: string): Promise<boolean> {
    const result = await db.update(seatBookings)
      .set({ status: "cancelled" })
      .where(eq(seatBookings.id, id))
      .returning();
    return result.length > 0;
  }

  async checkInBooking(id: string): Promise<boolean> {
    const result = await db.update(seatBookings)
      .set({ status: "checked-in", checkedInAt: new Date() })
      .where(eq(seatBookings.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== BOOKS ====================
  async getBook(id: string): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book;
  }

  async getBookByIsbn(isbn: string): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.isbn, isbn));
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    return await db.select().from(books);
  }

  async searchBooks(query: string, filters?: { genre?: string; availability?: string }): Promise<Book[]> {
    let queryBuilder = db.select().from(books);
    
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(books.title, `%${query}%`),
          ilike(books.author, `%${query}%`),
          ilike(books.isbn, `%${query}%`)
        )
      );
    }
    
    if (filters?.genre && filters.genre !== "All") {
      conditions.push(eq(books.genre, filters.genre));
    }
    
    if (filters?.availability === "available") {
      conditions.push(gt(books.availableCopies, 0));
    } else if (filters?.availability === "unavailable") {
      conditions.push(eq(books.availableCopies, 0));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(books).where(and(...conditions));
    }
    
    return await db.select().from(books);
  }

  async createBook(bookData: InsertBook): Promise<Book> {
    const [book] = await db.insert(books).values(bookData).returning();
    return book;
  }

  async updateBook(id: string, data: Partial<InsertBook>): Promise<Book | undefined> {
    const [book] = await db.update(books).set(data).where(eq(books.id, id)).returning();
    return book;
  }

  async updateBookAvailability(id: string, change: number): Promise<boolean> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    if (!book) return false;
    
    const newAvailable = Math.max(0, Math.min(book.totalCopies, book.availableCopies + change));
    const status = newAvailable === 0 ? "unavailable" : newAvailable < book.totalCopies ? "limited" : "available";
    
    const result = await db.update(books)
      .set({ availableCopies: newAvailable, status })
      .where(eq(books.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== BOOK LOCATIONS ====================
  async getBookLocation(bookId: string): Promise<BookLocation | undefined> {
    const [location] = await db.select().from(bookLocations).where(eq(bookLocations.bookId, bookId));
    return location;
  }

  async createBookLocation(locationData: InsertBookLocation): Promise<BookLocation> {
    const [location] = await db.insert(bookLocations).values(locationData).returning();
    return location;
  }

  // ==================== BOOK LOANS ====================
  async getBookLoan(id: string): Promise<BookLoan | undefined> {
    const [loan] = await db.select().from(bookLoans).where(eq(bookLoans.id, id));
    return loan;
  }

  async getBookLoansByUser(userId: string): Promise<BookLoan[]> {
    return await db.select().from(bookLoans)
      .where(eq(bookLoans.userId, userId))
      .orderBy(desc(bookLoans.borrowDate));
  }

  async getActiveBookLoans(userId: string): Promise<BookLoan[]> {
    return await db.select().from(bookLoans)
      .where(and(eq(bookLoans.userId, userId), eq(bookLoans.status, "active")));
  }

  async createBookLoan(loanData: InsertBookLoan): Promise<BookLoan> {
    const [loan] = await db.insert(bookLoans).values(loanData).returning();
    return loan;
  }

  async renewBookLoan(id: string): Promise<BookLoan | undefined> {
    const [existingLoan] = await db.select().from(bookLoans).where(eq(bookLoans.id, id));
    if (!existingLoan || existingLoan.renewalsLeft <= 0) return undefined;
    
    const newDueDate = new Date(existingLoan.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 14);
    
    const [loan] = await db.update(bookLoans)
      .set({ dueDate: newDueDate, renewalsLeft: existingLoan.renewalsLeft - 1 })
      .where(eq(bookLoans.id, id))
      .returning();
    return loan;
  }

  async returnBook(id: string): Promise<boolean> {
    const result = await db.update(bookLoans)
      .set({ status: "returned", returnDate: new Date() })
      .where(eq(bookLoans.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== BOOK RESERVATIONS ====================
  async getBookReservation(id: string): Promise<BookReservation | undefined> {
    const [reservation] = await db.select().from(bookReservations).where(eq(bookReservations.id, id));
    return reservation;
  }

  async getActiveReservationsByUser(userId: string): Promise<BookReservation[]> {
    return await db.select().from(bookReservations)
      .where(and(eq(bookReservations.userId, userId), eq(bookReservations.status, "active")));
  }

  async createBookReservation(reservationData: InsertBookReservation): Promise<BookReservation> {
    const [reservation] = await db.insert(bookReservations).values(reservationData).returning();
    return reservation;
  }

  async cancelBookReservation(id: string): Promise<boolean> {
    const result = await db.update(bookReservations)
      .set({ status: "cancelled" })
      .where(eq(bookReservations.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== SUBSCRIPTION PLANS ====================
  async getSubscriptionPlan(id: string): Promise<SubscriptionPlan | undefined> {
    const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, id));
    return plan;
  }

  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true));
  }

  async createSubscriptionPlan(planData: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const [plan] = await db.insert(subscriptionPlans).values(planData).returning();
    return plan;
  }

  // ==================== USER SUBSCRIPTIONS ====================
  async getUserSubscription(userId: string): Promise<UserSubscription | undefined> {
    const [subscription] = await db.select().from(userSubscriptions)
      .where(and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.status, "active")));
    return subscription;
  }

  async createUserSubscription(subscriptionData: InsertUserSubscription): Promise<UserSubscription> {
    const [subscription] = await db.insert(userSubscriptions).values(subscriptionData).returning();
    return subscription;
  }

  async updateUserSubscription(id: string, data: Partial<InsertUserSubscription>): Promise<UserSubscription | undefined> {
    const [subscription] = await db.update(userSubscriptions)
      .set(data)
      .where(eq(userSubscriptions.id, id))
      .returning();
    return subscription;
  }

  async cancelUserSubscription(id: string): Promise<boolean> {
    const result = await db.update(userSubscriptions)
      .set({ status: "cancelled", autoRenew: false })
      .where(eq(userSubscriptions.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== PAYMENT METHODS ====================
  async getPaymentMethod(id: string): Promise<PaymentMethod | undefined> {
    const [method] = await db.select().from(paymentMethods).where(eq(paymentMethods.id, id));
    return method;
  }

  async getPaymentMethodsByUser(userId: string): Promise<PaymentMethod[]> {
    return await db.select().from(paymentMethods).where(eq(paymentMethods.userId, userId));
  }

  async createPaymentMethod(methodData: InsertPaymentMethod): Promise<PaymentMethod> {
    const [method] = await db.insert(paymentMethods).values(methodData).returning();
    return method;
  }

  async setDefaultPaymentMethod(userId: string, methodId: string): Promise<boolean> {
    await db.update(paymentMethods)
      .set({ isDefault: false })
      .where(eq(paymentMethods.userId, userId));
    
    const result = await db.update(paymentMethods)
      .set({ isDefault: true })
      .where(eq(paymentMethods.id, methodId))
      .returning();
    return result.length > 0;
  }

  async deletePaymentMethod(id: string): Promise<boolean> {
    const result = await db.delete(paymentMethods).where(eq(paymentMethods.id, id)).returning();
    return result.length > 0;
  }

  // ==================== TRANSACTIONS ====================
  async getTransaction(id: string): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction;
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(transactionData).returning();
    return transaction;
  }

  // ==================== PENALTIES ====================
  async getPenalty(id: string): Promise<Penalty | undefined> {
    const [penalty] = await db.select().from(penalties).where(eq(penalties.id, id));
    return penalty;
  }

  async getPenaltiesByUser(userId: string): Promise<Penalty[]> {
    return await db.select().from(penalties)
      .where(eq(penalties.userId, userId))
      .orderBy(desc(penalties.createdAt));
  }

  async getPendingPenalties(userId: string): Promise<Penalty[]> {
    return await db.select().from(penalties)
      .where(and(eq(penalties.userId, userId), eq(penalties.status, "pending")));
  }

  async createPenalty(penaltyData: InsertPenalty): Promise<Penalty> {
    const [penalty] = await db.insert(penalties).values(penaltyData).returning();
    return penalty;
  }

  async payPenalty(id: string): Promise<boolean> {
    const result = await db.update(penalties)
      .set({ status: "paid" })
      .where(eq(penalties.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== NOTIFICATIONS ====================
  async getNotification(id: string): Promise<Notification | undefined> {
    const [notification] = await db.select().from(notifications).where(eq(notifications.id, id));
    return notification;
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return await db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return await db.select().from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.read, false)))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const [notification] = await db.insert(notifications).values(notificationData).returning();
    return notification;
  }

  async markNotificationRead(id: string): Promise<boolean> {
    const result = await db.update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, id))
      .returning();
    return result.length > 0;
  }

  async markAllNotificationsRead(userId: string): Promise<boolean> {
    const result = await db.update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId))
      .returning();
    return result.length > 0;
  }

  // ==================== EVENTS ====================
  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events).where(eq(events.isActive, true));
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return await db.select().from(events)
      .where(and(eq(events.isActive, true), gte(events.eventDate, now)))
      .orderBy(asc(events.eventDate));
  }

  async createEvent(eventData: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(eventData).returning();
    return event;
  }

  async updateEvent(id: string, data: Partial<InsertEvent>): Promise<Event | undefined> {
    const [event] = await db.update(events).set(data).where(eq(events.id, id)).returning();
    return event;
  }

  // ==================== EVENT REGISTRATIONS ====================
  async getEventRegistration(id: string): Promise<EventRegistration | undefined> {
    const [registration] = await db.select().from(eventRegistrations).where(eq(eventRegistrations.id, id));
    return registration;
  }

  async getEventRegistrationsByUser(userId: string): Promise<EventRegistration[]> {
    return await db.select().from(eventRegistrations)
      .where(eq(eventRegistrations.userId, userId));
  }

  async createEventRegistration(registrationData: InsertEventRegistration): Promise<EventRegistration> {
    const [registration] = await db.insert(eventRegistrations).values(registrationData).returning();
    return registration;
  }

  async cancelEventRegistration(id: string): Promise<boolean> {
    const result = await db.update(eventRegistrations)
      .set({ status: "cancelled" })
      .where(eq(eventRegistrations.id, id))
      .returning();
    return result.length > 0;
  }

  // ==================== REWARDS ====================
  async getReward(userId: string): Promise<Reward | undefined> {
    const [reward] = await db.select().from(rewards).where(eq(rewards.userId, userId));
    return reward;
  }

  async createReward(rewardData: InsertReward): Promise<Reward> {
    const [reward] = await db.insert(rewards).values(rewardData).returning();
    return reward;
  }

  async updateRewardPoints(userId: string, points: number): Promise<boolean> {
    const result = await db.update(rewards)
      .set({ 
        points: sql`${rewards.points} + ${points}`,
        totalEarned: sql`${rewards.totalEarned} + ${points}`,
        updatedAt: new Date()
      })
      .where(eq(rewards.userId, userId))
      .returning();
    return result.length > 0;
  }

  // ==================== ACHIEVEMENTS ====================
  async getAchievement(id: string): Promise<Achievement | undefined> {
    const [achievement] = await db.select().from(achievements).where(eq(achievements.id, id));
    return achievement;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async createAchievement(achievementData: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db.insert(achievements).values(achievementData).returning();
    return achievement;
  }

  // ==================== USER ACHIEVEMENTS ====================
  async getUserAchievements(userId: string): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const result = await db
      .select({
        id: userAchievements.id,
        userId: userAchievements.userId,
        achievementId: userAchievements.achievementId,
        earnedAt: userAchievements.earnedAt,
        createdAt: userAchievements.createdAt,
        achievement: achievements,
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId));
    
    return result as (UserAchievement & { achievement: Achievement })[];
  }

  async awardAchievement(userAchievementData: InsertUserAchievement): Promise<UserAchievement> {
    const [userAchievement] = await db.insert(userAchievements).values(userAchievementData).returning();
    return userAchievement;
  }

  // ==================== USAGE ANALYTICS ====================
  async getUsageAnalytics(userId: string, period: string): Promise<UsageAnalytics | undefined> {
    const [analytics] = await db.select().from(usageAnalytics)
      .where(and(eq(usageAnalytics.userId, userId), eq(usageAnalytics.period, period)));
    return analytics;
  }

  async createUsageAnalytics(analyticsData: InsertUsageAnalytics): Promise<UsageAnalytics> {
    const [analytics] = await db.insert(usageAnalytics).values(analyticsData).returning();
    return analytics;
  }

  async updateUsageAnalytics(id: string, data: Partial<InsertUsageAnalytics>): Promise<UsageAnalytics | undefined> {
    const [analytics] = await db.update(usageAnalytics)
      .set(data)
      .where(eq(usageAnalytics.id, id))
      .returning();
    return analytics;
  }

  // ==================== FLOOR PLANS ====================
  async getFloorPlan(locationId: string, floor: number): Promise<FloorPlan | undefined> {
    const [floorPlan] = await db.select().from(floorPlans)
      .where(and(eq(floorPlans.locationId, locationId), eq(floorPlans.floor, floor)));
    return floorPlan;
  }

  async getFloorPlansByLocation(locationId: string): Promise<FloorPlan[]> {
    return await db.select().from(floorPlans).where(eq(floorPlans.locationId, locationId));
  }

  async createFloorPlan(floorPlanData: InsertFloorPlan): Promise<FloorPlan> {
    const [floorPlan] = await db.insert(floorPlans).values(floorPlanData).returning();
    return floorPlan;
  }

  // ==================== BLOG POSTS ====================
  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async createBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(postData).returning();
    return post;
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db.update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  // ==================== SUPPORT TICKETS ====================
  async getSupportTicket(id: string): Promise<SupportTicket | undefined> {
    const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
    return ticket;
  }

  async getSupportTicketsByUser(userId: string): Promise<SupportTicket[]> {
    return await db.select().from(supportTickets)
      .where(eq(supportTickets.userId, userId))
      .orderBy(desc(supportTickets.createdAt));
  }

  async createSupportTicket(ticketData: InsertSupportTicket): Promise<SupportTicket> {
    const [ticket] = await db.insert(supportTickets).values(ticketData).returning();
    return ticket;
  }

  async updateSupportTicket(id: string, data: Partial<InsertSupportTicket>): Promise<SupportTicket | undefined> {
    const [ticket] = await db.update(supportTickets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(supportTickets.id, id))
      .returning();
    return ticket;
  }
}

// Export the database storage instance
export const storage = new DatabaseStorage();