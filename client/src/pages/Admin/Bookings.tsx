import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AdminBooking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  locationId: string;
  locationName: string;
  date: string;
  startTime: string;
  endTime: string;
  seatNumber: string;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled' | 'no-show';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  checkInTime?: string;
  checkOutTime?: string;
  createdAt: string;
}

const AdminBookings: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Replace with actual data from API
  const bookings: AdminBooking[] = [
    {
      id: 'B2024001',
      userId: 'U001',
      userName: 'Arjun Sharma',
      userEmail: 'arjun@example.com',
      locationId: 'delhi-central',
      locationName: 'Delhi Central',
      date: '2024-03-15',
      startTime: '09:00',
      endTime: '17:00',
      seatNumber: 'A-25',
      status: 'checked-in',
      amount: 199,
      paymentStatus: 'paid',
      checkInTime: '09:05',
      createdAt: '2024-03-14T10:30:00Z'
    },
    {
      id: 'B2024002',
      userId: 'U002',
      userName: 'Priya Patel',
      userEmail: 'priya@example.com',
      locationId: 'mumbai-bandra',
      locationName: 'Mumbai Bandra',
      date: '2024-03-15',
      startTime: '10:00',
      endTime: '18:00',
      seatNumber: 'B-12',
      status: 'completed',
      amount: 249,
      paymentStatus: 'paid',
      checkInTime: '10:02',
      checkOutTime: '17:45',
      createdAt: '2024-03-14T15:20:00Z'
    },
    {
      id: 'B2024003',
      userId: 'U003',
      userName: 'Rohit Kumar',
      userEmail: 'rohit@example.com',
      locationId: 'bangalore-koramangala',
      locationName: 'Bangalore Koramangala',
      date: '2024-03-16',
      startTime: '14:00',
      endTime: '20:00',
      seatNumber: 'C-08',
      status: 'confirmed',
      amount: 179,
      paymentStatus: 'paid',
      createdAt: '2024-03-15T08:15:00Z'
    },
    {
      id: 'B2024004',
      userId: 'U004',
      userName: 'Sneha Reddy',
      userEmail: 'sneha@example.com',
      locationId: 'delhi-central',
      locationName: 'Delhi Central',
      date: '2024-03-14',
      startTime: '11:00',
      endTime: '15:00',
      seatNumber: 'A-10',
      status: 'no-show',
      amount: 99,
      paymentStatus: 'paid',
      createdAt: '2024-03-13T16:45:00Z'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'checked-in', label: 'Checked In' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'no-show', label: 'No Show' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'delhi-central', label: 'Delhi Central' },
    { value: 'mumbai-bandra', label: 'Mumbai Bandra' },
    { value: 'bangalore-koramangala', label: 'Bangalore Koramangala' },
    { value: 'pune-koregaon', label: 'Pune Koregaon' }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || booking.locationId === selectedLocation;
    const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesLocation && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'var(--accent-1)';
      case 'checked-in': return 'var(--support-moss)';
      case 'completed': return 'var(--text-secondary)';
      case 'cancelled': return 'var(--support-coral)';
      case 'no-show': return 'var(--accent-2)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'var(--support-moss)';
      case 'pending': return 'var(--support-amber)';
      case 'refunded': return 'var(--support-coral)';
      default: return 'var(--text-secondary)';
    }
  };

  const handleBookingAction = (bookingId: string, action: string) => {
    // TODO: Implement booking actions
    console.log(`${action} booking:`, bookingId);
  };

  const totalRevenue = filteredBookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.amount, 0);

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
            <h1 className="font-display fw-bold mb-2" data-testid="admin-bookings-title">
              Booking Management
            </h1>
            <p className="text-secondary-custom">
              Monitor and manage all study session bookings
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-custom">
              <i className="fas fa-download me-2"></i>
              Export Data
            </button>
            <button className="btn btn-primary-custom">
              <i className="fas fa-plus me-2"></i>
              Manual Booking
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-calendar-check mb-3" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
              <h4 className="fw-bold mb-1">{filteredBookings.length}</h4>
              <p className="text-secondary-custom small mb-0">Total Bookings</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-rupee-sign mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h4 className="fw-bold mb-1">₹{totalRevenue.toLocaleString()}</h4>
              <p className="text-secondary-custom small mb-0">Total Revenue</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-user-check mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h4 className="fw-bold mb-1">
                {filteredBookings.filter(b => b.status === 'checked-in').length}
              </h4>
              <p className="text-secondary-custom small mb-0">Active Sessions</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-user-times mb-3" style={{ fontSize: '2rem', color: 'var(--support-coral)' }}></i>
              <h4 className="fw-bold mb-1">
                {filteredBookings.filter(b => b.status === 'no-show').length}
              </h4>
              <p className="text-secondary-custom small mb-0">No Shows</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="card-custom p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small">Search</label>
              <input
                type="text"
                className="form-control bg-muted border-custom text-light"
                placeholder="Search by name, email, or booking ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-bookings"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Status</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                data-testid="filter-status"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Location</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                data-testid="filter-location"
              >
                {locationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Date</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                data-testid="filter-date"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div 
          className="card-custom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Seat</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.id} data-testid={`booking-row-${index}`}>
                    <td className="fw-semibold">{booking.id}</td>
                    <td>
                      <div>
                        <div className="fw-semibold">{booking.userName}</div>
                        <small className="text-secondary-custom">{booking.userEmail}</small>
                      </div>
                    </td>
                    <td>{booking.locationName}</td>
                    <td>
                      <div>
                        <div>{new Date(booking.date).toLocaleDateString()}</div>
                        <small className="text-secondary-custom">
                          {booking.startTime} - {booking.endTime}
                        </small>
                      </div>
                    </td>
                    <td>{booking.seatNumber}</td>
                    <td>₹{booking.amount}</td>
                    <td>
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: getStatusColor(booking.status),
                          color: 'white',
                          borderRadius: '8px'
                        }}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: getPaymentStatusColor(booking.paymentStatus),
                          color: 'white',
                          borderRadius: '8px'
                        }}
                      >
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button 
                          className="btn btn-outline-custom btn-sm dropdown-toggle" 
                          type="button" 
                          data-bs-toggle="dropdown"
                          data-testid={`booking-actions-${booking.id}`}
                        >
                          Actions
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-panel border-custom">
                          <li>
                            <button 
                              className="dropdown-item text-light"
                              onClick={() => handleBookingAction(booking.id, 'view')}
                            >
                              View Details
                            </button>
                          </li>
                          <li>
                            <button 
                              className="dropdown-item text-light"
                              onClick={() => handleBookingAction(booking.id, 'contact')}
                            >
                              Contact User
                            </button>
                          </li>
                          {booking.status === 'confirmed' && (
                            <li>
                              <button 
                                className="dropdown-item text-light"
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                              >
                                Cancel Booking
                              </button>
                            </li>
                          )}
                          {booking.paymentStatus === 'paid' && (
                            <li>
                              <button 
                                className="dropdown-item text-light"
                                onClick={() => handleBookingAction(booking.id, 'refund')}
                              >
                                Process Refund
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* No Results */}
        {filteredBookings.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-calendar-times text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h4 className="text-secondary-custom mb-3">No bookings found</h4>
            <p className="text-secondary-custom">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
