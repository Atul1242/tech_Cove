import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  mockSeats,
  amenityOptions,
  seatTypes,
  timeSlots,
  durationOptions,
  getSeatsByFloor,
  getFloorPlan,
  getSeatStatusColor,
  getOccupancyStats,
  calculatePrice,
  formatDuration,
  type Seat,
} from '../../data/mockSeatBooking';
import { useBookings } from '../../context/BookingContext';

const BookSeat: React.FC = () => {
  const navigate = useNavigate();
  const { addBooking } = useBookings();

  // State
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedStartTime, setSelectedStartTime] = useState('09:00');
  const [selectedDuration, setSelectedDuration] = useState(120);
  const [amenityFilters, setAmenityFilters] = useState<Set<string>>(new Set());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  // Get current floor plan
  const currentFloorPlan = getFloorPlan(selectedFloor);

  // Get filtered seats
  const filteredSeats = useMemo(() => {
    let seats = getSeatsByFloor(selectedFloor);
    
    if (amenityFilters.size > 0) {
      seats = seats.filter(seat => {
        return Array.from(amenityFilters).every(filter => {
          switch (filter) {
            case 'monitor': return seat.hasMonitor;
            case 'power': return seat.hasPowerOutlet;
            case 'quiet': return seat.isQuietZone;
            case 'window': return seat.isWindowSeat;
            case 'standing': return seat.isStandingDesk;
            case 'collaborative': return seat.type === 'collaborative';
            default: return true;
          }
        });
      });
    }
    
    return seats;
  }, [selectedFloor, amenityFilters]);

  // Get occupancy stats
  const occupancyStats = useMemo(() => {
    return getOccupancyStats(selectedFloor);
  }, [selectedFloor]);

  // Calculate booking price
  const bookingPrice = selectedSeat 
    ? calculatePrice(selectedSeat.hourlyRate, selectedDuration)
    : 0;

  // Calculate end time
  const endTime = useMemo(() => {
    const startIdx = timeSlots.indexOf(selectedStartTime);
    const slotsToAdd = selectedDuration / 30;
    const endIdx = Math.min(startIdx + slotsToAdd, timeSlots.length - 1);
    return timeSlots[endIdx];
  }, [selectedStartTime, selectedDuration]);

  // Toggle amenity filter
  const toggleAmenityFilter = (amenityId: string) => {
    setAmenityFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(amenityId)) {
        newSet.delete(amenityId);
      } else {
        newSet.add(amenityId);
      }
      return newSet;
    });
  };

  // Handle seat click
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeat(seat);
    }
  };

  // Handle booking
  const handleBooking = async () => {
    if (!selectedSeat) return;
    setBookingInProgress(true);

    // Simulate a brief processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const checkInDeadline = new Date(`${selectedDate}T${selectedStartTime}`);
    checkInDeadline.setMinutes(checkInDeadline.getMinutes() + 15);

    addBooking({
      locationName: 'Delhi Central',
      locationId: 'delhi-central',
      seatId: selectedSeat.id,
      seatNumber: selectedSeat.seatNumber,
      seatType: getSeatTypeInfo(selectedSeat.type)?.label || selectedSeat.type,
      floor: selectedSeat.floor,
      zone: selectedSeat.zone,
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: endTime,
      duration: selectedDuration,
      amenities: selectedSeat.amenities,
      status: 'upcoming',
      amount: bookingPrice,
      checkInDeadline: checkInDeadline.toISOString(),
    });

    setBookingInProgress(false);
    setShowBookingModal(false);

    // Brief success flash then redirect
    setTimeout(() => navigate('/my-bookings'), 300);
  };

  // Get seat type info
  const getSeatTypeInfo = (type: string) => {
    return seatTypes.find(st => st.id === type);
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container-fluid py-4">
        {/* Header */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="font-display fw-bold mb-2">
                <i className="fas fa-chair me-3" style={{ color: 'var(--accent-1)' }}></i>
                Book a Seat
              </h1>
              <p className="text-secondary-custom mb-0">
                Select your workspace from the interactive floor plan
              </p>
            </div>
            
            {/* Occupancy Stats */}
            <div className="d-flex gap-3">
              <div className="text-center px-3 py-2 bg-panel rounded-3">
                <p className="small text-secondary-custom mb-0">Available</p>
                <p className="fw-bold mb-0" style={{ color: '#22c55e' }}>
                  {occupancyStats.available}/{occupancyStats.total}
                </p>
              </div>
              <div className="text-center px-3 py-2 bg-panel rounded-3">
                <p className="small text-secondary-custom mb-0">Occupied</p>
                <p className="fw-bold mb-0" style={{ color: '#ef4444' }}>
                  {occupancyStats.occupied}
                </p>
              </div>
              <div className="text-center px-3 py-2 bg-panel rounded-3">
                <p className="small text-secondary-custom mb-0">Reserved</p>
                <p className="fw-bold mb-0" style={{ color: '#f59e0b' }}>
                  {occupancyStats.reserved}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="row g-4">
          {/* Left Panel - Filters & Booking Details */}
          <div className="col-lg-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Date & Time Selection */}
              <div className="card-custom p-3 mb-3">
                <h6 className="fw-semibold mb-3">
                  <i className="fas fa-calendar-alt me-2" style={{ color: 'var(--accent-1)' }}></i>
                  Date & Time
                </h6>
                
                <div className="mb-3">
                  <label className="form-label small">Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    data-testid="date-input"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label small">Start Time</label>
                  <select
                    className="form-select form-select-sm"
                    value={selectedStartTime}
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                    data-testid="start-time-select"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="form-label small">Duration</label>
                  <select
                    className="form-select form-select-sm"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(Number(e.target.value))}
                    data-testid="duration-select"
                  >
                    {durationOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amenity Filters */}
              <div className="card-custom p-3 mb-3">
                <h6 className="fw-semibold mb-3">
                  <i className="fas fa-filter me-2" style={{ color: 'var(--accent-2)' }}></i>
                  Filter by Amenities
                </h6>
                
                <div className="d-flex flex-wrap gap-2">
                  {amenityOptions.map(amenity => (
                    <button
                      key={amenity.id}
                      className={`btn btn-sm ${amenityFilters.has(amenity.id) ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                      onClick={() => toggleAmenityFilter(amenity.id)}
                      data-testid={`filter-${amenity.id}`}
                    >
                      <i className={`fas ${amenity.icon} me-1`}></i>
                      {amenity.label}
                    </button>
                  ))}
                </div>
                
                {amenityFilters.size > 0 && (
                  <button
                    className="btn btn-link btn-sm text-secondary-custom p-0 mt-2"
                    onClick={() => setAmenityFilters(new Set())}
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Seat Type Legend */}
              <div className="card-custom p-3">
                <h6 className="fw-semibold mb-3">
                  <i className="fas fa-info-circle me-2" style={{ color: 'var(--support-moss)' }}></i>
                  Seat Status
                </h6>
                
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: 16, height: 16, backgroundColor: '#22c55e', borderRadius: 3 }}></div>
                    <span className="small">Available</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: 16, height: 16, backgroundColor: '#ef4444', borderRadius: 3 }}></div>
                    <span className="small">Occupied</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: 16, height: 16, backgroundColor: '#f59e0b', borderRadius: 3 }}></div>
                    <span className="small">Reserved</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: 16, height: 16, backgroundColor: '#6b7280', borderRadius: 3 }}></div>
                    <span className="small">Maintenance</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Panel - Interactive Floor Plan */}
          <div className="col-lg-6">
            <motion.div
              className="card-custom p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Floor Selector */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                  {[1, 2, 3].map(floor => (
                    <button
                      key={floor}
                      className={`btn ${selectedFloor === floor ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                      onClick={() => {
                        setSelectedFloor(floor);
                        setSelectedSeat(null);
                      }}
                      data-testid={`floor-${floor}`}
                    >
                      Floor {floor}
                    </button>
                  ))}
                </div>
                <span className="text-secondary-custom small">
                  {currentFloorPlan?.name}
                </span>
              </div>

              {/* SVG Floor Plan */}
              <div 
                className="bg-dark rounded-4 p-3 position-relative"
                style={{ minHeight: '400px' }}
              >
                <svg 
                  viewBox="0 0 400 300" 
                  className="w-100"
                  style={{ maxHeight: '400px' }}
                >
                  {/* Background grid */}
                  <defs>
                    <pattern id="floorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2d3748" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#floorGrid)" />

                  {/* Zones */}
                  {currentFloorPlan?.zones.map(zone => (
                    <rect
                      key={zone.id}
                      x={zone.coordinates.x}
                      y={zone.coordinates.y}
                      width={zone.coordinates.width}
                      height={zone.coordinates.height}
                      fill={zone.color}
                      stroke="#4a5568"
                      strokeWidth="1"
                      rx="5"
                    />
                  ))}

                  {/* Zone labels */}
                  {currentFloorPlan?.zones.map(zone => (
                    <text
                      key={`label-${zone.id}`}
                      x={zone.coordinates.x + zone.coordinates.width / 2}
                      y={zone.coordinates.y - 5}
                      textAnchor="middle"
                      fill="#a0aec0"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {zone.name}
                    </text>
                  ))}

                  {/* Facilities */}
                  {currentFloorPlan?.facilities.map(facility => (
                    <g key={facility.id}>
                      <circle
                        cx={facility.coordinates.x}
                        cy={facility.coordinates.y}
                        r="12"
                        fill="#4a5568"
                      />
                      <text
                        x={facility.coordinates.x}
                        y={facility.coordinates.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                      >
                        {facility.type === 'restroom' ? '🚻' : 
                         facility.type === 'cafe' ? '☕' :
                         facility.type === 'exit' ? '🚪' :
                         facility.type === 'water' ? '💧' :
                         facility.type === 'printer' ? '🖨️' :
                         facility.type === 'phone_booth' ? '📞' : '📍'}
                      </text>
                    </g>
                  ))}

                  {/* Entrance */}
                  {currentFloorPlan?.entrances.map((entrance, idx) => (
                    <g key={`entrance-${idx}`}>
                      <rect
                        x={entrance.x - 15}
                        y={entrance.y - 10}
                        width="30"
                        height="20"
                        fill="var(--support-moss)"
                        rx="3"
                      />
                      <text
                        x={entrance.x}
                        y={entrance.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        ENTER
                      </text>
                    </g>
                  ))}

                  {/* Seats */}
                  {filteredSeats.map(seat => {
                    const isSelected = selectedSeat?.id === seat.id;
                    const isHovered = hoveredSeat === seat.id;
                    const isClickable = seat.status === 'available';
                    
                    return (
                      <g 
                        key={seat.id}
                        style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
                        onClick={() => handleSeatClick(seat)}
                        onMouseEnter={() => setHoveredSeat(seat.id)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        data-testid={`seat-${seat.id}`}
                      >
                        {/* Seat rectangle */}
                        <rect
                          x={seat.coordinates.x}
                          y={seat.coordinates.y}
                          width={seat.coordinates.width}
                          height={seat.coordinates.height}
                          fill={getSeatStatusColor(seat.status)}
                          stroke={isSelected ? 'var(--accent-2)' : isHovered ? 'white' : '#1a202c'}
                          strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                          rx="4"
                          opacity={isClickable ? 1 : 0.6}
                          className={isSelected ? 'animate-pulse' : ''}
                        />
                        
                        {/* Seat number */}
                        <text
                          x={seat.coordinates.x + seat.coordinates.width / 2}
                          y={seat.coordinates.y + seat.coordinates.height / 2 + 4}
                          textAnchor="middle"
                          fill="white"
                          fontSize="9"
                          fontWeight="bold"
                        >
                          {seat.seatNumber}
                        </text>
                        
                        {/* Type indicator for collaborative seats */}
                        {seat.type === 'collaborative' && (
                          <text
                            x={seat.coordinates.x + seat.coordinates.width / 2}
                            y={seat.coordinates.y + seat.coordinates.height / 2 + 16}
                            textAnchor="middle"
                            fill="white"
                            fontSize="7"
                          >
                            👥 {seat.maxCapacity}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Hover Tooltip */}
                {hoveredSeat && (
                  <div 
                    className="position-absolute card-custom p-2"
                    style={{ 
                      top: 10, 
                      right: 10, 
                      minWidth: '150px',
                      zIndex: 10
                    }}
                  >
                    {(() => {
                      const seat = mockSeats.find(s => s.id === hoveredSeat);
                      if (!seat) return null;
                      return (
                        <>
                          <p className="fw-semibold mb-1">{seat.seatNumber}</p>
                          <p className="small text-secondary-custom mb-1">
                            {getSeatTypeInfo(seat.type)?.label}
                          </p>
                          <p className="small mb-0">
                            <span 
                              className="badge"
                              style={{ backgroundColor: getSeatStatusColor(seat.status) }}
                            >
                              {seat.status}
                            </span>
                          </p>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Floor Info */}
              <div className="mt-3 p-3 bg-muted rounded-3">
                <div className="row g-2">
                  <div className="col-4">
                    <p className="small text-secondary-custom mb-0">Total Seats</p>
                    <p className="fw-semibold mb-0">{occupancyStats.total}</p>
                  </div>
                  <div className="col-4">
                    <p className="small text-secondary-custom mb-0">Available Now</p>
                    <p className="fw-semibold mb-0" style={{ color: '#22c55e' }}>
                      {occupancyStats.available}
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="small text-secondary-custom mb-0">Occupancy</p>
                    <p className="fw-semibold mb-0">
                      {Math.round((occupancyStats.occupied / occupancyStats.total) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Selected Seat Details */}
          <div className="col-lg-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {selectedSeat ? (
                <div className="card-custom p-4">
                  <h6 className="fw-semibold mb-3">
                    <i className="fas fa-check-circle me-2" style={{ color: 'var(--support-moss)' }}></i>
                    Selected Seat
                  </h6>

                  {/* Seat Info */}
                  <div className="text-center mb-4">
                    <div 
                      className="rounded-4 d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' 
                      }}
                    >
                      <i className={`fas ${getSeatTypeInfo(selectedSeat.type)?.icon || 'fa-chair'} fa-2x text-white`}></i>
                    </div>
                    <h5 className="fw-bold mb-1">{selectedSeat.seatNumber}</h5>
                    <p className="text-secondary-custom mb-0">{getSeatTypeInfo(selectedSeat.type)?.label}</p>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-muted rounded-3 p-3 mb-4">
                    <div className="mb-2">
                      <p className="small text-secondary-custom mb-0">Date</p>
                      <p className="fw-semibold mb-0">
                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="small text-secondary-custom mb-0">Time</p>
                      <p className="fw-semibold mb-0">{selectedStartTime} - {endTime}</p>
                    </div>
                    <div className="mb-2">
                      <p className="small text-secondary-custom mb-0">Duration</p>
                      <p className="fw-semibold mb-0">{formatDuration(selectedDuration)}</p>
                    </div>
                    <div>
                      <p className="small text-secondary-custom mb-0">Location</p>
                      <p className="fw-semibold mb-0">Floor {selectedSeat.floor}, {selectedSeat.zone}</p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <p className="small text-secondary-custom mb-2">Amenities</p>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedSeat.amenities.map((amenity, idx) => (
                        <span key={idx} className="badge bg-light text-dark">{amenity}</span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="p-3 rounded-3 mb-4" style={{ background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' }}>
                    <p className="text-white small mb-1">Total Price</p>
                    <h3 className="text-white fw-bold mb-0">₹{bookingPrice}</h3>
                  </div>

                  {/* Check-in Notice */}
                  <div className="alert alert-warning small mb-4">
                    <i className="fas fa-clock me-2"></i>
                    <strong>Proximity Check-In:</strong> You must check in within 15 minutes of your start time, or your booking will be automatically cancelled.
                  </div>

                  {/* Book Button */}
                  <button
                    className="btn w-100 btn-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
                      color: 'white',
                      border: 'none'
                    }}
                    onClick={() => setShowBookingModal(true)}
                    data-testid="proceed-booking-btn"
                  >
                    <i className="fas fa-calendar-check me-2"></i>
                    Proceed to Book
                  </button>
                </div>
              ) : (
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-mouse-pointer mb-3" style={{ fontSize: '3rem', color: 'var(--borders)' }}></i>
                  <h6 className="fw-semibold">Select a Seat</h6>
                  <p className="text-secondary-custom small mb-0">
                    Click on an available seat (green) on the floor plan to view details and book
                  </p>
                </div>
              )}

              {/* Seat Types Info */}
              <div className="card-custom p-3 mt-3">
                <h6 className="fw-semibold mb-3">Seat Types</h6>
                {seatTypes.slice(0, 4).map(type => (
                  <div key={type.id} className="d-flex align-items-center gap-2 mb-2">
                    <i className={`fas ${type.icon}`} style={{ color: 'var(--accent-1)', width: 20 }}></i>
                    <div>
                      <p className="small fw-semibold mb-0">{type.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {showBookingModal && selectedSeat && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.7)', zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-custom p-4"
              style={{ maxWidth: '450px', width: '90%' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <>
                  <h5 className="fw-semibold mb-4">Confirm Your Booking</h5>

                  <div className="bg-muted rounded-3 p-3 mb-4">
                    <div className="row g-3">
                      <div className="col-6">
                        <p className="small text-secondary-custom mb-1">Seat</p>
                        <p className="fw-semibold mb-0">{selectedSeat.seatNumber}</p>
                      </div>
                      <div className="col-6">
                        <p className="small text-secondary-custom mb-1">Type</p>
                        <p className="fw-semibold mb-0">{getSeatTypeInfo(selectedSeat.type)?.label}</p>
                      </div>
                      <div className="col-6">
                        <p className="small text-secondary-custom mb-1">Date</p>
                        <p className="fw-semibold mb-0">
                          {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="small text-secondary-custom mb-1">Time</p>
                        <p className="fw-semibold mb-0">{selectedStartTime} - {endTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-semibold">Total Amount</span>
                    <span className="h4 mb-0 fw-bold" style={{ color: 'var(--accent-1)' }}>₹{bookingPrice}</span>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-custom flex-grow-1"
                      onClick={() => setShowBookingModal(false)}
                      disabled={bookingInProgress}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary-custom flex-grow-1"
                      onClick={handleBooking}
                      disabled={bookingInProgress}
                      data-testid="confirm-booking-btn"
                    >
                      {bookingInProgress ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Booking...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookSeat;