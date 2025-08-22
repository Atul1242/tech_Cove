import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = {
    totalBookings: 24,
    hoursStudied: 186,
    currentStreak: 7,
    pointsEarned: 1250
  };

  const recentBookings = [
    {
      id: 'booking-1',
      location: 'Delhi Central',
      date: '2024-03-15',
      time: '09:00 AM - 05:00 PM',
      status: 'completed'
    },
    {
      id: 'booking-2',
      location: 'Mumbai Bandra',
      date: '2024-03-14',
      time: '10:00 AM - 06:00 PM',
      status: 'completed'
    },
    {
      id: 'booking-3',
      location: 'Delhi Central',
      date: '2024-03-16',
      time: '09:00 AM - 05:00 PM',
      status: 'upcoming'
    }
  ];

  const quickActions = [
    { icon: 'fas fa-calendar-plus', title: 'Book a Seat', path: '/book-seat', color: 'var(--accent-1)' },
    { icon: 'fas fa-qrcode', title: 'Check-in', path: '/check-in', color: 'var(--accent-2)' },
    { icon: 'fas fa-list', title: 'My Bookings', path: '/my-bookings', color: 'var(--support-moss)' },
    { icon: 'fas fa-gift', title: 'Rewards', path: '/rewards', color: 'var(--support-amber)' }
  ];

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Welcome Header */}
        <motion.div 
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-2" data-testid="dashboard-welcome">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-secondary-custom">
            Here's what's happening with your study journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          {[
            { label: 'Total Bookings', value: stats.totalBookings, icon: 'fas fa-calendar-check', color: 'var(--accent-1)' },
            { label: 'Hours Studied', value: stats.hoursStudied, icon: 'fas fa-clock', color: 'var(--support-moss)' },
            { label: 'Current Streak', value: `${stats.currentStreak} days`, icon: 'fas fa-fire', color: 'var(--support-coral)' },
            { label: 'Points Earned', value: stats.pointsEarned, icon: 'fas fa-star', color: 'var(--support-amber)' }
          ].map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <motion.div 
                className="card-custom p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`stat-card-${index}`}
              >
                <i className={stat.icon} style={{ fontSize: '2rem', color: stat.color, marginBottom: '1rem' }}></i>
                <h3 className="fw-bold mb-1">{stat.value}</h3>
                <p className="text-secondary-custom small mb-0">{stat.label}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="row g-5">
          {/* Quick Actions */}
          <div className="col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display fw-semibold mb-4">Quick Actions</h3>
              <div className="row g-3">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-6">
                    <Link 
                      to={action.path}
                      className="text-decoration-none"
                      data-testid={`quick-action-${index}`}
                    >
                      <div className="card-custom p-3 text-center h-100">
                        <i 
                          className={action.icon} 
                          style={{ fontSize: '1.5rem', color: action.color, marginBottom: '0.5rem' }}
                        ></i>
                        <h6 className="fw-semibold mb-0 small">{action.title}</h6>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Bookings */}
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="font-display fw-semibold">Recent Bookings</h3>
                <Link to="/my-bookings" className="btn btn-outline-custom btn-sm">
                  View All
                </Link>
              </div>

              <div className="card-custom">
                {recentBookings.map((booking, index) => (
                  <div 
                    key={booking.id} 
                    className={`p-4 ${index < recentBookings.length - 1 ? 'border-bottom border-custom' : ''}`}
                    data-testid={`booking-item-${index}`}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="fw-semibold mb-1">{booking.location}</h6>
                        <p className="text-secondary-custom small mb-1">
                          <i className="fas fa-calendar me-2"></i>
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p className="text-secondary-custom small mb-0">
                          <i className="fas fa-clock me-2"></i>
                          {booking.time}
                        </p>
                      </div>
                      <span 
                        className={`badge px-3 py-1 ${
                          booking.status === 'completed' 
                            ? 'bg-success' 
                            : booking.status === 'upcoming'
                            ? 'bg-primary'
                            : 'bg-warning'
                        }`}
                        style={{ borderRadius: '12px' }}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Membership Status */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h4 className="font-display fw-bold mb-2">
                  {user?.membershipType ? `${user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} Membership` : 'No Active Membership'}
                </h4>
                <p className="text-secondary-custom mb-0">
                  {user?.membershipType 
                    ? `Your membership expires on ${user.membershipExpiry ? new Date(user.membershipExpiry).toLocaleDateString() : 'N/A'}`
                    : 'Upgrade to a membership for unlimited access and exclusive benefits'
                  }
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link 
                  to="/membership" 
                  className="btn btn-primary-custom"
                  data-testid="btn-manage-membership"
                >
                  {user?.membershipType ? 'Manage Membership' : 'Get Membership'}
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;
