import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  mockBooks,
  genres,
  syllabusCategories,
  searchBooks,
  getFloorMap,
  formatAvailability,
  type Book,
  type BookLocation
} from '../../data/mockBookCatalog';

const BookLocator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSyllabus, setSelectedSyllabus] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [reservingBook, setReservingBook] = useState<string | null>(null);
  const [reservedBooks, setReservedBooks] = useState<Set<string>>(new Set());
  const [activeFloor, setActiveFloor] = useState(1);
  const [showRoute, setShowRoute] = useState(false);

  // Search results
  const searchResults = useMemo(() => {
    return searchBooks(searchQuery, {
      genre: selectedGenre,
      syllabus: selectedSyllabus,
      availability: availabilityFilter
    });
  }, [searchQuery, selectedGenre, selectedSyllabus, availabilityFilter]);

  // Get current floor map
  const currentFloorMap = getFloorMap(activeFloor);

  // Handle book selection
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setShowMap(true);
    setActiveFloor(book.location.floor);
  };

  // Handle reservation
  const handleReserve = async (bookId: string) => {
    setReservingBook(bookId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setReservedBooks(prev => new Set([...prev, bookId]));
    setReservingBook(null);
  };

  // Cancel reservation
  const handleCancelReservation = (bookId: string) => {
    setReservedBooks(prev => {
      const newSet = new Set(prev);
      newSet.delete(bookId);
      return newSet;
    });
  };

  // Get status badge color
  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'limited': return 'bg-warning';
      case 'unavailable': return 'bg-danger';
    }
  };

  // Render shelf on map
  const renderShelf = (shelf: { id: string; name: string; levels: number; genres: string[]; coordinates: { x: number; y: number } }, isTarget: boolean) => {
    return (
      <g key={shelf.id}>
        {/* Shelf rectangle */}
        <rect
          x={shelf.coordinates.x - 15}
          y={shelf.coordinates.y - 10}
          width="30"
          height="20"
          fill={isTarget ? 'var(--accent-1)' : '#4a5568'}
          stroke={isTarget ? 'var(--accent-2)' : '#718096'}
          strokeWidth={isTarget ? 3 : 1}
          rx="3"
          className={isTarget ? 'animate-pulse' : ''}
        />
        {/* Shelf label */}
        <text
          x={shelf.coordinates.x}
          y={shelf.coordinates.y + 4}
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
        >
          {shelf.name}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-2">
            <i className="fas fa-book-reader me-3" style={{ color: 'var(--accent-1)' }}></i>
            Book Locator
          </h1>
          <p className="text-secondary-custom">
            Search, locate, and reserve books from our library catalog
          </p>
        </motion.div>

        <div className="row g-4">
          {/* Search & Filters Panel */}
          <div className="col-lg-4">
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Search Input */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Search Books</label>
                <div className="input-group">
                  <span className="input-group-text bg-muted border-custom">
                    <i className="fas fa-search text-secondary-custom"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-custom"
                    placeholder="Title, Author, or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="book-search-input"
                  />
                </div>
              </div>

              {/* Genre Filter */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Genre</label>
                <select
                  className="form-select border-custom"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  data-testid="genre-filter"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Syllabus Filter */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Syllabus Relevance</label>
                <select
                  className="form-select border-custom"
                  value={selectedSyllabus}
                  onChange={(e) => setSelectedSyllabus(e.target.value)}
                  data-testid="syllabus-filter"
                >
                  {syllabusCategories.slice(0, 15).map(syl => (
                    <option key={syl} value={syl}>{syl}</option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Availability</label>
                <div className="d-flex gap-2 flex-wrap">
                  {[
                    { value: 'all', label: 'All', icon: 'fa-list' },
                    { value: 'available', label: 'Available', icon: 'fa-check-circle' },
                    { value: 'unavailable', label: 'Unavailable', icon: 'fa-times-circle' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`btn ${availabilityFilter === opt.value ? 'btn-primary-custom' : 'btn-outline-custom'} btn-sm`}
                      onClick={() => setAvailabilityFilter(opt.value as typeof availabilityFilter)}
                      data-testid={`availability-${opt.value}`}
                    >
                      <i className={`fas ${opt.icon} me-1`}></i>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="p-3 bg-muted rounded-3">
                <p className="mb-0 small">
                  <i className="fas fa-book me-2" style={{ color: 'var(--accent-1)' }}></i>
                  <strong>{searchResults.length}</strong> books found
                </p>
              </div>
            </motion.div>

            {/* Active Reservations */}
            {reservedBooks.size > 0 && (
              <motion.div 
                className="card-custom p-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h5 className="fw-semibold mb-3">
                  <i className="fas fa-bookmark me-2" style={{ color: 'var(--accent-2)' }}></i>
                  Your Reservations
                </h5>
                {Array.from(reservedBooks).map(bookId => {
                  const book = mockBooks.find(b => b.id === bookId);
                  if (!book) return null;
                  return (
                    <div key={bookId} className="d-flex align-items-center gap-3 p-2 bg-muted rounded-3 mb-2">
                      <i className="fas fa-book" style={{ color: 'var(--accent-1)' }}></i>
                      <div className="flex-grow-1">
                        <p className="small fw-semibold mb-0">{book.title}</p>
                        <p className="small text-secondary-custom mb-0">
                          Expires in 4 hours
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-custom"
                        onClick={() => handleCancelReservation(bookId)}
                      >
                        Cancel
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Results & Map Panel */}
          <div className="col-lg-8">
            <AnimatePresence mode="wait">
              {!showMap ? (
                /* Book List View */
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="font-display fw-semibold mb-0">Search Results</h4>
                    <span className="text-secondary-custom small">
                      Click on a book to locate it
                    </span>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="card-custom p-5 text-center">
                      <i className="fas fa-search mb-3" style={{ fontSize: '3rem', color: 'var(--borders)' }}></i>
                      <h5 className="fw-semibold">No books found</h5>
                      <p className="text-secondary-custom">Try adjusting your search criteria</p>
                    </div>
                  ) : (
                    <div className="row g-3">
                      {searchResults.map((book, index) => (
                        <div key={book.id} className="col-md-6">
                          <motion.div
                            className="card-custom h-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSelectBook(book)}
                            data-testid={`book-card-${book.id}`}
                          >
                            <div className="p-3">
                              <div className="d-flex gap-3">
                                {/* Book Cover */}
                                <div 
                                  className="rounded-3 bg-muted d-flex align-items-center justify-content-center flex-shrink-0"
                                  style={{ width: '60px', height: '90px' }}
                                >
                                  <i className="fas fa-book" style={{ fontSize: '1.5rem', color: 'var(--accent-1)' }}></i>
                                </div>
                                
                                {/* Book Info */}
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <h6 className="fw-semibold mb-1" style={{ lineHeight: 1.3 }}>
                                      {book.title}
                                    </h6>
                                    <span className={`badge ${getStatusColor(book.status)} ms-2`}>
                                      {book.availableCopies}/{book.totalCopies}
                                    </span>
                                  </div>
                                  <p className="text-secondary-custom small mb-1">{book.author}</p>
                                  <p className="text-secondary-custom small mb-2">
                                    <i className="fas fa-map-marker-alt me-1"></i>
                                    Floor {book.location.floor}, Aisle {book.location.aisle}
                                  </p>
                                  <div className="d-flex gap-1 flex-wrap">
                                    <span className="badge bg-muted text-secondary-custom">{book.genre}</span>
                                    {book.syllabusRelevance.slice(0, 1).map((s, i) => (
                                      <span key={i} className="badge bg-light text-dark">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Map & Detail View */
                <motion.div
                  key="map"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Back Button */}
                  <button
                    className="btn btn-outline-custom mb-4"
                    onClick={() => {
                      setShowMap(false);
                      setShowRoute(false);
                    }}
                    data-testid="back-to-list"
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Results
                  </button>

                  {selectedBook && (
                    <div className="row g-4">
                      {/* Book Details */}
                      <div className="col-lg-5">
                        <div className="card-custom p-4">
                          <div className="text-center mb-4">
                            <div 
                              className="rounded-4 bg-muted d-inline-flex align-items-center justify-content-center"
                              style={{ width: '120px', height: '180px' }}
                            >
                              <i className="fas fa-book" style={{ fontSize: '3rem', color: 'var(--accent-1)' }}></i>
                            </div>
                          </div>

                          <h4 className="font-display fw-bold text-center mb-2">{selectedBook.title}</h4>
                          <p className="text-secondary-custom text-center mb-3">by {selectedBook.author}</p>

                          <div className="d-flex justify-content-center gap-2 mb-4">
                            <span className={`badge ${getStatusColor(selectedBook.status)} px-3 py-2`}>
                              {selectedBook.status === 'available' ? 'Available' : 
                               selectedBook.status === 'limited' ? 'Limited' : 'Unavailable'}
                            </span>
                            <span className="badge bg-muted text-secondary-custom px-3 py-2">
                              {formatAvailability(selectedBook)}
                            </span>
                          </div>

                          <div className="bg-muted rounded-3 p-3 mb-4">
                            <div className="row g-2">
                              <div className="col-6">
                                <p className="small text-secondary-custom mb-1">ISBN</p>
                                <p className="small fw-semibold mb-0">{selectedBook.isbn}</p>
                              </div>
                              <div className="col-6">
                                <p className="small text-secondary-custom mb-1">Genre</p>
                                <p className="small fw-semibold mb-0">{selectedBook.genre}</p>
                              </div>
                              <div className="col-6">
                                <p className="small text-secondary-custom mb-1">Publisher</p>
                                <p className="small fw-semibold mb-0">{selectedBook.publisher}</p>
                              </div>
                              <div className="col-6">
                                <p className="small text-secondary-custom mb-1">Year</p>
                                <p className="small fw-semibold mb-0">{selectedBook.publicationYear}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="small text-secondary-custom mb-2">Syllabus Relevance</p>
                            <div className="d-flex gap-1 flex-wrap">
                              {selectedBook.syllabusRelevance.map((s, i) => (
                                <span key={i} className="badge bg-light text-dark">{s}</span>
                              ))}
                            </div>
                          </div>

                          {/* Reserve Button */}
                          {selectedBook.availableCopies > 0 && (
                            <button
                              className="btn w-100"
                              style={{
                                background: reservedBooks.has(selectedBook.id) 
                                  ? 'var(--support-moss)' 
                                  : 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
                                color: 'white',
                                border: 'none'
                              }}
                              onClick={() => handleReserve(selectedBook.id)}
                              disabled={reservingBook === selectedBook.id || reservedBooks.has(selectedBook.id)}
                              data-testid="reserve-btn"
                            >
                              {reservingBook === selectedBook.id ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2"></span>
                                  Reserving...
                                </>
                              ) : reservedBooks.has(selectedBook.id) ? (
                                <>
                                  <i className="fas fa-check me-2"></i>
                                  Reserved - Expires in 4 hours
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-bookmark me-2"></i>
                                  Reserve to Hold
                                </>
                              )}
                            </button>
                          )}

                          {selectedBook.availableCopies === 0 && (
                            <div className="alert alert-warning mb-0">
                              <i className="fas fa-exclamation-triangle me-2"></i>
                              All copies are currently checked out. Check back later.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Interactive Map */}
                      <div className="col-lg-7">
                        <div className="card-custom p-4">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-semibold mb-0">
                              <i className="fas fa-map-marked-alt me-2" style={{ color: 'var(--accent-1)' }}></i>
                              Shelf Location
                            </h5>
                            <div className="d-flex gap-2">
                              <button
                                className={`btn btn-sm ${showRoute ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                                onClick={() => setShowRoute(!showRoute)}
                                data-testid="toggle-route"
                              >
                                <i className="fas fa-route me-1"></i>
                                Show Route
                              </button>
                            </div>
                          </div>

                          {/* Location Info */}
                          <div className="bg-muted rounded-3 p-3 mb-4">
                            <div className="row g-3">
                              <div className="col-4">
                                <p className="small text-secondary-custom mb-1">Location</p>
                                <p className="fw-semibold mb-0">{selectedBook.location.locationName}</p>
                              </div>
                              <div className="col-4">
                                <p className="small text-secondary-custom mb-1">Floor</p>
                                <p className="fw-semibold mb-0">{selectedBook.location.floor}</p>
                              </div>
                              <div className="col-4">
                                <p className="small text-secondary-custom mb-1">Aisle / Shelf</p>
                                <p className="fw-semibold mb-0">
                                  {selectedBook.location.aisle} / {selectedBook.location.shelf}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Floor Selector */}
                          <div className="d-flex gap-2 mb-4">
                            {[1, 2, 3].map(floor => (
                              <button
                                key={floor}
                                className={`btn ${activeFloor === floor ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                                onClick={() => setActiveFloor(floor)}
                                data-testid={`floor-btn-${floor}`}
                              >
                                Floor {floor}
                              </button>
                            ))}
                          </div>

                          {/* SVG Map */}
                          <div className="bg-dark rounded-4 p-3" style={{ minHeight: '300px' }}>
                            <svg 
                              viewBox="0 0 700 350" 
                              className="w-100"
                              style={{ maxHeight: '350px' }}
                            >
                              {/* Grid background */}
                              <defs>
                                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2d3748" strokeWidth="0.5"/>
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#grid)" />
                              
                              {/* Entrance marker */}
                              <g>
                                <rect x="10" y="160" width="40" height="30" fill="var(--support-moss)" rx="3" />
                                <text x="30" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ENTRANCE</text>
                              </g>

                              {/* Route path */}
                              {showRoute && currentFloorMap && selectedBook.location.floor === activeFloor && (
                                <motion.path
                                  d={`M 50 175 
                                      L ${selectedBook.location.coordinates.x - 30} 175
                                      L ${selectedBook.location.coordinates.x - 30} ${selectedBook.location.coordinates.y}
                                      L ${selectedBook.location.coordinates.x} ${selectedBook.location.coordinates.y}`}
                                  stroke="var(--accent-2)"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeDasharray="10,5"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                              )}

                              {/* Aisles and Shelves */}
                              {currentFloorMap?.aisles.map(aisle => (
                                <g key={aisle.id}>
                                  {/* Aisle label */}
                                  <text
                                    x={aisle.coordinates.startX + 20}
                                    y={aisle.coordinates.startY - 10}
                                    fill="var(--borders)"
                                    fontSize="12"
                                    fontWeight="bold"
                                  >
                                    Aisle {aisle.name}
                                  </text>
                                  
                                  {/* Shelves */}
                                  {aisle.shelves.map(shelf => {
                                    const isTarget = 
                                      selectedBook.location.floor === activeFloor &&
                                      selectedBook.location.aisle === aisle.name &&
                                      selectedBook.location.shelf === shelf.name;
                                    
                                    return (
                                      <g key={shelf.id}>
                                        <rect
                                          x={shelf.coordinates.x - 15}
                                          y={shelf.coordinates.y - 10}
                                          width="30"
                                          height="20"
                                          fill={isTarget ? 'var(--accent-1)' : '#4a5568'}
                                          stroke={isTarget ? 'var(--accent-2)' : '#718096'}
                                          strokeWidth={isTarget ? 3 : 1}
                                          rx="3"
                                          className={isTarget ? 'animate-pulse' : ''}
                                        />
                                        <text
                                          x={shelf.coordinates.x}
                                          y={shelf.coordinates.y + 4}
                                          textAnchor="middle"
                                          fill="white"
                                          fontSize="10"
                                          fontWeight="bold"
                                        >
                                          {shelf.name}
                                        </text>
                                        
                                        {/* Target indicator */}
                                        {isTarget && (
                                          <>
                                            <circle
                                              cx={shelf.coordinates.x}
                                              cy={shelf.coordinates.y - 25}
                                              r="8"
                                              fill="var(--accent-2)"
                                            />
                                            <text
                                              x={shelf.coordinates.x}
                                              y={shelf.coordinates.y - 22}
                                              textAnchor="middle"
                                              fill="white"
                                              fontSize="10"
                                            >
                                              ★
                                            </text>
                                          </>
                                        )}
                                      </g>
                                    );
                                  })}
                                </g>
                              ))}

                              {/* Legend */}
                              <g transform="translate(550, 20)">
                                <rect x="0" y="0" width="130" height="80" fill="rgba(0,0,0,0.5)" rx="5" />
                                <text x="10" y="20" fill="white" fontSize="10" fontWeight="bold">Legend</text>
                                <rect x="10" y="30" width="15" height="10" fill="var(--accent-1)" rx="2" />
                                <text x="30" y="38" fill="white" fontSize="9">Your Book</text>
                                <rect x="10" y="50" width="15" height="10" fill="#4a5568" rx="2" />
                                <text x="30" y="58" fill="white" fontSize="9">Other Shelves</text>
                              </g>
                            </svg>
                          </div>

                          {/* Shelf Level Indicator */}
                          <div className="mt-4 p-3 bg-muted rounded-3">
                            <p className="small text-secondary-custom mb-2">Shelf Level: {selectedBook.location.shelfLevel} of 5</p>
                            <div className="d-flex gap-1">
                              {[1, 2, 3, 4, 5].map(level => (
                                <div
                                  key={level}
                                  className={`flex-grow-1 text-center py-2 rounded ${
                                    level === selectedBook.location.shelfLevel 
                                      ? 'bg-accent-1 text-white' 
                                      : 'bg-secondary-custom'
                                  }`}
                                  style={{
                                    background: level === selectedBook.location.shelfLevel 
                                      ? 'var(--accent-1)' 
                                      : undefined
                                  }}
                                >
                                  {level}
                                </div>
                              ))}
                            </div>
                            <p className="small text-secondary-custom mt-2 mb-0">
                              <i className="fas fa-info-circle me-1"></i>
                              Level 1 = Bottom shelf, Level 5 = Top shelf
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookLocator;