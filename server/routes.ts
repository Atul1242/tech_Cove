import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertLocationSchema, 
  insertSeatSchema, 
  insertSeatBookingSchema,
  insertBookSchema,
  insertBookLocationSchema,
  insertBookLoanSchema,
  insertBookReservationSchema,
  insertSubscriptionPlanSchema,
  insertUserSubscriptionSchema,
  insertPaymentMethodSchema,
  insertTransactionSchema,
  insertPenaltySchema,
  insertNotificationSchema,
  insertEventSchema,
  insertEventRegistrationSchema,
  insertRewardSchema,
  insertAchievementSchema,
  insertUserAchievementSchema,
  insertUsageAnalyticsSchema,
  insertFloorPlanSchema,
  insertBlogPostSchema,
  insertSupportTicketSchema
} from "@shared/schema";

// Helper function to handle async routes
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ==================== AUTH ROUTES ====================
  
  // Login
  app.post("/api/auth/login", asyncHandler(async (req: any, res: any) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user = await storage.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  }));
  
  // Signup
  app.post("/api/auth/signup", asyncHandler(async (req: any, res: any) => {
    const userData = insertUserSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    const user = await storage.createUser(userData);
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  }));
  
  // ==================== USER ROUTES ====================
  
  // Get current user
  app.get("/api/users/me", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  }));
  
  // Update user
  app.patch("/api/users/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await storage.updateUser(id, updates);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  }));
  
  // ==================== LOCATION ROUTES ====================
  
  // Get all locations
  app.get("/api/locations", asyncHandler(async (req: any, res: any) => {
    const locations = await storage.getAllLocations();
    res.json(locations);
  }));
  
  // Get location by ID
  app.get("/api/locations/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const location = await storage.getLocation(id);
    
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    
    res.json(location);
  }));
  
  // Create location (admin)
  app.post("/api/locations", asyncHandler(async (req: any, res: any) => {
    const locationData = insertLocationSchema.parse(req.body);
    const location = await storage.createLocation(locationData);
    res.status(201).json(location);
  }));
  
  // ==================== SEAT ROUTES ====================
  
  // Get seats by location
  app.get("/api/locations/:locationId/seats", asyncHandler(async (req: any, res: any) => {
    const { locationId } = req.params;
    const { floor } = req.query;
    
    let seats;
    if (floor) {
      seats = await storage.getSeatsByFloor(locationId, parseInt(floor as string));
    } else {
      seats = await storage.getSeatsByLocation(locationId);
    }
    
    res.json(seats);
  }));
  
  // Get available seats
  app.get("/api/seats/available", asyncHandler(async (req: any, res: any) => {
    const { locationId } = req.query;
    const seats = await storage.getAvailableSeats(locationId as string);
    res.json(seats);
  }));
  
  // Get seat by ID
  app.get("/api/seats/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const seat = await storage.getSeat(id);
    
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    
    res.json(seat);
  }));
  
  // ==================== SEAT BOOKING ROUTES ====================
  
  // Get user's bookings
  app.get("/api/bookings", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const bookings = await storage.getSeatBookingsByUser(userId);
    res.json(bookings);
  }));
  
  // Get upcoming bookings
  app.get("/api/bookings/upcoming", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const bookings = await storage.getUpcomingBookings(userId);
    res.json(bookings);
  }));
  
  // Get booking by ID
  app.get("/api/bookings/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const booking = await storage.getSeatBooking(id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.json(booking);
  }));
  
  // Create booking
  app.post("/api/bookings", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const bookingData = insertSeatBookingSchema.parse({
      ...req.body,
      userId
    });
    
    const booking = await storage.createSeatBooking(bookingData);
    
    // Update seat status
    await storage.updateSeatStatus(bookingData.seatId, "reserved");
    
    res.status(201).json(booking);
  }));
  
  // Cancel booking
  app.patch("/api/bookings/:id/cancel", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.cancelSeatBooking(id);
    
    if (!success) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Get booking to update seat status
    const booking = await storage.getSeatBooking(id);
    if (booking) {
      await storage.updateSeatStatus(booking.seatId, "available");
    }
    
    res.json({ message: "Booking cancelled successfully" });
  }));
  
  // Check-in
  app.patch("/api/bookings/:id/checkin", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.checkInBooking(id);
    
    if (!success) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Update seat status
    const booking = await storage.getSeatBooking(id);
    if (booking) {
      await storage.updateSeatStatus(booking.seatId, "occupied");
    }
    
    res.json({ message: "Check-in successful" });
  }));
  
  // ==================== BOOK ROUTES ====================
  
  // Get all books
  app.get("/api/books", asyncHandler(async (req: any, res: any) => {
    const { q, genre, availability } = req.query;
    
    let books;
    if (q || genre || availability) {
      books = await storage.searchBooks(q as string || "", {
        genre: genre as string,
        availability: availability as string
      });
    } else {
      books = await storage.getAllBooks();
    }
    
    res.json(books);
  }));
  
  // Get book by ID
  app.get("/api/books/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const book = await storage.getBook(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Get book location
    const location = await storage.getBookLocation(id);
    
    res.json({ ...book, location });
  }));
  
  // ==================== BOOK LOAN ROUTES ====================
  
  // Get user's book loans
  app.get("/api/loans", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const loans = await storage.getBookLoansByUser(userId);
    res.json(loans);
  }));
  
  // Get active book loans
  app.get("/api/loans/active", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const loans = await storage.getActiveBookLoans(userId);
    res.json(loans);
  }));
  
  // Renew book loan
  app.patch("/api/loans/:id/renew", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const loan = await storage.renewBookLoan(id);
    
    if (!loan) {
      return res.status(400).json({ message: "Cannot renew loan" });
    }
    
    res.json(loan);
  }));
  
  // Return book
  app.patch("/api/loans/:id/return", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.returnBook(id);
    
    if (!success) {
      return res.status(404).json({ message: "Loan not found" });
    }
    
    // Update book availability
    const loan = await storage.getBookLoan(id);
    if (loan) {
      await storage.updateBookAvailability(loan.bookId, 1);
    }
    
    res.json({ message: "Book returned successfully" });
  }));
  
  // ==================== BOOK RESERVATION ROUTES ====================
  
  // Get user's reservations
  app.get("/api/reservations", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const reservations = await storage.getActiveReservationsByUser(userId);
    res.json(reservations);
  }));
  
  // Create reservation
  app.post("/api/reservations", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const reservationData = insertBookReservationSchema.parse({
      ...req.body,
      userId
    });
    
    const reservation = await storage.createBookReservation(reservationData);
    res.status(201).json(reservation);
  }));
  
  // Cancel reservation
  app.patch("/api/reservations/:id/cancel", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.cancelBookReservation(id);
    
    if (!success) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    
    res.json({ message: "Reservation cancelled successfully" });
  }));
  
  // ==================== SUBSCRIPTION ROUTES ====================
  
  // Get all subscription plans
  app.get("/api/subscriptions/plans", asyncHandler(async (req: any, res: any) => {
    const plans = await storage.getAllSubscriptionPlans();
    res.json(plans);
  }));
  
  // Get user's subscription
  app.get("/api/subscriptions/my", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const subscription = await storage.getUserSubscription(userId);
    res.json(subscription);
  }));
  
  // Create subscription
  app.post("/api/subscriptions", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const subscriptionData = insertUserSubscriptionSchema.parse({
      ...req.body,
      userId
    });
    
    const subscription = await storage.createUserSubscription(subscriptionData);
    res.status(201).json(subscription);
  }));
  
  // Cancel subscription
  app.patch("/api/subscriptions/:id/cancel", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.cancelUserSubscription(id);
    
    if (!success) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    
    res.json({ message: "Subscription cancelled successfully" });
  }));
  
  // ==================== PAYMENT METHOD ROUTES ====================
  
  // Get user's payment methods
  app.get("/api/payment-methods", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const methods = await storage.getPaymentMethodsByUser(userId);
    res.json(methods);
  }));
  
  // Add payment method
  app.post("/api/payment-methods", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const methodData = insertPaymentMethodSchema.parse({
      ...req.body,
      userId
    });
    
    const method = await storage.createPaymentMethod(methodData);
    res.status(201).json(method);
  }));
  
  // Set default payment method
  app.patch("/api/payment-methods/:id/default", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;
    
    const success = await storage.setDefaultPaymentMethod(userId, id);
    
    if (!success) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    
    res.json({ message: "Default payment method updated" });
  }));
  
  // Delete payment method
  app.delete("/api/payment-methods/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.deletePaymentMethod(id);
    
    if (!success) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    
    res.json({ message: "Payment method deleted" });
  }));
  
  // ==================== TRANSACTION ROUTES ====================
  
  // Get user's transactions
  app.get("/api/transactions", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const transactions = await storage.getTransactionsByUser(userId);
    res.json(transactions);
  }));
  
  // Create transaction
  app.post("/api/transactions", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const transactionData = insertTransactionSchema.parse({
      ...req.body,
      userId
    });
    
    const transaction = await storage.createTransaction(transactionData);
    res.status(201).json(transaction);
  }));
  
  // ==================== PENALTY ROUTES ====================
  
  // Get user's penalties
  app.get("/api/penalties", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const penalties = await storage.getPenaltiesByUser(userId);
    res.json(penalties);
  }));
  
  // Get pending penalties
  app.get("/api/penalties/pending", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const penalties = await storage.getPendingPenalties(userId);
    res.json(penalties);
  }));
  
  // Pay penalty
  app.patch("/api/penalties/:id/pay", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.payPenalty(id);
    
    if (!success) {
      return res.status(404).json({ message: "Penalty not found" });
    }
    
    res.json({ message: "Penalty paid successfully" });
  }));
  
  // ==================== NOTIFICATION ROUTES ====================
  
  // Get user's notifications
  app.get("/api/notifications", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const notifications = await storage.getNotificationsByUser(userId);
    res.json(notifications);
  }));
  
  // Get unread notifications
  app.get("/api/notifications/unread", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const notifications = await storage.getUnreadNotifications(userId);
    res.json(notifications);
  }));
  
  // Mark notification as read
  app.patch("/api/notifications/:id/read", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const success = await storage.markNotificationRead(id);
    
    if (!success) {
      return res.status(404).json({ message: "Notification not found" });
    }
    
    res.json({ message: "Notification marked as read" });
  }));
  
  // Mark all notifications as read
  app.patch("/api/notifications/read-all", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    await storage.markAllNotificationsRead(userId);
    res.json({ message: "All notifications marked as read" });
  }));
  
  // ==================== EVENT ROUTES ====================
  
  // Get all events
  app.get("/api/events", asyncHandler(async (req: any, res: any) => {
    const events = await storage.getAllEvents();
    res.json(events);
  }));
  
  // Get upcoming events
  app.get("/api/events/upcoming", asyncHandler(async (req: any, res: any) => {
    const events = await storage.getUpcomingEvents();
    res.json(events);
  }));
  
  // Get event by ID
  app.get("/api/events/:id", asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const event = await storage.getEvent(id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    res.json(event);
  }));
  
  // Register for event
  app.post("/api/events/:id/register", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const registration = await storage.createEventRegistration({
      userId,
      eventId: id,
      status: "registered"
    });
    
    res.status(201).json(registration);
  }));
  
  // ==================== REWARD ROUTES ====================
  
  // Get user's rewards
  app.get("/api/rewards", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const reward = await storage.getReward(userId);
    res.json(reward);
  }));
  
  // Get user's achievements
  app.get("/api/achievements", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const achievements = await storage.getUserAchievements(userId);
    res.json(achievements);
  }));
  
  // ==================== ANALYTICS ROUTES ====================
  
  // Get user's analytics
  app.get("/api/analytics", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    const { period } = req.query;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const analytics = await storage.getUsageAnalytics(userId, period as string || getCurrentPeriod());
    res.json(analytics);
  }));
  
  // ==================== FLOOR PLAN ROUTES ====================
  
  // Get floor plans by location
  app.get("/api/locations/:locationId/floor-plans", asyncHandler(async (req: any, res: any) => {
    const { locationId } = req.params;
    const floorPlans = await storage.getFloorPlansByLocation(locationId);
    res.json(floorPlans);
  }));
  
  // ==================== BLOG ROUTES ====================
  
  // Get published blog posts
  app.get("/api/blog", asyncHandler(async (req: any, res: any) => {
    const posts = await storage.getPublishedBlogPosts();
    res.json(posts);
  }));
  
  // Get blog post by slug
  app.get("/api/blog/:slug", asyncHandler(async (req: any, res: any) => {
    const { slug } = req.params;
    const post = await storage.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.json(post);
  }));
  
  // ==================== SUPPORT TICKET ROUTES ====================
  
  // Get user's support tickets
  app.get("/api/support-tickets", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const tickets = await storage.getSupportTicketsByUser(userId);
    res.json(tickets);
  }));
  
  // Create support ticket
  app.post("/api/support-tickets", asyncHandler(async (req: any, res: any) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const ticketData = insertSupportTicketSchema.parse({
      ...req.body,
      userId
    });
    
    const ticket = await storage.createSupportTicket(ticketData);
    res.status(201).json(ticket);
  }));
  
  // ==================== ADMIN ROUTES ====================
  
  // Get all users (admin)
  app.get("/api/admin/users", asyncHandler(async (req: any, res: any) => {
    // TODO: Add admin check
    const users = await db.select().from(schema.users);
    res.json(users.map(u => {
      const { password: _, ...userWithoutPassword } = u;
      return userWithoutPassword;
    }));
  }));
  
  // Get all bookings (admin)
  app.get("/api/admin/bookings", asyncHandler(async (req: any, res: any) => {
    // TODO: Add admin check
    const bookings = await db.select().from(schema.seatBookings);
    res.json(bookings);
  }));
  
  // Get dashboard stats (admin)
  app.get("/api/admin/stats", asyncHandler(async (req: any, res: any) => {
    // TODO: Add admin check
    const [userCount] = await db.select({ count: count() }).from(schema.users);
    const [bookingCount] = await db.select({ count: count() }).from(schema.seatBookings);
    const [revenue] = await db.select({ total: sum(schema.transactions.amount) })
      .from(schema.transactions)
      .where(eq(schema.transactions.status, "completed"));
    
    res.json({
      totalUsers: userCount.count,
      totalBookings: bookingCount.count,
      totalRevenue: revenue.total || 0
    });
  }));

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to get current period (YYYY-MM format)
function getCurrentPeriod(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// Import db and eq for admin routes
import { db, schema } from "./db";
import { eq, count, sum } from "drizzle-orm";