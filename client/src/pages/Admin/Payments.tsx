import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Payment {
  id: string;
  transactionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  type: 'booking' | 'membership' | 'refund';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
  date: string;
  description: string;
  bookingId?: string;
  membershipPlan?: string;
}

const AdminPayments: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Replace with actual data from API
  const payments: Payment[] = [
    {
      id: 'PAY-2024-001',
      transactionId: 'TXN123456789',
      userId: 'U001',
      userName: 'Arjun Sharma',
      userEmail: 'arjun@example.com',
      amount: 2999,
      type: 'membership',
      status: 'completed',
      paymentMethod: 'card',
      date: '2024-03-15T10:30:00Z',
      description: 'Monthly Student Plan',
      membershipPlan: 'Monthly Student'
    },
    {
      id: 'PAY-2024-002',
      transactionId: 'TXN123456790',
      userId: 'U002',
      userName: 'Priya Patel',
      userEmail: 'priya@example.com',
      amount: 199,
      type: 'booking',
      status: 'completed',
      paymentMethod: 'upi',
      date: '2024-03-15T09:15:00Z',
      description: 'Day Pass - Delhi Central',
      bookingId: 'B2024001'
    },
    {
      id: 'PAY-2024-003',
      transactionId: 'TXN123456791',
      userId: 'U003',
      userName: 'Rohit Kumar',
      userEmail: 'rohit@example.com',
      amount: 199,
      type: 'refund',
      status: 'completed',
      paymentMethod: 'card',
      date: '2024-03-14T16:45:00Z',
      description: 'Refund for cancelled booking',
      bookingId: 'B2024002'
    },
    {
      id: 'PAY-2024-004',
      transactionId: 'TXN123456792',
      userId: 'U004',
      userName: 'Sneha Reddy',
      userEmail: 'sneha@example.com',
      amount: 149,
      type: 'booking',
      status: 'pending',
      paymentMethod: 'netbanking',
      date: '2024-03-15T14:20:00Z',
      description: 'Day Pass - Mumbai Bandra'
    },
    {
      id: 'PAY-2024-005',
      transactionId: 'TXN123456793',
      userId: 'U005',
      userName: 'Vikram Singh',
      userEmail: 'vikram@example.com',
      amount: 6999,
      type: 'membership',
      status: 'failed',
      paymentMethod: 'card',
      date: '2024-03-15T11:00:00Z',
      description: 'Premium Plan',
      membershipPlan: 'Premium'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'booking', label: 'Bookings' },
    { value: 'membership', label: 'Memberships' },
    { value: 'refund', label: 'Refunds' }
  ];

  const methodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'netbanking', label: 'Net Banking' },
    { value: 'wallet', label: 'Wallet' }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesType = selectedType === 'all' || payment.type === selectedType;
    const matchesMethod = selectedMethod === 'all' || payment.paymentMethod === selectedMethod;
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesMethod && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'var(--support-moss)';
      case 'pending': return 'var(--support-amber)';
      case 'failed': return 'var(--support-coral)';
      case 'refunded': return 'var(--accent-1)';
      default: return 'var(--text-secondary)';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'var(--accent-1)';
      case 'membership': return 'var(--support-moss)';
      case 'refund': return 'var(--support-coral)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return 'fas fa-credit-card';
      case 'upi': return 'fas fa-mobile-alt';
      case 'netbanking': return 'fas fa-university';
      case 'wallet': return 'fas fa-wallet';
      default: return 'fas fa-money-bill';
    }
  };

  const handlePaymentAction = (paymentId: string, action: string) => {
    // TODO: Implement payment actions
    console.log(`${action} payment:`, paymentId);
  };

  const totalRevenue = filteredPayments
    .filter(p => p.status === 'completed' && p.type !== 'refund')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalRefunds = filteredPayments
    .filter(p => p.status === 'completed' && p.type === 'refund')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = filteredPayments.filter(p => p.status === 'pending').length;

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
            <h1 className="font-display fw-bold mb-2" data-testid="admin-payments-title">
              Payment Management
            </h1>
            <p className="text-secondary-custom">
              Monitor and manage all payment transactions
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-custom">
              <i className="fas fa-download me-2"></i>
              Export Report
            </button>
            <button className="btn btn-primary-custom">
              <i className="fas fa-plus me-2"></i>
              Manual Entry
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
              <i className="fas fa-rupee-sign mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h4 className="fw-bold mb-1">₹{(totalRevenue / 1000).toFixed(0)}K</h4>
              <p className="text-secondary-custom small mb-0">Total Revenue</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-undo mb-3" style={{ fontSize: '2rem', color: 'var(--support-coral)' }}></i>
              <h4 className="fw-bold mb-1">₹{(totalRefunds / 1000).toFixed(1)}K</h4>
              <p className="text-secondary-custom small mb-0">Total Refunds</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-clock mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h4 className="fw-bold mb-1">{pendingPayments}</h4>
              <p className="text-secondary-custom small mb-0">Pending Payments</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-receipt mb-3" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
              <h4 className="fw-bold mb-1">{filteredPayments.length}</h4>
              <p className="text-secondary-custom small mb-0">Total Transactions</p>
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
                placeholder="Search by user, transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-payments"
              />
            </div>
            <div className="col-md-2">
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
            <div className="col-md-2">
              <label className="form-label small">Type</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                data-testid="filter-type"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Payment Method</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                data-testid="filter-method"
              >
                {methodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small">Date Range</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                data-testid="filter-date"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Payments Table */}
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
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <tr key={payment.id} data-testid={`payment-row-${index}`}>
                    <td>
                      <div>
                        <div className="fw-semibold">{payment.transactionId}</div>
                        <small className="text-secondary-custom">{payment.id}</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-semibold">{payment.userName}</div>
                        <small className="text-secondary-custom">{payment.userEmail}</small>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold">₹{payment.amount.toLocaleString()}</div>
                      <small className="text-secondary-custom">{payment.description}</small>
                    </td>
                    <td>
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: getTypeColor(payment.type),
                          color: 'white',
                          borderRadius: '8px'
                        }}
                      >
                        {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={getPaymentMethodIcon(payment.paymentMethod)} style={{ marginRight: '8px' }}></i>
                        {payment.paymentMethod.charAt(0).toUpperCase() + payment.paymentMethod.slice(1)}
                      </div>
                    </td>
                    <td>
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: getStatusColor(payment.status),
                          color: 'white',
                          borderRadius: '8px'
                        }}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {new Date(payment.date).toLocaleDateString()}
                      <br />
                      <small className="text-secondary-custom">
                        {new Date(payment.date).toLocaleTimeString()}
                      </small>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button 
                          className="btn btn-outline-custom btn-sm dropdown-toggle" 
                          type="button" 
                          data-bs-toggle="dropdown"
                          data-testid={`payment-actions-${payment.id}`}
                        >
                          Actions
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-panel border-custom">
                          <li>
                            <button 
                              className="dropdown-item text-light"
                              onClick={() => handlePaymentAction(payment.id, 'view')}
                            >
                              View Details
                            </button>
                          </li>
                          <li>
                            <button 
                              className="dropdown-item text-light"
                              onClick={() => handlePaymentAction(payment.id, 'receipt')}
                            >
                              Download Receipt
                            </button>
                          </li>
                          {payment.status === 'completed' && payment.type !== 'refund' && (
                            <li>
                              <button 
                                className="dropdown-item text-light"
                                onClick={() => handlePaymentAction(payment.id, 'refund')}
                              >
                                Process Refund
                              </button>
                            </li>
                          )}
                          {payment.status === 'pending' && (
                            <>
                              <li>
                                <button 
                                  className="dropdown-item text-light"
                                  onClick={() => handlePaymentAction(payment.id, 'approve')}
                                >
                                  Mark as Paid
                                </button>
                              </li>
                              <li>
                                <button 
                                  className="dropdown-item text-warning"
                                  onClick={() => handlePaymentAction(payment.id, 'fail')}
                                >
                                  Mark as Failed
                                </button>
                              </li>
                            </>
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
        {filteredPayments.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-receipt text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h4 className="text-secondary-custom mb-3">No payments found</h4>
            <p className="text-secondary-custom">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
