import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Location } from '../types';
import locationsData from '../data/locations.json';

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00');
  
  const location = locationsData.find(loc => loc.id === id) as Location | undefined;

  if (!location) {
    return (
      <div className="bg-dark-custom min-vh-100 d-flex align-items-center justify-content-center" style={{ marginTop: '76px' }}>
        <div className="text-center">
          <i className="fas fa-map-marker-alt text-secondary-custom mb-3" style={{ fontSize: '4rem' }}></i>
          <h2 className="text-secondary-custom">Location not found</h2>
          <Link to="/locations" className="btn btn-primary-custom mt-3">
            Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  const getNoiseStatusColor = () => {
    switch (location.noiseLevel) {
      case 'quiet': return 'var(--support-moss)';
      case 'moderate': return 'var(--support-amber)';
      case 'busy': return 'var(--support-coral)';
      default: return 'var(--support-moss)';
    }
  };

  const handleBookNow = () => {
    // TODO: Implement booking functionality
    console.log('Booking:', { locationId: location.id, date: selectedDate, time: selectedTime });
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      {/* Hero Image */}
      <div className="position-relative">
        <img 
          src={location.image}
          alt={location.name}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" 
             style={{ background: 'linear-gradient(transparent 50%, rgba(15, 17, 21, 0.8))' }}>
          <div className="container py-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display fw-bold text-white mb-2" data-testid="location-title">
                {location.name}
              </h1>
              <p className="text-light mb-0">
                <i className="fas fa-map-marker-alt me-2"></i>
                {location.address}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Quick Stats */}
            <motion.div 
              className="row g-4 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="col-md-3">
                <div className="bg-panel p-3 rounded-3 text-center">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <div 
                      className="status-indicator me-2" 
                      style={{ backgroundColor: getNoiseStatusColor() }}
                    ></div>
                    <span className="text-capitalize">{location.noiseLevel}</span>
                  </div>
                  <small className="text-secondary-custom">Noise Level</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-panel p-3 rounded-3 text-center">
                  <h4 className="mb-1">{location.availableSeats}</h4>
                  <small className="text-secondary-custom">Available Seats</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-panel p-3 rounded-3 text-center">
                  <h4 className="mb-1">{location.occupancy}%</h4>
                  <small className="text-secondary-custom">Occupancy</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-panel p-3 rounded-3 text-center">
                  <h4 className="mb-1 price-highlight">₹{location.pricePerDay}</h4>
                  <small className="text-secondary-custom">Per Day</small>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.section 
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display fw-semibold mb-3">About This Location</h3>
              <p className="text-secondary-custom">{location.description}</p>
            </motion.section>

            {/* Features */}
            <motion.section 
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display fw-semibold mb-3">Features</h3>
              <div className="row g-3">
                {location.features.map((feature, index) => (
                  <div key={index} className="col-md-6">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle me-2" style={{ color: 'var(--support-moss)' }}></i>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Amenities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="font-display fw-semibold mb-3">Amenities</h3>
              <div className="d-flex flex-wrap gap-2">
                {location.amenities.map((amenity, index) => (
                  <span key={index} className="badge bg-secondary px-3 py-2">
                    {amenity}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Booking Sidebar */}
          <div className="col-lg-4">
            <motion.div 
              className="card-custom p-4 sticky-top"
              style={{ top: '100px' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-display fw-semibold mb-4">Book Your Seat</h4>
              
              <div className="mb-3">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className="form-control bg-muted border-custom text-light"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  data-testid="date-input"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Select Time</label>
                <select
                  className="form-select bg-muted border-custom text-light"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  data-testid="time-select"
                >
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Day Pass</span>
                <span className="price-highlight fw-bold">₹{location.pricePerDay}</span>
              </div>

              <button 
                className="btn btn-primary-custom w-100 mb-3"
                onClick={handleBookNow}
                data-testid="btn-book-now"
              >
                Book Now
              </button>

              <div className="text-center">
                <small className="text-secondary-custom">
                  <i className="fas fa-clock me-1"></i>
                  Operating Hours: {location.hours}
                </small>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
