import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ActiveBooking {
  id: string;
  locationName: string;
  date: string;
  startTime: string;
  endTime: string;
  seatNumber: string;
  qrCode: string;
}

const CheckIn: React.FC = () => {
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // TODO: Replace with actual booking data from API
  useEffect(() => {
    // Mock active booking for today
    const today = new Date().toISOString().split('T')[0];
    setActiveBooking({
      id: 'booking-today-001',
      locationName: 'Delhi Central',
      date: today,
      startTime: '09:00',
      endTime: '17:00',
      seatNumber: 'A-25',
      qrCode: 'STUDYCOVE-DELHI-A25-20240315'
    });
  }, []);

  const handleCheckIn = () => {
    // TODO: Implement actual check-in functionality
    setIsCheckedIn(true);
    console.log('Checked in to booking:', activeBooking?.id);
  };

  const handleCheckOut = () => {
    // TODO: Implement actual check-out functionality
    setIsCheckedIn(false);
    console.log('Checked out from booking:', activeBooking?.id);
  };

  const isWithinCheckInWindow = () => {
    if (!activeBooking) return false;
    
    const now = new Date();
    const bookingDate = new Date(activeBooking.date);
    const startTime = new Date(`${activeBooking.date}T${activeBooking.startTime}:00`);
    const endTime = new Date(`${activeBooking.date}T${activeBooking.endTime}:00`);
    
    // Allow check-in 30 minutes before start time and until end time
    const earlyCheckIn = new Date(startTime.getTime() - 30 * 60 * 1000);
    
    return now >= earlyCheckIn && now <= endTime;
  };

  const getTimeRemaining = () => {
    if (!activeBooking) return '';
    
    const now = new Date();
    const endTime = new Date(`${activeBooking.date}T${activeBooking.endTime}:00`);
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Session Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
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
          <h1 className="font-display fw-bold mb-3" data-testid="checkin-title">
            Check-in / Check-out
          </h1>
          <p className="fs-5 text-secondary-custom">
            Manage your current study session
          </p>
        </motion.div>

        {activeBooking ? (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Booking Info Card */}
              <motion.div 
                className="card-custom p-5 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center mb-4">
                  <h3 className="font-display fw-bold mb-2">{activeBooking.locationName}</h3>
                  <p className="text-secondary-custom">
                    {new Date(activeBooking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-3 text-center">
                    <div className="bg-muted rounded-3 p-3">
                      <i className="fas fa-chair mb-2" style={{ fontSize: '1.5rem', color: 'var(--accent-1)' }}></i>
                      <h6 className="fw-semibold mb-1">Seat</h6>
                      <p className="mb-0">{activeBooking.seatNumber}</p>
                    </div>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="bg-muted rounded-3 p-3">
                      <i className="fas fa-clock mb-2" style={{ fontSize: '1.5rem', color: 'var(--support-moss)' }}></i>
                      <h6 className="fw-semibold mb-1">Duration</h6>
                      <p className="mb-0">{activeBooking.startTime} - {activeBooking.endTime}</p>
                    </div>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="bg-muted rounded-3 p-3">
                      <i className="fas fa-hourglass-half mb-2" style={{ fontSize: '1.5rem', color: 'var(--support-amber)' }}></i>
                      <h6 className="fw-semibold mb-1">Time Left</h6>
                      <p className="mb-0">{getTimeRemaining()}</p>
                    </div>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="bg-muted rounded-3 p-3">
                      <i className={`fas ${isCheckedIn ? 'fa-check-circle' : 'fa-clock'} mb-2`} 
                         style={{ fontSize: '1.5rem', color: isCheckedIn ? 'var(--support-moss)' : 'var(--support-coral)' }}></i>
                      <h6 className="fw-semibold mb-1">Status</h6>
                      <p className="mb-0">{isCheckedIn ? 'Checked In' : 'Not Checked In'}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center mb-4">
                  <div 
                    className="bg-white rounded-4 p-4 d-inline-block"
                    style={{ border: '8px solid var(--borders)' }}
                  >
                    {/* QR Code Placeholder - In real app, use a QR code library */}
                    <div 
                      className="d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '200px', 
                        height: '200px', 
                        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Cg fill=\'%23000\'%3E%3Crect width=\'20\' height=\'20\' x=\'0\' y=\'0\'/%3E%3Crect width=\'20\' height=\'20\' x=\'40\' y=\'0\'/%3E%3Crect width=\'20\' height=\'20\' x=\'80\' y=\'0\'/%3E%3C/g%3E%3C/svg%3E")',
                        border: '2px solid #000'
                      }}
                    >
                      <div className="text-center">
                        <i className="fas fa-qrcode" style={{ fontSize: '4rem', color: '#000' }}></i>
                        <div className="mt-2 small fw-bold" style={{ color: '#000' }}>
                          {activeBooking.qrCode}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-secondary-custom small mt-3">
                    Show this QR code to security for entry
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="text-center">
                  {!isCheckedIn ? (
                    <button 
                      className="btn btn-primary-custom btn-lg"
                      onClick={handleCheckIn}
                      disabled={!isWithinCheckInWindow()}
                      data-testid="btn-checkin"
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Check In
                    </button>
                  ) : (
                    <button 
                      className="btn btn-outline-custom btn-lg"
                      onClick={handleCheckOut}
                      data-testid="btn-checkout"
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Check Out
                    </button>
                  )}

                  {!isWithinCheckInWindow() && !isCheckedIn && (
                    <div className="mt-3">
                      <small className="text-warning">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Check-in is available 30 minutes before your session starts
                      </small>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div 
                className="card-custom p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h5 className="fw-semibold mb-3">
                  <i className="fas fa-info-circle me-2" style={{ color: 'var(--accent-1)' }}></i>
                  How to Check In
                </h5>
                <ol className="text-secondary-custom">
                  <li className="mb-2">Arrive at your booked StudyCove location</li>
                  <li className="mb-2">Show your QR code to the front desk or security</li>
                  <li className="mb-2">Follow the directions to your assigned seat</li>
                  <li className="mb-2">Start studying and enjoy your session!</li>
                </ol>
                
                <div className="mt-4 p-3 bg-muted rounded-3">
                  <small className="text-secondary-custom">
                    <strong>Note:</strong> Please check out when you're done to help us maintain accurate occupancy data and assist other members.
                  </small>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* No Active Booking */
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-custom p-5 mx-auto" style={{ maxWidth: '500px' }}>
              <i className="fas fa-calendar-times text-secondary-custom mb-4" style={{ fontSize: '4rem' }}></i>
              <h3 className="font-display fw-bold mb-3">No Active Booking</h3>
              <p className="text-secondary-custom mb-4">
                You don't have any active bookings for today. Book a seat to get started!
              </p>
              <button className="btn btn-primary-custom btn-lg" data-testid="btn-book-seat">
                <i className="fas fa-plus me-2"></i>
                Book a Seat
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
