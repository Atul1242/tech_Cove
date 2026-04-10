import { config } from "dotenv";
config();

import { db } from "./db";
import {
  subscriptionPlans,
  locations,
  seats,
  books,
  bookLocations,
  achievements,
} from "@shared/schema";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // ==================== SEED SUBSCRIPTION PLANS ====================
    console.log("Creating subscription plans...");
    
    const plans = [
      {
        id: "plan-basic",
        name: "Basic",
        tier: "basic",
        monthlyPrice: "999",
        yearlyPrice: "9999",
        features: [
          "20 hours of study time per month",
          "Access to standard seats",
          "2 book loans per month",
          "Basic amenities",
          "Email support"
        ],
        limits: {
          bookingHoursPerMonth: 20,
          bookLoansPerMonth: 2,
          eventDiscount: 5,
          priorityBooking: false
        },
        isPopular: false
      },
      {
        id: "plan-standard",
        name: "Standard",
        tier: "standard",
        monthlyPrice: "1999",
        yearlyPrice: "19999",
        features: [
          "50 hours of study time per month",
          "Access to all seat types",
          "5 book loans per month",
          "10% event discount",
          "Priority email support",
          "Free coffee vouchers"
        ],
        limits: {
          bookingHoursPerMonth: 50,
          bookLoansPerMonth: 5,
          eventDiscount: 10,
          priorityBooking: false
        },
        isPopular: true
      },
      {
        id: "plan-premium",
        name: "Premium",
        tier: "premium",
        monthlyPrice: "3499",
        yearlyPrice: "34999",
        features: [
          "Unlimited study hours",
          "All locations access",
          "10 book loans per month",
          "20% event discount",
          "Priority booking",
          "Dedicated support",
          "Free printing (50 pages/month)",
          "Locker access"
        ],
        limits: {
          bookingHoursPerMonth: -1,
          bookLoansPerMonth: 10,
          eventDiscount: 20,
          priorityBooking: true
        },
        isPopular: false
      },
      {
        id: "plan-student",
        name: "Student",
        tier: "student",
        monthlyPrice: "799",
        yearlyPrice: "7999",
        features: [
          "30 hours of study time per month",
          "Access to standard & quiet seats",
          "3 book loans per month",
          "15% event discount",
          "Student community access",
          "Exam season bonuses"
        ],
        limits: {
          bookingHoursPerMonth: 30,
          bookLoansPerMonth: 3,
          eventDiscount: 15,
          priorityBooking: false
        },
        isPopular: false
      }
    ];

    for (const plan of plans) {
      await db.insert(subscriptionPlans).values(plan).onConflictDoNothing();
    }
    console.log("✅ Subscription plans created");

    // ==================== SEED LOCATIONS ====================
    console.log("Creating locations...");
    
    const locationsData = [
      {
        id: "loc-delhi-001",
        name: "Delhi Central",
        address: "Connaught Place, Block A",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        description: "Our flagship location in the heart of Delhi, offering premium study spaces with state-of-the-art facilities.",
        amenities: ["High-Speed WiFi", "Power Outlets", "Cafe", "Printing", "Lockers", "Parking"],
        images: [
          "https://images.unsplash.com/photo-1497366210344-2d02b6c9ec32?w=800",
          "https://images.unsplash.com/photo-1497366810736-570667a47c29?w=800"
        ],
        totalSeats: 48,
        availableSeats: 32,
        openingTime: "06:00",
        closingTime: "22:00"
      },
      {
        id: "loc-mumbai-001",
        name: "Mumbai Bandra",
        address: "Bandra Kurla Complex, Tower B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400051",
        description: "A modern study space in Mumbai's business district, perfect for professionals and students alike.",
        amenities: ["High-Speed WiFi", "Power Outlets", "Cafe", "Meeting Rooms", "Parking"],
        images: [
          "https://images.unsplash.com/photo-1497366754035-f59c6c58c24d?w=800"
        ],
        totalSeats: 36,
        availableSeats: 24,
        openingTime: "07:00",
        closingTime: "23:00"
      },
      {
        id: "loc-bangalore-001",
        name: "Bangalore Koramangala",
        address: "Koramangala 4th Block",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560034",
        description: "A vibrant study space in Bangalore's tech hub, designed for focused work and collaboration.",
        amenities: ["High-Speed WiFi", "Power Outlets", "Cafe", "Gaming Zone", "Parking"],
        images: [
          "https://images.unsplash.com/photo-1497366210344-2d02b6c9ec32?w=800"
        ],
        totalSeats: 42,
        availableSeats: 28,
        openingTime: "06:00",
        closingTime: "22:00"
      }
    ];

    for (const location of locationsData) {
      await db.insert(locations).values(location).onConflictDoNothing();
    }
    console.log("✅ Locations created");

    // ==================== SEED SEATS ====================
    console.log("Creating seats...");
    
    const seatsData = [
      // Floor 1 - Delhi Central
      { id: "seat-d1-001", seatNumber: "A1-01", type: "standard", floor: 1, zone: "Zone A", status: "available", hourlyRate: "50", hasMonitor: false, hasPowerOutlet: true, isQuietZone: false, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 50, y: 80, width: 40, height: 30 } },
      { id: "seat-d1-002", seatNumber: "A1-02", type: "standard", floor: 1, zone: "Zone A", status: "occupied", hourlyRate: "75", hasMonitor: true, hasPowerOutlet: true, isQuietZone: false, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Dual Monitors"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 100, y: 80, width: 40, height: 30 } },
      { id: "seat-d1-003", seatNumber: "A1-03", type: "standing", floor: 1, zone: "Zone A", status: "available", hourlyRate: "60", hasMonitor: false, hasPowerOutlet: true, isQuietZone: false, isWindowSeat: false, isStandingDesk: true, amenities: ["Power Outlet", "WiFi", "Standing Desk"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 150, y: 80, width: 40, height: 30 } },
      { id: "seat-d1-004", seatNumber: "A1-04", type: "window", floor: 1, zone: "Zone A", status: "reserved", hourlyRate: "70", hasMonitor: false, hasPowerOutlet: true, isQuietZone: false, isWindowSeat: true, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Window View"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 200, y: 80, width: 40, height: 30 } },
      // Floor 2 - Delhi Central
      { id: "seat-d2-001", seatNumber: "Q2-01", type: "quiet", floor: 2, zone: "Quiet Zone", status: "available", hourlyRate: "65", hasMonitor: false, hasPowerOutlet: true, isQuietZone: true, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Silent Environment"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 50, y: 80, width: 40, height: 30 } },
      { id: "seat-d2-002", seatNumber: "Q2-02", type: "quiet", floor: 2, zone: "Quiet Zone", status: "occupied", hourlyRate: "90", hasMonitor: true, hasPowerOutlet: true, isQuietZone: true, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Silent Environment", "Dual Monitors"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 100, y: 80, width: 40, height: 30 } },
      { id: "seat-d2-003", seatNumber: "P2-01", type: "pod", floor: 2, zone: "Pod Zone", status: "available", hourlyRate: "120", hasMonitor: true, hasPowerOutlet: true, isQuietZone: true, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Private Enclosure", "Dual Monitors", "Adjustable Lighting"], maxCapacity: 1, locationId: "loc-delhi-001", coordinates: { x: 180, y: 80, width: 60, height: 40 } },
      // Floor 3 - Delhi Central
      { id: "seat-d3-001", seatNumber: "C3-01", type: "collaborative", floor: 3, zone: "Collaboration Hub", status: "available", hourlyRate: "150", hasMonitor: true, hasPowerOutlet: true, isQuietZone: false, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Whiteboard", "Large Display"], maxCapacity: 4, locationId: "loc-delhi-001", coordinates: { x: 50, y: 80, width: 80, height: 50 } },
      { id: "seat-d3-002", seatNumber: "C3-02", type: "collaborative", floor: 3, zone: "Collaboration Hub", status: "occupied", hourlyRate: "200", hasMonitor: true, hasPowerOutlet: true, isQuietZone: false, isWindowSeat: false, isStandingDesk: false, amenities: ["Power Outlet", "WiFi", "Whiteboard", "Large Display", "Video Conferencing"], maxCapacity: 6, locationId: "loc-delhi-001", coordinates: { x: 150, y: 80, width: 100, height: 50 } },
    ];

    for (const seat of seatsData) {
      await db.insert(seats).values(seat).onConflictDoNothing();
    }
    console.log("✅ Seats created");

    // ==================== SEED BOOKS ====================
    console.log("Creating books...");
    
    const booksData = [
      {
        id: "book-001",
        title: "The Psychology of Learning",
        author: "John Anderson",
        isbn: "978-0-123456-78-9",
        genre: "Psychology",
        description: "A comprehensive guide to understanding how humans learn, process, and retain information.",
        coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3b4c8d2b?w=200&h=300&fit=crop",
        publicationYear: 2020,
        publisher: "Academic Press",
        pages: 456,
        language: "English",
        rating: "4.5",
        totalCopies: 3,
        availableCopies: 2,
        syllabusRelevance: ["Psychology 101", "Cognitive Science", "Education"],
        status: "available"
      },
      {
        id: "book-002",
        title: "Deep Work: Rules for Focused Success",
        author: "Cal Newport",
        isbn: "978-1-456789-01-2",
        genre: "Self-Help",
        description: "Master the art of deep work and transform your productivity with proven strategies.",
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
        publicationYear: 2016,
        publisher: "Grand Central Publishing",
        pages: 296,
        language: "English",
        rating: "4.7",
        totalCopies: 5,
        availableCopies: 1,
        syllabusRelevance: ["Productivity", "Business Management"],
        status: "limited"
      },
      {
        id: "book-003",
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "978-2-345678-90-1",
        genre: "Self-Help",
        description: "An easy and proven way to build good habits and break bad ones.",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
        publicationYear: 2018,
        publisher: "Avery Publishing",
        pages: 320,
        language: "English",
        rating: "4.9",
        totalCopies: 4,
        availableCopies: 0,
        syllabusRelevance: ["Psychology", "Behavioral Science", "Personal Development"],
        status: "unavailable"
      },
      {
        id: "book-004",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        isbn: "978-3-456789-01-2",
        genre: "Psychology",
        description: "A groundbreaking tour of the mind explaining the two systems that drive the way we think.",
        coverImage: "https://images.unsplash.com/photo-1589998059171-988d887cf646?w=200&h=300&fit=crop",
        publicationYear: 2011,
        publisher: "Farrar, Straus and Giroux",
        pages: 499,
        language: "English",
        rating: "4.6",
        totalCopies: 2,
        availableCopies: 2,
        syllabusRelevance: ["Psychology 101", "Behavioral Economics", "Decision Science"],
        status: "available"
      },
      {
        id: "book-005",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        isbn: "978-0-13-235088-4",
        genre: "Programming",
        description: "A handbook of agile software craftsmanship for writing clean, maintainable code.",
        coverImage: "https://images.unsplash.com/photo-1515894203069-3d1b9c24b0d7?w=200&h=300&fit=crop",
        publicationYear: 2008,
        publisher: "Prentice Hall",
        pages: 464,
        language: "English",
        rating: "4.8",
        totalCopies: 6,
        availableCopies: 3,
        syllabusRelevance: ["Computer Science 201", "Software Engineering", "Web Development"],
        status: "available"
      },
      {
        id: "book-006",
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        author: "Gang of Four",
        isbn: "978-0-201-63361-0",
        genre: "Programming",
        description: "The seminal book on design patterns in software engineering.",
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop",
        publicationYear: 1994,
        publisher: "Addison-Wesley",
        pages: 416,
        language: "English",
        rating: "4.5",
        totalCopies: 4,
        availableCopies: 2,
        syllabusRelevance: ["Computer Science 301", "Software Architecture", "Design Patterns"],
        status: "available"
      },
      {
        id: "book-007",
        title: "The Lean Startup",
        author: "Eric Ries",
        isbn: "978-0-307-88791-7",
        genre: "Business",
        description: "How today's entrepreneurs use continuous innovation to create successful businesses.",
        coverImage: "https://images.unsplash.com/photo-1553729458-efe03cb9ab84?w=200&h=300&fit=crop",
        publicationYear: 2011,
        publisher: "Crown Business",
        pages: 336,
        language: "English",
        rating: "4.4",
        totalCopies: 3,
        availableCopies: 1,
        syllabusRelevance: ["Entrepreneurship", "Business Strategy", "Product Management"],
        status: "limited"
      },
      {
        id: "book-008",
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        isbn: "978-0-262-03384-8",
        genre: "Computer Science",
        description: "A comprehensive textbook on algorithms and data structures.",
        coverImage: "https://images.unsplash.com/photo-1509228627152-72a361fb89af?w=200&h=300&fit=crop",
        publicationYear: 2009,
        publisher: "MIT Press",
        pages: 1312,
        language: "English",
        rating: "4.7",
        totalCopies: 5,
        availableCopies: 4,
        syllabusRelevance: ["Computer Science 201", "Algorithms", "Data Structures"],
        status: "available"
      },
      {
        id: "book-009",
        title: "The Art of War",
        author: "Sun Tzu",
        isbn: "978-1-59030-225-5",
        genre: "Philosophy",
        description: "Ancient Chinese military treatise on strategy and tactics.",
        coverImage: "https://images.unsplash.com/photo-1516979182676-ee253694c58d?w=200&h=300&fit=crop",
        publicationYear: 2005,
        publisher: "Shambhala",
        pages: 256,
        language: "English",
        rating: "4.6",
        totalCopies: 2,
        availableCopies: 2,
        syllabusRelevance: ["Philosophy 101", "Military Strategy", "Business Strategy"],
        status: "available"
      },
      {
        id: "book-010",
        title: "Data Science for Business",
        author: "Foster Provost",
        isbn: "978-1-449-36132-7",
        genre: "Data Science",
        description: "What you need to know about data mining and data-analytic thinking.",
        coverImage: "https://images.unsplash.com/photo-1551288049-beb3cd26c7c3?w=200&h=300&fit=crop",
        publicationYear: 2013,
        publisher: "O'Reilly Media",
        pages: 414,
        language: "English",
        rating: "4.3",
        totalCopies: 3,
        availableCopies: 0,
        syllabusRelevance: ["Data Science 101", "Business Analytics", "Machine Learning"],
        status: "unavailable"
      }
    ];

    for (const book of booksData) {
      await db.insert(books).values(book).onConflictDoNothing();
    }
    console.log("✅ Books created");

    // ==================== SEED BOOK LOCATIONS ====================
    console.log("Creating book locations...");
    
    const bookLocationsData = [
      { id: "bl-001", bookId: "book-001", locationId: "loc-delhi-001", floor: 2, aisle: "A", shelf: "S1", shelfLevel: 3, coordinates: { x: 120, y: 80 } },
      { id: "bl-002", bookId: "book-002", locationId: "loc-delhi-001", floor: 1, aisle: "B", shelf: "S3", shelfLevel: 2, coordinates: { x: 280, y: 150 } },
      { id: "bl-003", bookId: "book-003", locationId: "loc-delhi-001", floor: 1, aisle: "B", shelf: "S2", shelfLevel: 1, coordinates: { x: 250, y: 150 } },
      { id: "bl-004", bookId: "book-004", locationId: "loc-delhi-001", floor: 2, aisle: "A", shelf: "S2", shelfLevel: 4, coordinates: { x: 150, y: 80 } },
      { id: "bl-005", bookId: "book-005", locationId: "loc-delhi-001", floor: 3, aisle: "C", shelf: "S1", shelfLevel: 2, coordinates: { x: 400, y: 200 } },
      { id: "bl-006", bookId: "book-006", locationId: "loc-delhi-001", floor: 3, aisle: "C", shelf: "S2", shelfLevel: 3, coordinates: { x: 430, y: 200 } },
      { id: "bl-007", bookId: "book-007", locationId: "loc-delhi-001", floor: 1, aisle: "D", shelf: "S1", shelfLevel: 1, coordinates: { x: 500, y: 100 } },
      { id: "bl-008", bookId: "book-008", locationId: "loc-delhi-001", floor: 3, aisle: "C", shelf: "S3", shelfLevel: 1, coordinates: { x: 460, y: 200 } },
      { id: "bl-009", bookId: "book-009", locationId: "loc-delhi-001", floor: 2, aisle: "E", shelf: "S1", shelfLevel: 2, coordinates: { x: 550, y: 120 } },
      { id: "bl-010", bookId: "book-010", locationId: "loc-delhi-001", floor: 3, aisle: "F", shelf: "S1", shelfLevel: 3, coordinates: { x: 600, y: 250 } },
    ];

    for (const location of bookLocationsData) {
      await db.insert(bookLocations).values(location).onConflictDoNothing();
    }
    console.log("✅ Book locations created");

    // ==================== SEED ACHIEVEMENTS ====================
    console.log("Creating achievements...");
    
    const achievementsData = [
      { id: "ach-001", title: "Deep Work Champion", description: "Completed 20+ hours of deep work in a month", icon: "fa-brain", category: "productivity", rarity: "rare", points: 100 },
      { id: "ach-002", title: "Bookworm", description: "Read 3 books this month", icon: "fa-book-reader", category: "productivity", rarity: "common", points: 50 },
      { id: "ach-003", title: "Consistency King", description: "Maintained a 7-day streak", icon: "fa-fire", category: "consistency", rarity: "epic", points: 200 },
      { id: "ach-004", title: "Early Bird", description: "Started 10 sessions before 8 AM", icon: "fa-sun", category: "consistency", rarity: "rare", points: 100 },
      { id: "ach-005", title: "Night Owl", description: "Completed 10 sessions after 10 PM", icon: "fa-moon", category: "consistency", rarity: "rare", points: 100 },
      { id: "ach-006", title: "Social Butterfly", description: "Attended 5 community events", icon: "fa-users", category: "social", rarity: "common", points: 50 },
      { id: "ach-007", title: "Money Saver", description: "Saved ₹5000 by borrowing books", icon: "fa-piggy-bank", category: "financial", rarity: "epic", points: 200 },
      { id: "ach-008", title: "Premium Member", description: "Upgraded to Premium plan", icon: "fa-crown", category: "financial", rarity: "legendary", points: 500 },
    ];

    for (const achievement of achievementsData) {
      await db.insert(achievements).values(achievement).onConflictDoNothing();
    }
    console.log("✅ Achievements created");

    console.log("🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed
seed()
  .then(() => {
    console.log("Seed finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });