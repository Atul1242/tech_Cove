import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import {
  mockBookLoans,
  mockUpcomingDues,
  mockReservedSeats,
  mockSubscription,
  mockNotifications,
  mockDigitalID,
  formatDueDate,
  getDaysUntilDue,
  type BookLoan,
  type Notification
} from '../../data/mockUserData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'dues' | 'id'>('overview');
  const [loans, setLoans] = useState<BookLoan[]>(mockBookLoans);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [renewingLoanId, setRenewingLoanId] = useState<string | null>(null);

  const stats = {
    totalBookings: 24,
    hoursStudied: 186,
    currentStreak: 7,
    pointsEarned: 1250,
    activeLoans: loans.filter(l => l.status === 'active').length,
    upcomingDues: mockUpcomingDues.filter(d => getDaysUntilDue(d.dueDate) <= 3).length
  };

  const handleRenewBook = async (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan || loan.renewalsLeft <= 0) return;

    setRenewingLoanId(loanId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoans(prev => prev.map(l => {
      if (l.id === loanId) {
        const newDueDate = new Date(l.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 14);
        return {
          ...l,
          dueDate: newDueDate.toISOString().split('T')[0],
          renewalsLeft: l.renewalsLeft - 1
        };
      }
      return l;
    }));
    
    setRenewingLoanId(null);
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notifId ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const quickActions = [
    { icon: 'fas fa-calendar-plus', title: 'Book a Seat', path: '/book-seat', color: 'var(--accent-1)' },
    { icon: 'fas fa-qrcode', title: 'E-Library Card', path: '#', color: 'var(--accent-2)', onClick: () => setActiveTab('id') },
    { icon: 'fas fa-list', title: 'My Bookings', path: '/my-bookings', color: 'var(--support-moss)' },
    { icon: 'fas fa-gift', title: 'Rewards', path: '/rewards', color: 'var(--support-amber)' }
  ];

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Welcome Header with Notifications */}
        <motion.div 
          className="d-flex justify-content-between align-items-start mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-display fw-bold mb-2" data-testid="dashboard-welcome">
              Welcome back, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-secondary-custom">
              Here's what's happening with your study journey
            </p>
          </div>
          
          {/* Notification Bell */}
          <div className="position-relative">
            <button 
              className="btn btn-outline-custom position-relative"
              onClick={() => setShowNotifications(!showNotifications)}
              data-testid="notification-bell"
            >
              <i className="fas fa-bell"></i>
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="position-absolute end-0 mt-2 card-custom"
                  style={{ width: '350px', maxHeight: '400px', overflowY: 'auto', zIndex: 1000 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-3 border-bottom border-custom">
                    <h6 className="fw-semibold mb-0">Notifications</h6>
                  </div>
                  {notifications.map(notif => (
                    <div 
                      key={notif.id}
                      className={`p-3 border-bottom border-custom ${!notif.read ? 'bg-muted' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => markNotificationRead(notif.id)}
                    >
                      <div className="d-flex align-items-start gap-2">
                        <i className={`fas ${
                          notif.type === 'due_reminder' ? 'fa-clock text-warning' :
                          notif.type === 'renewal' ? 'fa-sync text-success' :
                          notif.type === 'promotion' ? 'fa-tag text-primary' :
                          'fa-info-circle text-secondary'
                        } mt-1`}></i>
                        <div>
                          <h6 className="small fw-semibold mb-1">{notif.title}</h6>
                          <p className="small text-secondary-custom mb-0">{notif.message}</p>
                          <small className="text-muted">{new Date(notif.timestamp).toLocaleDateString()}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="d-flex gap-2 flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: 'fa-th-large' },
              { id: 'loans', label: 'Book Loans', icon: 'fa-book' },
              { id: 'dues', label: 'Due Dates', icon: 'fa-calendar-alt' },
              { id: 'id', label: 'E-Library Card', icon: 'fa-id-card' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`btn ${activeTab === tab.id ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                data-testid={`tab-${tab.id}`}
              >
                <i className={`fas ${tab.icon} me-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="row g-4 mb-5">
              {[
                { label: 'Total Bookings', value: stats.totalBookings, icon: 'fas fa-calendar-check', color: 'var(--accent-1)' },
                { label: 'Hours Studied', value: stats.hoursStudied, icon: 'fas fa-clock', color: 'var(--support-moss)' },
                { label: 'Current Streak', value: `${stats.currentStreak} days`, icon: 'fas fa-fire', color: 'var(--support-coral)' },
                { label: 'Points Earned', value: stats.pointsEarned, icon: 'fas fa-star', color: 'var(--support-amber)' },
                { label: 'Active Loans', value: stats.activeLoans, icon: 'fas fa-book', color: 'var(--accent-2)' },
                { label: 'Upcoming Dues', value: stats.upcomingDues, icon: 'fas fa-exclamation-circle', color: 'var(--support-coral)' }
              ].map((stat, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-6">
                  <motion.div 
                    className="card-custom p-3 text-center h-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    data-testid={`stat-card-${index}`}
                  >
                    <i className={stat.icon} style={{ fontSize: '1.5rem', color: stat.color, marginBottom: '0.5rem' }}></i>
                    <h4 className="fw-bold mb-1">{stat.value}</h4>
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
                        {action.path === '#' ? (
                          <button 
                            className="text-decoration-none w-100 border-0 bg-transparent"
                            onClick={action.onClick}
                            data-testid={`quick-action-${index}`}
                          >
                            <div className="card-custom p-3 text-center h-100">
                              <i 
                                className={action.icon} 
                                style={{ fontSize: '1.5rem', color: action.color, marginBottom: '0.5rem' }}
                              ></i>
                              <h6 className="fw-semibold mb-0 small">{action.title}</h6>
                            </div>
                          </button>
                        ) : (
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
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Upcoming Dues & Reserved Seats */}
              <div className="col-lg-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {/* Upcoming Due Dates */}
                  <h3 className="font-display fw-semibold mb-4">
                    <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                    Upcoming Due Dates
                  </h3>
                  <div className="card-custom mb-4">
                    {mockUpcomingDues.slice(0, 3).map((due, index) => (
                      <div 
                        key={due.id} 
                        className={`p-3 ${index < 2 ? 'border-bottom border-custom' : ''}`}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-3">
                            <div className={`rounded-circle p-2 ${
                              due.priority === 'high' ? 'bg-danger bg-opacity-10' :
                              due.priority === 'medium' ? 'bg-warning bg-opacity-10' :
                              'bg-success bg-opacity-10'
                            }`}>
                              <i className={`fas ${
                                due.type === 'book' ? 'fa-book' :
                                due.type === 'seat' ? 'fa-chair' : 'fa-calendar-check'
                              } ${
                                due.priority === 'high' ? 'text-danger' :
                                due.priority === 'medium' ? 'text-warning' :
                                'text-success'
                              }`}></i>
                            </div>
                            <div>
                              <h6 className="fw-semibold mb-1">{due.title}</h6>
                              <p className="text-secondary-custom small mb-0">
                                {formatDueDate(due.dueDate)}
                                {due.dueTime && ` at ${due.dueTime}`}
                              </p>
                            </div>
                          </div>
                          <Link to={due.actionUrl} className="btn btn-sm btn-outline-custom">
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reserved Seats */}
                  <h3 className="font-display fw-semibold mb-4">
                    <i className="fas fa-chair me-2" style={{ color: 'var(--accent-1)' }}></i>
                    Reserved Seats
                  </h3>
                  <div className="card-custom">
                    {mockReservedSeats.map((seat, index) => (
                      <div 
                        key={seat.id} 
                        className={`p-3 ${index < mockReservedSeats.length - 1 ? 'border-bottom border-custom' : ''}`}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="fw-semibold mb-1">{seat.locationName}</h6>
                            <p className="text-secondary-custom small mb-1">
                              <i className="fas fa-calendar me-2"></i>
                              {new Date(seat.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                            <p className="text-secondary-custom small mb-1">
                              <i className="fas fa-clock me-2"></i>
                              {seat.startTime} - {seat.endTime}
                            </p>
                            <div className="d-flex gap-2 flex-wrap">
                              <span className="badge bg-light text-dark">Seat {seat.seatNumber}</span>
                              {seat.amenities.slice(0, 2).map((a, i) => (
                                <span key={i} className="badge bg-muted text-secondary-custom">{a}</span>
                              ))}
                            </div>
                          </div>
                          <span className={`badge ${
                            seat.status === 'confirmed' ? 'bg-success' :
                            seat.status === 'pending' ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {seat.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Subscription Status */}
            <motion.section 
              className="py-4 mt-5 bg-panel rounded-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span className="badge bg-gradient px-3 py-2" style={{ background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' }}>
                        {mockSubscription.plan.toUpperCase()}
                      </span>
                      <span className="text-secondary-custom">
                        {mockSubscription.daysRemaining} days remaining
                      </span>
                    </div>
                    <p className="text-secondary-custom mb-0">
                      Renews on {new Date(mockSubscription.endDate).toLocaleDateString()}
                      {mockSubscription.autoRenew && ' (Auto-renewal on)'}
                    </p>
                  </div>
                  <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                    <Link to="/membership" className="btn btn-primary-custom" data-testid="btn-manage-membership">
                      Manage Subscription
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
          </>
        )}

        {/* Book Loans Tab */}
        {activeTab === 'loans' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-display fw-semibold mb-0">Your Book Loans</h3>
              <span className="text-secondary-custom">
                {loans.filter(l => l.status === 'active').length} active loans
              </span>
            </div>
            
            <div className="row g-4">
              {loans.map((loan, index) => (
                <div key={loan.id} className="col-md-6 col-lg-4">
                  <motion.div 
                    className="card-custom h-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="p-4">
                      <div className="d-flex gap-3">
                        <div 
                          className="rounded-3 bg-muted d-flex align-items-center justify-content-center"
                          style={{ width: '80px', height: '120px', flexShrink: 0 }}
                        >
                          <i className="fas fa-book" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-semibold mb-1">{loan.title}</h6>
                          <p className="text-secondary-custom small mb-2">{loan.author}</p>
                          <span className={`badge ${
                            loan.status === 'active' ? 'bg-success' :
                            loan.status === 'overdue' ? 'bg-danger' : 'bg-secondary'
                          } mb-2`}>
                            {loan.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-top border-custom">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-secondary-custom small">Due Date</span>
                          <span className={`small fw-semibold ${
                            getDaysUntilDue(loan.dueDate) <= 0 ? 'text-danger' :
                            getDaysUntilDue(loan.dueDate) <= 3 ? 'text-warning' : ''
                          }`}>
                            {new Date(loan.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-secondary-custom small">Renewals Left</span>
                          <span className="small fw-semibold">{loan.renewalsLeft}</span>
                        </div>
                        
                        <button
                          className="btn w-100"
                          disabled={loan.renewalsLeft <= 0 || loan.status === 'returned'}
                          onClick={() => handleRenewBook(loan.id)}
                          data-testid={`renew-btn-${loan.id}`}
                          style={{
                            background: loan.renewalsLeft > 0 && loan.status !== 'returned'
                              ? 'linear-gradient(135deg, var(--accent-1), var(--accent-2))'
                              : 'var(--muted)',
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          {renewingLoanId === loan.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Renewing...
                            </>
                          ) : loan.renewalsLeft > 0 ? (
                            <>
                              <i className="fas fa-sync me-2"></i>
                              Renew Now
                            </>
                          ) : (
                            'No Renewals Left'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Due Dates Tab */}
        {activeTab === 'dues' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="row g-4">
              <div className="col-lg-8">
                <h3 className="font-display fw-semibold mb-4">All Upcoming Due Dates</h3>
                <div className="card-custom">
                  {mockUpcomingDues.map((due, index) => (
                    <div 
                      key={due.id} 
                      className={`p-4 ${index < mockUpcomingDues.length - 1 ? 'border-bottom border-custom' : ''}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`rounded-circle p-3 ${
                            due.priority === 'high' ? 'bg-danger bg-opacity-10' :
                            due.priority === 'medium' ? 'bg-warning bg-opacity-10' :
                            'bg-success bg-opacity-10'
                          }`}>
                            <i className={`fas ${
                              due.type === 'book' ? 'fa-book' :
                              due.type === 'seat' ? 'fa-chair' : 'fa-calendar-check'
                            } fa-lg ${
                              due.priority === 'high' ? 'text-danger' :
                              due.priority === 'medium' ? 'text-warning' :
                              'text-success'
                            }`}></i>
                          </div>
                          <div>
                            <h6 className="fw-semibold mb-1">{due.title}</h6>
                            <p className="text-secondary-custom small mb-0">
                              {due.type.charAt(0).toUpperCase() + due.type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="fw-semibold mb-1">{formatDueDate(due.dueDate)}</p>
                          {due.dueTime && (
                            <p className="text-secondary-custom small mb-0">at {due.dueTime}</p>
                          )}
                          <Link to={due.actionUrl} className="btn btn-sm btn-outline-custom mt-2">
                            Take Action
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="col-lg-4">
                <h3 className="font-display fw-semibold mb-4">Notification Settings</h3>
                <div className="card-custom p-4">
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="pushNotif" defaultChecked />
                    <label className="form-check-label" htmlFor="pushNotif">Push Notifications</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="smsNotif" defaultChecked />
                    <label className="form-check-label" htmlFor="smsNotif">SMS Alerts</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                    <label className="form-check-label" htmlFor="emailNotif">Email Reminders</label>
                  </div>
                  <hr className="border-custom" />
                  <h6 className="fw-semibold mb-3">Reminder Timing</h6>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="remind24" defaultChecked />
                    <label className="form-check-label small" htmlFor="remind24">24 hours before due</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="remind48" defaultChecked />
                    <label className="form-check-label small" htmlFor="remind48">48 hours before due</label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* E-Library Card Tab */}
        {activeTab === 'id' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="row justify-content-center"
          >
            <div className="col-lg-6">
              <h3 className="font-display fw-semibold mb-4 text-center">Your Digital ID</h3>
              
              {/* Digital ID Card */}
              <div 
                className="card-custom overflow-hidden mb-4"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  borderRadius: '20px'
                }}
              >
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <h4 className="text-white fw-bold mb-1">StudyCove</h4>
                      <p className="text-white-50 small mb-0">Member ID Card</p>
                    </div>
                    <span 
                      className="badge px-3 py-2"
                      style={{ background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' }}
                    >
                      {mockDigitalID.tier}
                    </span>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <p className="text-white-50 small mb-1">Member ID</p>
                      <p className="text-white fw-semibold mb-0">{mockDigitalID.memberId}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-white-50 small mb-1">Member Since</p>
                      <p className="text-white fw-semibold mb-0">{new Date(mockDigitalID.memberSince).toLocaleDateString()}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-white-50 small mb-1">Valid Until</p>
                      <p className="text-white fw-semibold mb-0">{new Date(mockDigitalID.validUntil).toLocaleDateString()}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-white-50 small mb-1">NFC Enabled</p>
                      <p className="text-white fw-semibold mb-0">
                        {mockDigitalID.nfcEnabled ? (
                          <><i className="fas fa-check-circle text-success me-1"></i> Yes</>
                        ) : 'No'}
                      </p>
                    </div>
                  </div>
                  
                  {/* QR Code */}
                  <div className="text-center py-4 bg-white rounded-3">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{ width: '180px', height: '180px' }}
                    >
                      <div className="text-center">
                        <i className="fas fa-qrcode" style={{ fontSize: '5rem', color: '#1a1a2e' }}></i>
                        <p className="small fw-bold mt-2 mb-0" style={{ color: '#1a1a2e', fontSize: '0.65rem' }}>
                          {mockDigitalID.qrCode}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-white-50 small mb-0">
                      <i className="fas fa-info-circle me-1"></i>
                      Scan at turnstiles or self-checkout kiosks
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-primary-custom">
                  <i className="fas fa-download me-2"></i>
                  Save to Wallet
                </button>
                <button className="btn btn-outline-custom">
                  <i className="fas fa-share-alt me-2"></i>
                  Share
                </button>
              </div>
              
              {/* Usage Instructions */}
              <div className="card-custom p-4 mt-4">
                <h5 className="fw-semibold mb-3">
                  <i className="fas fa-lightbulb me-2" style={{ color: 'var(--accent-2)' }}></i>
                  How to Use
                </h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-center p-3 bg-muted rounded-3">
                      <i className="fas fa-door-open mb-2" style={{ fontSize: '1.5rem', color: 'var(--accent-1)' }}></i>
                      <h6 className="fw-semibold small">Entry</h6>
                      <p className="text-secondary-custom small mb-0">Scan at turnstile for building access</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3 bg-muted rounded-3">
                      <i className="fas fa-book-reader mb-2" style={{ fontSize: '1.5rem', color: 'var(--support-moss)' }}></i>
                      <h6 className="fw-semibold small">Checkout</h6>
                      <p className="text-secondary-custom small mb-0">Use at self-checkout kiosks for books</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3 bg-muted rounded-3">
                      <i className="fas fa-wifi mb-2" style={{ fontSize: '1.5rem', color: 'var(--accent-2)' }}></i>
                      <h6 className="fw-semibold small">NFC</h6>
                      <p className="text-secondary-custom small mb-0">Tap your phone for quick access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;