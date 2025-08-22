import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate?: string;
  downloadUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  details: string;
  isDefault: boolean;
}

const Billing: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('invoices');

  // TODO: Replace with actual data from API
  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-03-01',
      description: 'Monthly Membership - March 2024',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      description: 'Monthly Membership - February 2024',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 'INV-2024-003',
      date: '2024-01-15',
      description: 'Day Pass - Delhi Central',
      amount: 199,
      status: 'paid'
    },
    {
      id: 'INV-2024-004',
      date: '2024-04-01',
      description: 'Monthly Membership - April 2024',
      amount: 2999,
      status: 'pending',
      dueDate: '2024-04-05'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm-1',
      type: 'card',
      details: '**** **** **** 1234',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'upi',
      details: 'user@paytm',
      isDefault: false
    }
  ];

  const billingStats = {
    totalSpent: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    unpaidAmount: invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    nextBillingDate: '2024-04-01',
    currentPlan: 'Monthly Student Plan'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'var(--support-moss)';
      case 'pending': return 'var(--support-amber)';
      case 'overdue': return 'var(--support-coral)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card': return 'fas fa-credit-card';
      case 'upi': return 'fas fa-mobile-alt';
      case 'netbanking': return 'fas fa-university';
      default: return 'fas fa-wallet';
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: Implement invoice download
    console.log('Downloading invoice:', invoiceId);
  };

  const handlePayInvoice = (invoiceId: string) => {
    // TODO: Implement payment functionality
    console.log('Paying invoice:', invoiceId);
  };

  const handleAddPaymentMethod = () => {
    // TODO: Implement add payment method
    console.log('Adding payment method');
  };

  const handleSetDefaultPayment = (methodId: string) => {
    // TODO: Implement set default payment method
    console.log('Setting default payment method:', methodId);
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
          <h1 className="font-display fw-bold mb-3" data-testid="billing-title">
            Billing & Invoices
          </h1>
          <p className="fs-5 text-secondary-custom">
            Manage your payments and view billing history
          </p>
        </motion.div>

        {/* Billing Summary */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-rupee-sign mb-3" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
              <h4 className="fw-bold mb-1">₹{billingStats.totalSpent.toLocaleString()}</h4>
              <p className="text-secondary-custom small mb-0">Total Spent</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-clock mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h4 className="fw-bold mb-1">₹{billingStats.unpaidAmount.toLocaleString()}</h4>
              <p className="text-secondary-custom small mb-0">Pending Amount</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-calendar mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h4 className="fw-bold mb-1">{new Date(billingStats.nextBillingDate).toLocaleDateString()}</h4>
              <p className="text-secondary-custom small mb-0">Next Billing</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-star mb-3" style={{ fontSize: '2rem', color: 'var(--accent-2)' }}></i>
              <h4 className="fw-bold mb-1 small">{billingStats.currentPlan}</h4>
              <p className="text-secondary-custom small mb-0">Current Plan</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="d-flex bg-panel rounded-4 p-2">
            <button
              className={`btn flex-fill ${selectedTab === 'invoices' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
              onClick={() => setSelectedTab('invoices')}
              data-testid="tab-invoices"
            >
              <i className="fas fa-file-invoice me-2"></i>
              Invoices
            </button>
            <button
              className={`btn flex-fill ${selectedTab === 'payments' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
              onClick={() => setSelectedTab('payments')}
              data-testid="tab-payments"
            >
              <i className="fas fa-credit-card me-2"></i>
              Payment Methods
            </button>
          </div>
        </motion.div>

        {/* Invoices Tab */}
        {selectedTab === 'invoices' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-custom">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr key={invoice.id} data-testid={`invoice-row-${index}`}>
                        <td className="fw-semibold">{invoice.id}</td>
                        <td>{new Date(invoice.date).toLocaleDateString()}</td>
                        <td>{invoice.description}</td>
                        <td>₹{invoice.amount.toLocaleString()}</td>
                        <td>
                          <span 
                            className="badge px-3 py-1"
                            style={{ 
                              background: getStatusColor(invoice.status),
                              color: 'white',
                              borderRadius: '12px'
                            }}
                          >
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                          {invoice.dueDate && invoice.status === 'pending' && (
                            <div className="small text-secondary-custom mt-1">
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-outline-custom btn-sm"
                              onClick={() => handleDownloadInvoice(invoice.id)}
                              data-testid={`btn-download-${invoice.id}`}
                            >
                              <i className="fas fa-download"></i>
                            </button>
                            {invoice.status !== 'paid' && (
                              <button 
                                className="btn btn-primary-custom btn-sm"
                                onClick={() => handlePayInvoice(invoice.id)}
                                data-testid={`btn-pay-${invoice.id}`}
                              >
                                Pay Now
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Methods Tab */}
        {selectedTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="font-display fw-semibold">Payment Methods</h4>
              <button 
                className="btn btn-primary-custom"
                onClick={handleAddPaymentMethod}
                data-testid="btn-add-payment"
              >
                <i className="fas fa-plus me-2"></i>
                Add Payment Method
              </button>
            </div>

            <div className="row g-4">
              {paymentMethods.map((method, index) => (
                <div key={method.id} className="col-md-6">
                  <motion.div 
                    className="card-custom p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    data-testid={`payment-method-${method.id}`}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <i 
                          className={`${getPaymentIcon(method.type)} me-3`}
                          style={{ fontSize: '1.5rem', color: 'var(--accent-1)' }}
                        ></i>
                        <div>
                          <h6 className="fw-semibold mb-1">
                            {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                          </h6>
                          <p className="text-secondary-custom small mb-0">{method.details}</p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span 
                          className="badge px-2 py-1"
                          style={{ background: 'var(--support-moss)', color: 'white', borderRadius: '8px' }}
                        >
                          Default
                        </span>
                      )}
                    </div>

                    <div className="d-flex gap-2">
                      {!method.isDefault && (
                        <button 
                          className="btn btn-outline-custom btn-sm"
                          onClick={() => handleSetDefaultPayment(method.id)}
                          data-testid={`btn-set-default-${method.id}`}
                        >
                          Set Default
                        </button>
                      )}
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        data-testid={`btn-remove-${method.id}`}
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Billing Settings */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="font-display fw-bold mb-4">Billing Settings</h4>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">Auto-renewal</h6>
                    <small className="text-secondary-custom">Automatically renew your membership</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">Email notifications</h6>
                    <small className="text-secondary-custom">Get notified about upcoming payments</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Billing;
