// Mock data for Smart Inventory & Spatial Wayfinding

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  syllabusRelevance: string[];
  coverImage: string;
  description: string;
  publicationYear: number;
  publisher: string;
  pages: number;
  language: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  location: BookLocation;
  status: 'available' | 'limited' | 'unavailable';
  reservedBy?: string;
  reservedUntil?: string;
}

export interface BookLocation {
  locationId: string;
  locationName: string;
  floor: number;
  aisle: string;
  shelf: string;
  shelfLevel: number;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface ShelfMap {
  floor: number;
  aisles: Aisle[];
}

export interface Aisle {
  id: string;
  name: string;
  shelves: Shelf[];
  coordinates: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };
}

export interface Shelf {
  id: string;
  name: string;
  levels: number;
  genres: string[];
  coordinates: {
    x: number;
    y: number;
  };
}

export interface Reservation {
  id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  reservedAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'picked_up' | 'cancelled';
  location: BookLocation;
}

// Mock Book Catalog
export const mockBooks: Book[] = [
  {
    id: 'book-001',
    title: 'The Psychology of Learning',
    author: 'John Anderson',
    isbn: '978-0-123456-78-9',
    genre: 'Psychology',
    syllabusRelevance: ['Psychology 101', 'Cognitive Science', 'Education'],
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3b4c8d2b?w=200&h=300&fit=crop',
    description: 'A comprehensive guide to understanding how humans learn, process, and retain information.',
    publicationYear: 2020,
    publisher: 'Academic Press',
    pages: 456,
    language: 'English',
    rating: 4.5,
    totalCopies: 3,
    availableCopies: 2,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 2,
      aisle: 'A',
      shelf: 'S1',
      shelfLevel: 3,
      coordinates: { x: 120, y: 80 }
    },
    status: 'available'
  },
  {
    id: 'book-002',
    title: 'Deep Work: Rules for Focused Success',
    author: 'Cal Newport',
    isbn: '978-1-456789-01-2',
    genre: 'Self-Help',
    syllabusRelevance: ['Productivity', 'Business Management'],
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
    description: 'Master the art of deep work and transform your productivity with proven strategies.',
    publicationYear: 2016,
    publisher: 'Grand Central Publishing',
    pages: 296,
    language: 'English',
    rating: 4.7,
    totalCopies: 5,
    availableCopies: 1,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 1,
      aisle: 'B',
      shelf: 'S3',
      shelfLevel: 2,
      coordinates: { x: 280, y: 150 }
    },
    status: 'limited'
  },
  {
    id: 'book-003',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-2-345678-90-1',
    genre: 'Self-Help',
    syllabusRelevance: ['Psychology', 'Behavioral Science', 'Personal Development'],
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
    description: 'An easy and proven way to build good habits and break bad ones.',
    publicationYear: 2018,
    publisher: 'Avery Publishing',
    pages: 320,
    language: 'English',
    rating: 4.9,
    totalCopies: 4,
    availableCopies: 0,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 1,
      aisle: 'B',
      shelf: 'S2',
      shelfLevel: 1,
      coordinates: { x: 250, y: 150 }
    },
    status: 'unavailable'
  },
  {
    id: 'book-004',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '978-3-456789-01-2',
    genre: 'Psychology',
    syllabusRelevance: ['Psychology 101', 'Behavioral Economics', 'Decision Science'],
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887cf646?w=200&h=300&fit=crop',
    description: 'A groundbreaking tour of the mind explaining the two systems that drive the way we think.',
    publicationYear: 2011,
    publisher: 'Farrar, Straus and Giroux',
    pages: 499,
    language: 'English',
    rating: 4.6,
    totalCopies: 2,
    availableCopies: 2,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 2,
      aisle: 'A',
      shelf: 'S2',
      shelfLevel: 4,
      coordinates: { x: 150, y: 80 }
    },
    status: 'available'
  },
  {
    id: 'book-005',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    genre: 'Programming',
    syllabusRelevance: ['Computer Science 201', 'Software Engineering', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1515894203069-3d1b9c24b0d7?w=200&h=300&fit=crop',
    description: 'A handbook of agile software craftsmanship for writing clean, maintainable code.',
    publicationYear: 2008,
    publisher: 'Prentice Hall',
    pages: 464,
    language: 'English',
    rating: 4.8,
    totalCopies: 6,
    availableCopies: 3,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 3,
      aisle: 'C',
      shelf: 'S1',
      shelfLevel: 2,
      coordinates: { x: 400, y: 200 }
    },
    status: 'available'
  },
  {
    id: 'book-006',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Gang of Four',
    isbn: '978-0-201-63361-0',
    genre: 'Programming',
    syllabusRelevance: ['Computer Science 301', 'Software Architecture', 'Design Patterns'],
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop',
    description: 'The seminal book on design patterns in software engineering.',
    publicationYear: 1994,
    publisher: 'Addison-Wesley',
    pages: 416,
    language: 'English',
    rating: 4.5,
    totalCopies: 4,
    availableCopies: 2,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 3,
      aisle: 'C',
      shelf: 'S2',
      shelfLevel: 3,
      coordinates: { x: 430, y: 200 }
    },
    status: 'available'
  },
  {
    id: 'book-007',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    isbn: '978-0-307-88791-7',
    genre: 'Business',
    syllabusRelevance: ['Entrepreneurship', 'Business Strategy', 'Product Management'],
    coverImage: 'https://images.unsplash.com/photo-1553729458-efe03cb9ab84?w=200&h=300&fit=crop',
    description: 'How today\'s entrepreneurs use continuous innovation to create successful businesses.',
    publicationYear: 2011,
    publisher: 'Crown Business',
    pages: 336,
    language: 'English',
    rating: 4.4,
    totalCopies: 3,
    availableCopies: 1,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 1,
      aisle: 'D',
      shelf: 'S1',
      shelfLevel: 1,
      coordinates: { x: 500, y: 100 }
    },
    status: 'limited'
  },
  {
    id: 'book-008',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0-262-03384-8',
    genre: 'Computer Science',
    syllabusRelevance: ['Computer Science 201', 'Algorithms', 'Data Structures'],
    coverImage: 'https://images.unsplash.com/photo-1509228627152-72a361fb89af?w=200&h=300&fit=crop',
    description: 'A comprehensive textbook on algorithms and data structures.',
    publicationYear: 2009,
    publisher: 'MIT Press',
    pages: 1312,
    language: 'English',
    rating: 4.7,
    totalCopies: 5,
    availableCopies: 4,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 3,
      aisle: 'C',
      shelf: 'S3',
      shelfLevel: 1,
      coordinates: { x: 460, y: 200 }
    },
    status: 'available'
  },
  {
    id: 'book-009',
    title: 'The Art of War',
    author: 'Sun Tzu',
    isbn: '978-1-59030-225-5',
    genre: 'Philosophy',
    syllabusRelevance: ['Philosophy 101', 'Military Strategy', 'Business Strategy'],
    coverImage: 'https://images.unsplash.com/photo-1516979182676-ee253694c58d?w=200&h=300&fit=crop',
    description: 'Ancient Chinese military treatise on strategy and tactics.',
    publicationYear: 2005,
    publisher: 'Shambhala',
    pages: 256,
    language: 'English',
    rating: 4.6,
    totalCopies: 2,
    availableCopies: 2,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 2,
      aisle: 'E',
      shelf: 'S1',
      shelfLevel: 2,
      coordinates: { x: 550, y: 120 }
    },
    status: 'available'
  },
  {
    id: 'book-010',
    title: 'Data Science for Business',
    author: 'Foster Provost',
    isbn: '978-1-449-36132-7',
    genre: 'Data Science',
    syllabusRelevance: ['Data Science 101', 'Business Analytics', 'Machine Learning'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-beb3cd26c7c3?w=200&h=300&fit=crop',
    description: 'What you need to know about data mining and data-analytic thinking.',
    publicationYear: 2013,
    publisher: "O'Reilly Media",
    pages: 414,
    language: 'English',
    rating: 4.3,
    totalCopies: 3,
    availableCopies: 0,
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 3,
      aisle: 'F',
      shelf: 'S1',
      shelfLevel: 3,
      coordinates: { x: 600, y: 250 }
    },
    status: 'unavailable'
  }
];

// Mock Floor Maps
export const mockFloorMaps: ShelfMap[] = [
  {
    floor: 1,
    aisles: [
      {
        id: 'aisle-b',
        name: 'B',
        shelves: [
          { id: 'shelf-b1', name: 'S1', levels: 5, genres: ['Self-Help', 'Motivation'], coordinates: { x: 220, y: 150 } },
          { id: 'shelf-b2', name: 'S2', levels: 5, genres: ['Self-Help'], coordinates: { x: 250, y: 150 } },
          { id: 'shelf-b3', name: 'S3', levels: 5, genres: ['Self-Help', 'Productivity'], coordinates: { x: 280, y: 150 } }
        ],
        coordinates: { startX: 200, startY: 130, endX: 300, endY: 170 }
      },
      {
        id: 'aisle-d',
        name: 'D',
        shelves: [
          { id: 'shelf-d1', name: 'S1', levels: 5, genres: ['Business', 'Entrepreneurship'], coordinates: { x: 500, y: 100 } },
          { id: 'shelf-d2', name: 'S2', levels: 5, genres: ['Business'], coordinates: { x: 530, y: 100 } }
        ],
        coordinates: { startX: 480, startY: 80, endX: 550, endY: 120 }
      }
    ]
  },
  {
    floor: 2,
    aisles: [
      {
        id: 'aisle-a',
        name: 'A',
        shelves: [
          { id: 'shelf-a1', name: 'S1', levels: 5, genres: ['Psychology'], coordinates: { x: 120, y: 80 } },
          { id: 'shelf-a2', name: 'S2', levels: 5, genres: ['Psychology', 'Behavioral Science'], coordinates: { x: 150, y: 80 } }
        ],
        coordinates: { startX: 100, startY: 60, endX: 170, endY: 100 }
      },
      {
        id: 'aisle-e',
        name: 'E',
        shelves: [
          { id: 'shelf-e1', name: 'S1', levels: 5, genres: ['Philosophy', 'History'], coordinates: { x: 550, y: 120 } },
          { id: 'shelf-e2', name: 'S2', levels: 5, genres: ['Philosophy'], coordinates: { x: 580, y: 120 } }
        ],
        coordinates: { startX: 530, startY: 100, endX: 600, endY: 140 }
      }
    ]
  },
  {
    floor: 3,
    aisles: [
      {
        id: 'aisle-c',
        name: 'C',
        shelves: [
          { id: 'shelf-c1', name: 'S1', levels: 5, genres: ['Programming', 'Computer Science'], coordinates: { x: 400, y: 200 } },
          { id: 'shelf-c2', name: 'S2', levels: 5, genres: ['Programming', 'Software Engineering'], coordinates: { x: 430, y: 200 } },
          { id: 'shelf-c3', name: 'S3', levels: 5, genres: ['Computer Science', 'Algorithms'], coordinates: { x: 460, y: 200 } }
        ],
        coordinates: { startX: 380, startY: 180, endX: 480, endY: 220 }
      },
      {
        id: 'aisle-f',
        name: 'F',
        shelves: [
          { id: 'shelf-f1', name: 'S1', levels: 5, genres: ['Data Science', 'Machine Learning'], coordinates: { x: 600, y: 250 } },
          { id: 'shelf-f2', name: 'S2', levels: 5, genres: ['Data Science'], coordinates: { x: 630, y: 250 } }
        ],
        coordinates: { startX: 580, startY: 230, endX: 650, endY: 270 }
      }
    ]
  }
];

// Mock Active Reservations
export const mockReservations: Reservation[] = [
  {
    id: 'res-001',
    bookId: 'book-003',
    bookTitle: 'Atomic Habits',
    userId: 'user-001',
    reservedAt: '2026-04-08T10:00:00',
    expiresAt: '2026-04-08T14:00:00',
    status: 'active',
    location: {
      locationId: 'loc-delhi-001',
      locationName: 'Delhi Central',
      floor: 1,
      aisle: 'B',
      shelf: 'S2',
      shelfLevel: 1,
      coordinates: { x: 250, y: 150 }
    }
  }
];

// Genre list for filtering
export const genres = [
  'All',
  'Psychology',
  'Self-Help',
  'Programming',
  'Computer Science',
  'Business',
  'Philosophy',
  'Data Science'
];

// Syllabus relevance list
export const syllabusCategories = [
  'All',
  'Psychology 101',
  'Cognitive Science',
  'Education',
  'Productivity',
  'Business Management',
  'Behavioral Science',
  'Personal Development',
  'Behavioral Economics',
  'Decision Science',
  'Computer Science 201',
  'Software Engineering',
  'Web Development',
  'Computer Science 301',
  'Software Architecture',
  'Design Patterns',
  'Entrepreneurship',
  'Business Strategy',
  'Product Management',
  'Algorithms',
  'Data Structures',
  'Philosophy 101',
  'Military Strategy',
  'Data Science 101',
  'Business Analytics',
  'Machine Learning'
];

// Helper functions
export const searchBooks = (
  query: string,
  filters: {
    genre?: string;
    syllabus?: string;
    availability?: 'all' | 'available' | 'unavailable';
  }
): Book[] => {
  let results = [...mockBooks];

  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.isbn.includes(query)
    );
  }

  // Genre filter
  if (filters.genre && filters.genre !== 'All') {
    results = results.filter(book => book.genre === filters.genre);
  }

  // Syllabus filter
  if (filters.syllabus && filters.syllabus !== 'All') {
    results = results.filter(book =>
      book.syllabusRelevance.includes(filters.syllabus!)
    );
  }

  // Availability filter
  if (filters.availability === 'available') {
    results = results.filter(book => book.availableCopies > 0);
  } else if (filters.availability === 'unavailable') {
    results = results.filter(book => book.availableCopies === 0);
  }

  return results;
};

export const getBookById = (id: string): Book | undefined => {
  return mockBooks.find(book => book.id === id);
};

export const getFloorMap = (floor: number): ShelfMap | undefined => {
  return mockFloorMaps.find(map => map.floor === floor);
};

export const formatAvailability = (book: Book): string => {
  if (book.availableCopies === 0) {
    return 'All copies checked out';
  }
  return `${book.availableCopies} of ${book.totalCopies} copies available`;
};