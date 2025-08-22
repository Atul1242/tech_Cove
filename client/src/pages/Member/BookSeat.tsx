import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LocationCard from '../../components/common/LocationCard';
import { Location } from '../../types';
import locationsData from '../../data/locations.json';

const BookSeat: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [duration, setDuration] = useState('8');
  const [step, setStep] = useState(1);
  
  const locations = locationsData as Location[];
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setStep(2);
  };

  const handleBooking = () => {
    // TODO: Implement booking functionality
    console.log('Booking:', {
      location: selectedLocation,
      date: selectedDate,
      time: selectedTime,
      duration
    });
    setStep(3);
  };

  const calculatePrice = () => {
    if (!selectedLocationData) return 0;
    const hours = parseInt(duration);
    const hourlyRate = Math.round(selectedLocationData.pricePerDay / 8);
    return hourlyRate * hours;
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-3" data-testid="book-seat-title">
            Book Your Study Seat
          </h1>
          <p className="fs-5 text-secondary-custom">
            Reserve your perfect study space in just a few clicks
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="d-flex align-items-center justify-content-center">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div 
                  className={`rounded-circle d-flex align-items-center justify-content-center ${
                    step >= stepNum ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{ width: '40px', height: '40px' }}
                >
                  <span className="fw-bold text-white">{stepNum}</span>
                </div>
                {stepNum < 3 && (
                  <div 
                    className={`mx-3 ${step > stepNum ? 'bg-primary' : 'bg-muted'}`}
                    style={{ height: '2px', width: '60px' }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-2">
            <div className="text-center" style={{ width: '140px' }}>
              <small className="text-secondary-custom">Choose Location</small>
            </div>
            <div className="text-center" style={{ width: '140px' }}>
              <small className="text-secondary-custom">Select Time</small>
            </div>
            <div className="text-center" style={{ width: '140px' }}>
              <small className="text-secondary-custom">Confirm</small>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Location Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display fw-semibold mb-4">Select a Location</h3>
            <div className="row g-4">
              {locations.map((location) => (
                <div key={location.id} className="col-lg-4 col-md-6">
                  <div 
                    onClick={() => handleLocationSelect(location.id)}
                    style={{ cursor: 'pointer' }}
                    data-testid={`location-select-${location.id}`}
                  >
                    <LocationCard location={location} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Date and Time Selection */}
        {step === 2 && selectedLocationData && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="d-flex align-items-center mb-4">
                  <button 
                    className="btn btn-outline-custom me-3"
                    onClick={() => setStep(1)}
                    data-testid="btn-back-location"
                  >
                    <i className="fas fa-arrow-left me-2"></i>Back
                  </button>
                  <div>
                    <h3 className="font-display fw-semibold mb-1">Select Date & Time</h3>
                    <p className="text-secondary-custom mb-0">
                      Booking for {selectedLocationData.name}
                    </p>
                  </div>
                </div>

                <div className="card-custom p-4 mb-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Date</label>
                      <input
                        type="date"
                        className="form-control bg-muted border-custom text-light"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        data-testid="input-date"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Duration (hours)</label>
                      <select
                        className="form-select bg-muted border-custom text-light"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        data-testid="select-duration"
                      >
                        <option value="2">2 hours</option>
                        <option value="4">4 hours</option>
                        <option value="6">6 hours</option>
                        <option value="8">8 hours (Full day)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card-custom p-4">
                  <label className="form-label fw-semibold mb-3">Start Time</label>
                  <div className="row g-2">
                    {timeSlots.map((time) => (
                      <div key={time} className="col-lg-3 col-md-4 col-6">
                        <button
                          className={`btn w-100 ${
                            selectedTime === time ? 'btn-primary-custom' : 'btn-outline-custom'
                          }`}
                          onClick={() => setSelectedTime(time)}
                          data-testid={`time-slot-${time}`}
                        >
                          {new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card-custom p-4 sticky-top" style={{ top: '100px' }}>
                  <h5 className="fw-semibold mb-3">Booking Summary</h5>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Location:</span>
                      <span>{selectedLocationData.name}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Date:</span>
                      <span>{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Time:</span>
                      <span>{new Date(`2024-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Duration:</span>
                      <span>{duration} hours</span>
                    </div>
                  </div>

                  <hr className="border-custom" />

                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-semibold">Total:</span>
                    <span className="fw-bold price-highlight">₹{calculatePrice()}</span>
                  </div>

                  <button 
                    className="btn btn-primary-custom w-100"
                    onClick={handleBooking}
                    data-testid="btn-confirm-booking"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-custom p-5 mx-auto" style={{ maxWidth: '500px' }}>
              <i className="fas fa-check-circle text-success mb-4" style={{ fontSize: '4rem' }}></i>
              <h3 className="font-display fw-bold mb-3">Booking Confirmed!</h3>
              <p className="text-secondary-custom mb-4">
                Your seat has been reserved successfully. Check your email for the QR code.
              </p>
              
              <div className="d-flex gap-3 justify-content-center">
                <button 
                  className="btn btn-primary-custom"
                  onClick={() => setStep(1)}
                  data-testid="btn-book-another"
                >
                  Book Another Seat
                </button>
                <button className="btn btn-outline-custom" data-testid="btn-view-bookings">
                  View My Bookings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookSeat;
