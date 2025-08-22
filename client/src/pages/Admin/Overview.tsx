import React from 'react';
import { motion } from 'framer-motion';

const Overview: React.FC = () => {
  // TODO: Replace with actual data from API
  const stats = {
    totalLocations: 6,
    totalSeats: 1240,
    activeBookings: 89,
    totalRevenue: 485000,
    occupancyRate: 72,
    newMembersToday: 12,
    avgSessionDuration: 5.2,
    customerSatisfaction: 4.8
  };

  const recentBookings = [
    {
      id: 'B001',
      user: 'Arjun Sharma',
      location: 'Delhi Central',
      seat: 'A-25',
      time: '09:00 - 17:00',
      status: 'active'
    },
    {
      id: 'B002',
      user: 'Priya Patel',
      location: 'Mumbai Bandra',
      seat: 'B-12',
      time: '10:00 - 18:00',
      status: 'completed'
    },
    {
      id: 'B003',
      user: 'Rohit Kumar',
      location: 'Bangalore Koramangala',
      seat: 'C-08',
      time: '14:00 - 20:00',
      status: 'upcoming'
    }
  ];

  const locationStats = [
    { name: 'Delhi Central', occupancy: 85, revenue: 125000, seats: 150 },
    { name: 'Mumbai Bandra', occupancy: 78, revenue: 98000, seats: 200 },
    { name: 'Bangalore Koramangala', occupancy: 65, revenue: 87000, seats: 180 },
    { name: 'Pune Koregaon', occupancy: 58, revenue: 65000, seats: 120 }
  ];

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
            <h1 className="font-display fw-bold mb-2" data-testid="admin-overview-title">
              Admin Dashboard
            </h1>
            <p className="text-secondary-custom">
              Overview of StudyCove operations and performance
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-custom">
              <i className="fas fa-download me-2"></i>
              Export Report
            </button>
            <button className="btn btn-primary-custom">
              <i className="fas fa-plus me-2"></i>
              Add Location
            </button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="row g-4 mb-5">
          {[
            { 
              label: 'Total Revenue', 
              value: `₹${(stats.totalRevenue / 1000).toFixed(0)}K`, 
              icon: 'fas fa-rupee-sign', 
              color: 'var(--accent-1)',
              change: '+12.5%'
            },
            { 
              label: 'Active Bookings', 
              value: stats.activeBookings, 
              icon: 'fas fa-calendar-check', 
              color: 'var(--support-moss)',
              change: '+8.2%'
            },
            { 
              label: 'Occupancy Rate', 
              value: `${stats.occupancyRate}%`, 
              icon: 'fas fa-chart-pie', 
              color: 'var(--support-amber)',
              change: '+5.1%'
            },
            { 
              label: 'New Members', 
              value: stats.newMembersToday, 
              icon: 'fas fa-user-plus', 
              color: 'var(--accent-2)',
              change: '+15.3%'
            }
          ].map((metric, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <motion.div 
                className="card-custom p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`metric-card-${index}`}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: metric.color + '20',
                      color: metric.color
                    }}
                  >
                    <i className={metric.icon}></i>
                  </div>
                  <span 
                    className="badge px-2 py-1"
                    style={{ 
                      background: 'var(--support-moss)', 
                      color: 'white',
                      borderRadius: '8px'
                    }}
                  >
                    {metric.change}
                  </span>
                </div>
                <h3 className="fw-bold mb-1">{metric.value}</h3>
                <p className="text-secondary-custom small mb-0">{metric.label}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="row g-5">
          {/* Recent Bookings */}
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-display fw-semibold mb-4">Recent Bookings</h4>
              <div className="card-custom">
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>User</th>
                        <th>Location</th>
                        <th>Seat</th>
                        <th>Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking, index) => (
                        <tr key={booking.id} data-testid={`booking-row-${index}`}>
                          <td className="fw-semibold">{booking.id}</td>
                          <td>{booking.user}</td>
                          <td>{booking.location}</td>
                          <td>{booking.seat}</td>
                          <td>{booking.time}</td>
                          <td>
                            <span 
                              className={`badge px-2 py-1 ${
                                booking.status === 'active' ? 'bg-success' :
                                booking.status === 'completed' ? 'bg-secondary' : 'bg-primary'
                              }`}
                              style={{ borderRadius: '8px' }}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Location Performance */}
          <div className="col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="font-display fw-semibold mb-4">Location Performance</h4>
              <div className="card-custom p-4">
                {locationStats.map((location, index) => (
                  <div key={index} className="mb-4" data-testid={`location-stat-${index}`}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-semibold mb-0">{location.name}</h6>
                      <span className="small text-secondary-custom">{location.occupancy}%</span>
                    </div>
                    <div className="progress mb-2" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${location.occupancy}%`,
                          background: location.occupancy > 80 ? 'var(--support-coral)' :
                                     location.occupancy > 60 ? 'var(--support-amber)' : 'var(--support-moss)'
                        }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between text-secondary-custom small">
                      <span>{location.seats} seats</span>
                      <span>₹{(location.revenue / 1000).toFixed(0)}K revenue</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="font-display fw-bold text-center mb-4">Quick Actions</h4>
            <div className="row g-4">
              {[
                { icon: 'fas fa-eye', title: 'Live Floor View', desc: 'Monitor real-time occupancy', link: '/admin/live-floor' },
                { icon: 'fas fa-users', title: 'Manage Members', desc: 'View and edit member profiles', link: '/admin/members' },
                { icon: 'fas fa-chart-bar', title: 'Analytics', desc: 'Detailed performance reports', link: '/admin/analytics' },
                { icon: 'fas fa-cog', title: 'Settings', desc: 'System configuration', link: '/admin/settings' }
              ].map((action, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="card-custom p-4 text-center h-100">
                    <i 
                      className={action.icon} 
                      style={{ fontSize: '2rem', color: 'var(--accent-1)', marginBottom: '1rem' }}
                    ></i>
                    <h6 className="fw-semibold mb-2">{action.title}</h6>
                    <p className="text-secondary-custom small mb-3">{action.desc}</p>
                    <button className="btn btn-outline-custom btn-sm">
                      Access
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Overview;
