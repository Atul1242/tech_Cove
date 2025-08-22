import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Booking {
  id: string;
  locationName: string;
  locationId: string;
  date: string;
  startTime: string;
  endTime: string;
  seatNumber: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  amount: number;
  checkInTime?: string;
  checkOutTime?: string;
}

const MyBookings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  // TODO: Replace with actual data from API
  const bookings: Booking[] = [
    {
      id: 'book-001',
      locationName: 'Delhi Central',
      locationId: 'delhi-central',
      date: '2024-03-20',
      startTime: '09:00',
      endTime: '17:00',
      seatNumber: 'A-25',
      status: 'upcoming',
      amount: 199
    },
    {
      id: 'book-002',
      locationName: 'Mumbai Bandra',
      locationId: 'mumbai-bandra',
      date: '2024-03-15',
      startTime: '10:00',
      endTime: '18:00',
      seatNumber: 'B-12',
      status: 'completed',
      amount: 249,
      checkInTime: '10:05',
      checkOutTime: '17:45'
    },
    {
      id: 'book-003',
      locationName: 'Delhi Central',
      locationId: 'delhi-central',
      date: '2024-03-18',
      startTime: '14:00',
      endTime: '20:00',
      seatNumber: 'C-08',
      status: 'active',
      amount: 149,
      checkInTime: '14:02'
    },
    {
      id: 'book-004',
      locationName: 'Bangalore Koramangala',
      locationId: 'bangalore-koramangala',
      date: '2024-03-10',
      startTime: '09:00',
      endTime: '17:00',
      seatNumber: 'A-15',
      status: 'cancelled',
      amount: 179
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
    { id: 'active', label: 'Active', count: bookings.filter(b => b.status === 'active').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
  ];

  const filteredBookings = selectedTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'var(--accent-1)';
      case 'active': return 'var(--support-moss)';
      case 'completed': return 'var(--text-secondary)';
      case 'cancelled': return 'var(--support-coral)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return 'fas fa-clock';
      case 'active': return 'fas fa-play-circle';
      case 'completed': return 'fas fa-check-circle';
      case 'cancelled': return 'fas fa-times-circle';
      default: return 'fas fa-circle';
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    // TODO: Implement booking cancellation
    console.log('Cancelling booking:', bookingId);
  };

  const handleRebookSeat = (booking: Booking) => {
    // TODO: Implement rebooking
    console.log('Rebooking:', booking);
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="d-flex justify-content-between align-items-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-display fw-bold mb-2" data-testid="bookings-title">
              My Bookings
            </h1>
            <p className="text-secondary-custom">
              Manage and track all your study session bookings
            </p>
          </div>
          <button className="btn btn-primary-custom" data-testid="btn-new-booking">
            <i className="fas fa-plus me-2"></i>
            New Booking
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="d-flex bg-panel rounded-4 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`btn flex-fill ${selectedTab === tab.id ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                onClick={() => setSelectedTab(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bookings List */}
        <div className="row g-4">
          {filteredBookings.map((booking, index) => (
            <div key={booking.id} className="col-12">
              <motion.div 
                className="card-custom p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                data-testid={`booking-card-${booking.id}`}
              >
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div className="d-flex align-items-start">
                      <div className="me-4">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ 
                            width: '60px', 
                            height: '60px', 
                            background: 'var(--muted)',
                            color: getStatusColor(booking.status)
                          }}
                        >
                          <i className={getStatusIcon(booking.status)} style={{ fontSize: '1.5rem' }}></i>
                        </div>
                      </div>
                      
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-2">
                          <h5 className="fw-semibold mb-0 me-3">{booking.locationName}</h5>
                          <span 
                            className="badge px-3 py-1"
                            style={{ 
                              background: getStatusColor(booking.status), 
                              color: 'white',
                              borderRadius: '12px'
                            }}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="row g-3 text-secondary-custom small">
                          <div className="col-md-3">
                            <i className="fas fa-calendar me-2"></i>
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="col-md-3">
                            <i className="fas fa-clock me-2"></i>
                            {booking.startTime} - {booking.endTime}
                          </div>
                          <div className="col-md-3">
                            <i className="fas fa-chair me-2"></i>
                            Seat {booking.seatNumber}
                          </div>
                          <div className="col-md-3">
                            <i className="fas fa-rupee-sign me-2"></i>
                            ₹{booking.amount}
                          </div>
                        </div>

                        {booking.checkInTime && (
                          <div className="mt-2 text-secondary-custom small">
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Checked in at {booking.checkInTime}
                            {booking.checkOutTime && (
                              <span className="ms-3">
                                <i className="fas fa-sign-out-alt me-2"></i>
                                Checked out at {booking.checkOutTime}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                    <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                      {booking.status === 'upcoming' && (
                        <>
                          <button 
                            className="btn btn-primary-custom btn-sm"
                            data-testid={`btn-checkin-${booking.id}`}
                          >
                            <i className="fas fa-qrcode me-2"></i>
                            Check-in
                          </button>
                          <button 
                            className="btn btn-outline-custom btn-sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            data-testid={`btn-cancel-${booking.id}`}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'active' && (
                        <button 
                          className="btn btn-outline-custom btn-sm"
                          data-testid={`btn-checkout-${booking.id}`}
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Check-out
                        </button>
                      )}
                      
                      {booking.status === 'completed' && (
                        <>
                          <button 
                            className="btn btn-primary-custom btn-sm"
                            onClick={() => handleRebookSeat(booking)}
                            data-testid={`btn-rebook-${booking.id}`}
                          >
                            <i className="fas fa-redo me-2"></i>
                            Book Again
                          </button>
                          <button 
                            className="btn btn-outline-custom btn-sm"
                            data-testid={`btn-receipt-${booking.id}`}
                          >
                            <i className="fas fa-receipt me-2"></i>
                            Receipt
                          </button>
                        </>
                      )}

                      {booking.status === 'cancelled' && (
                        <button 
                          className="btn btn-primary-custom btn-sm"
                          onClick={() => handleRebookSeat(booking)}
                          data-testid={`btn-rebook-cancelled-${booking.id}`}
                        >
                          <i className="fas fa-redo me-2"></i>
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-calendar-times text-secondary-custom mb-3" style={{ fontSize: '4rem' }}></i>
            <h3 className="text-secondary-custom mb-3">No bookings found</h3>
            <p className="text-secondary-custom mb-4">
              {selectedTab === 'all' 
                ? "You haven't made any bookings yet. Start by booking your first study session!"
                : `No ${selectedTab} bookings at the moment.`
              }
            </p>
            <button className="btn btn-primary-custom">
              <i className="fas fa-plus me-2"></i>
              Book Your First Seat
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
