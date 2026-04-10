import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  subscriptionPlans,
  mockUserSubscription,
  mockPaymentMethods,
  mockTransactions,
  mockPenalties,
  mockUsageAnalytics,
  mockFocusReport,
  paymentGateways,
  formatCurrency,
  getTotalPendingPenalties,
  getDaysRemaining,
  type SubscriptionPlan,
  type PaymentMethod,
  type Transaction,
  type Penalty
} from '../../data/mockFinancials';

const Membership: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'payments' | 'penalties' | 'analytics'>('subscription');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [autoRenew, setAutoRenew] = useState(mockUserSubscription.autoRenew);

  const pendingPenalties = getTotalPendingPenalties();
  const daysRemaining = getDaysRemaining(mockUserSubscription.endDate);

  // Handle plan upgrade/downgrade
  const handlePlanChange = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  // Handle payment
  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setProcessingPayment(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessingPayment(false);
    setPaymentComplete(true);
    
    setTimeout(() => {
      setShowPaymentModal(false);
      setShowUpgradeModal(false);
      setPaymentComplete(false);
      setSelectedPaymentMethod(null);
    }, 2000);
  };

  // Handle penalty payment
  const handlePenaltyPayment = async () => {
    setProcessingPayment(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessingPayment(false);
    setPaymentComplete(true);
    
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentComplete(false);
    }, 2000);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-success',
      paused: 'bg-warning',
      cancelled: 'bg-danger',
      expired: 'bg-secondary',
      pending: 'bg-warning',
      completed: 'bg-success',
      failed: 'bg-danger',
      paid: 'bg-success'
    };
    return colors[status] || 'bg-secondary';
  };

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: '#9ca3af',
      rare: '#3b82f6',
      epic: '#8b5cf6',
      legendary: '#f59e0b'
    };
    return colors[rarity] || '#9ca3af';
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-2">
            <i className="fas fa-crown me-3" style={{ color: 'var(--accent-2)' }}></i>
            Membership & Billing
          </h1>
          <p className="text-secondary-custom">
            Manage your subscription, payments, and view your usage analytics
          </p>
        </motion.div>

        {/* Pending Dues Alert */}
        {pendingPenalties > 0 && (
          <motion.div 
            className="alert alert-warning d-flex justify-content-between align-items-center mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <i className="fas fa-exclamation-triangle me-2"></i>
              <strong>Pending Dues:</strong> You have outstanding penalties of {formatCurrency(pendingPenalties)}
            </div>
            <button 
              className="btn btn-warning btn-sm"
              onClick={() => {
                setActiveTab('penalties');
                setShowPaymentModal(true);
              }}
            >
              Pay Now
            </button>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="d-flex gap-2 flex-wrap">
            {[
              { id: 'subscription', label: 'Subscription', icon: 'fa-crown' },
              { id: 'payments', label: 'Payments', icon: 'fa-credit-card' },
              { id: 'penalties', label: 'Penalties', icon: 'fa-exclamation-circle' },
              { id: 'analytics', label: 'Analytics & Reports', icon: 'fa-chart-line' }
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

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Current Plan Card */}
            <div className="card-custom p-4 mb-4">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div 
                      className="rounded-4 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: 60, 
                        height: 60, 
                        background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' 
                      }}
                    >
                      <i className="fas fa-crown fa-2x text-white"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1">{mockUserSubscription.planName} Plan</h4>
                      <span className={`badge ${getStatusBadge(mockUserSubscription.status)}`}>
                        {mockUserSubscription.status.charAt(0).toUpperCase() + mockUserSubscription.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <p className="text-secondary-custom small mb-1">Billing Cycle</p>
                      <p className="fw-semibold mb-0">{mockUserSubscription.billingCycle.charAt(0).toUpperCase() + mockUserSubscription.billingCycle.slice(1)}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-secondary-custom small mb-1">Days Remaining</p>
                      <p className="fw-semibold mb-0">{daysRemaining} days</p>
                    </div>
                    <div className="col-6">
                      <p className="text-secondary-custom small mb-1">Next Billing</p>
                      <p className="fw-semibold mb-0">{new Date(mockUserSubscription.nextBillingDate).toLocaleDateString()}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-secondary-custom small mb-1">Amount</p>
                      <p className="fw-semibold mb-0">{formatCurrency(mockUserSubscription.nextBillingAmount)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <div className="bg-muted rounded-3 p-3">
                    <div className="form-check form-switch mb-3">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="autoRenew"
                        checked={autoRenew}
                        onChange={(e) => setAutoRenew(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="autoRenew">
                        <strong>Auto-Renew</strong>
                        <p className="small text-secondary-custom mb-0">Automatically renew your subscription</p>
                      </label>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-outline-custom flex-grow-1"
                        onClick={() => setShowPauseModal(true)}
                      >
                        <i className="fas fa-pause me-2"></i>
                        Pause
                      </button>
                      <button 
                        className="btn btn-outline-custom flex-grow-1 text-danger"
                      >
                        <i className="fas fa-times me-2"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Plans */}
            <h5 className="fw-semibold mb-3">Available Plans</h5>
            <div className="row g-4">
              {subscriptionPlans.map((plan, index) => (
                <div key={plan.id} className="col-md-6 col-lg-3">
                  <motion.div
                    className={`card-custom h-100 ${plan.popular ? 'border-warning' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{ position: 'relative' }}
                  >
                    {plan.popular && (
                      <span 
                        className="badge position-absolute"
                        style={{ 
                          top: -10, 
                          right: 10, 
                          background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' 
                        }}
                      >
                        Most Popular
                      </span>
                    )}
                    
                    <div className="p-4">
                      <h5 className="fw-bold mb-1">{plan.name}</h5>
                      <p className="text-secondary-custom small mb-3">{plan.tier.charAt(0).toUpperCase() + plan.tier.slice(1)} Tier</p>
                      
                      <div className="mb-3">
                        <span className="h3 fw-bold">{formatCurrency(plan.monthlyPrice)}</span>
                        <span className="text-secondary-custom">/month</span>
                      </div>
                      
                      <p className="small text-secondary-custom mb-3">
                        or {formatCurrency(plan.yearlyPrice)}/year <span className="text-success">(Save {Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100)}%)</span>
                      </p>
                      
                      <ul className="list-unstyled mb-4">
                        {plan.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="small mb-2">
                            <i className="fas fa-check text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                        {plan.features.length > 4 && (
                          <li className="small text-secondary-custom">+{plan.features.length - 4} more features</li>
                        )}
                      </ul>
                      
                      <button
                        className={`btn w-100 ${plan.id === mockUserSubscription.planId ? 'btn-outline-custom' : 'btn-primary-custom'}`}
                        disabled={plan.id === mockUserSubscription.planId}
                        onClick={() => handlePlanChange(plan)}
                      >
                        {plan.id === mockUserSubscription.planId ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Payment Methods */}
            <div className="card-custom p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0">Payment Methods</h5>
                <button className="btn btn-outline-custom btn-sm">
                  <i className="fas fa-plus me-2"></i>
                  Add New
                </button>
              </div>
              
              <div className="row g-3">
                {mockPaymentMethods.map(method => (
                  <div key={method.id} className="col-md-4">
                    <div className={`p-3 rounded-3 ${method.isDefault ? 'bg-muted' : 'border border-custom'}`}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <i className={`fas ${method.icon} fa-lg`} style={{ color: 'var(--accent-1)' }}></i>
                        {method.isDefault && (
                          <span className="badge bg-success">Default</span>
                        )}
                      </div>
                      <h6 className="fw-semibold mb-1">{method.name}</h6>
                      <p className="small text-secondary-custom mb-0">
                        {method.upiId || method.last4 ? `•••• ${method.last4 || method.upiId?.split('@')[0]}` : method.bankName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="card-custom p-4">
              <h5 className="fw-semibold mb-4">Transaction History</h5>
              
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-secondary-custom">Date</th>
                      <th className="text-secondary-custom">Description</th>
                      <th className="text-secondary-custom">Method</th>
                      <th className="text-secondary-custom">Status</th>
                      <th className="text-secondary-custom text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map(txn => (
                      <tr key={txn.id}>
                        <td>{new Date(txn.date).toLocaleDateString()}</td>
                        <td>
                          <p className="mb-0 fw-semibold">{txn.description}</p>
                          <p className="small text-secondary-custom mb-0">{txn.invoiceId}</p>
                        </td>
                        <td>{txn.paymentMethod || '-'}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(txn.status)}`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="text-end fw-semibold" style={{ color: txn.amount < 0 ? 'var(--support-moss)' : txn.amount > 0 ? 'inherit' : 'inherit' }}>
                          {txn.amount < 0 ? '-' : ''}{formatCurrency(Math.abs(txn.amount))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Penalties Tab */}
        {activeTab === 'penalties' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Penalty Summary */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-exclamation-triangle fa-2x mb-3" style={{ color: 'var(--support-coral)' }}></i>
                  <h3 className="fw-bold mb-1">{formatCurrency(pendingPenalties)}</h3>
                  <p className="text-secondary-custom mb-0">Pending Dues</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-check-circle fa-2x mb-3" style={{ color: 'var(--support-moss)' }}></i>
                  <h3 className="fw-bold mb-1">{mockPenalties.filter(p => p.status === 'paid').length}</h3>
                  <p className="text-secondary-custom mb-0">Paid Penalties</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-shield-alt fa-2x mb-3" style={{ color: 'var(--accent-2)' }}></i>
                  <h3 className="fw-bold mb-1">Good</h3>
                  <p className="text-secondary-custom mb-0">Account Standing</p>
                </div>
              </div>
            </div>

            {/* Penalty List */}
            <div className="card-custom p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0">Penalty History</h5>
                {pendingPenalties > 0 && (
                  <button 
                    className="btn btn-primary-custom"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    <i className="fas fa-credit-card me-2"></i>
                    Pay All Dues ({formatCurrency(pendingPenalties)})
                  </button>
                )}
              </div>
              
              {mockPenalties.map(penalty => (
                <div key={penalty.id} className="p-3 bg-muted rounded-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className={`fas ${
                          penalty.type === 'late_return' ? 'fa-book' :
                          penalty.type === 'no_show' ? 'fa-chair' :
                          penalty.type === 'damage' ? 'fa-tools' : 'fa-question'
                        }`} style={{ color: 'var(--accent-1)' }}></i>
                        <h6 className="fw-semibold mb-0">{penalty.relatedItemName}</h6>
                        <span className={`badge ${getStatusBadge(penalty.status)}`}>
                          {penalty.status}
                        </span>
                      </div>
                      <p className="text-secondary-custom small mb-1">{penalty.description}</p>
                      <p className="text-secondary-custom small mb-0">
                        <i className="fas fa-calendar me-1"></i>
                        Incurred: {new Date(penalty.incurredDate).toLocaleDateString()}
                        {penalty.daysOverdue && ` (${penalty.daysOverdue} days overdue)`}
                      </p>
                    </div>
                    <div className="text-end">
                      <h5 className="fw-bold mb-0" style={{ color: 'var(--support-coral)' }}>
                        {formatCurrency(penalty.amount)}
                      </h5>
                      {penalty.status === 'pending' && (
                        <button className="btn btn-sm btn-outline-custom mt-2">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Usage Summary */}
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-clock fa-2x mb-3" style={{ color: 'var(--accent-1)' }}></i>
                  <h3 className="fw-bold mb-1">{mockUsageAnalytics.totalHoursStudied}h</h3>
                  <p className="text-secondary-custom small mb-0">Hours Studied</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-piggy-bank fa-2x mb-3" style={{ color: 'var(--support-moss)' }}></i>
                  <h3 className="fw-bold mb-1">{formatCurrency(mockUsageAnalytics.moneySavedByBorrowing)}</h3>
                  <p className="text-secondary-custom small mb-0">Money Saved</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-book fa-2x mb-3" style={{ color: 'var(--accent-2)' }}></i>
                  <h3 className="fw-bold mb-1">{mockUsageAnalytics.booksBorrowed}</h3>
                  <p className="text-secondary-custom small mb-0">Books Borrowed</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-custom p-4 text-center">
                  <i className="fas fa-chart-line fa-2x mb-3" style={{ color: 'var(--support-coral)' }}></i>
                  <h3 className="fw-bold mb-1">{mockUsageAnalytics.productivityScore}</h3>
                  <p className="text-secondary-custom small mb-0">Productivity Score</p>
                </div>
              </div>
            </div>

            {/* Focus Report */}
            <div className="card-custom p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-semibold mb-1">Focus Report - {mockFocusReport.month} {mockFocusReport.year}</h5>
                  <p className="text-secondary-custom small mb-0">Your monthly productivity summary</p>
                </div>
                <button className="btn btn-outline-custom btn-sm">
                  <i className="fas fa-download me-2"></i>
                  Download PDF
                </button>
              </div>

              {/* Highlights */}
              <div className="bg-muted rounded-3 p-3 mb-4">
                <h6 className="fw-semibold mb-3">
                  <i className="fas fa-star me-2" style={{ color: 'var(--accent-2)' }}></i>
                  Highlights
                </h6>
                <ul className="mb-0">
                  {mockFocusReport.highlights.map((highlight, idx) => (
                    <li key={idx} className="mb-2">{highlight}</li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <h6 className="fw-semibold mb-3">
                <i className="fas fa-trophy me-2" style={{ color: 'var(--accent-1)' }}></i>
                Achievements Earned
              </h6>
              <div className="row g-3 mb-4">
                {mockFocusReport.achievements.map(achievement => (
                  <div key={achievement.id} className="col-md-4">
                    <div className="p-3 rounded-3" style={{ background: `${getRarityColor(achievement.rarity)}20`, border: `2px solid ${getRarityColor(achievement.rarity)}` }}>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 50, height: 50, background: getRarityColor(achievement.rarity) }}
                        >
                          <i className={`fas ${achievement.icon} fa-lg text-white`}></i>
                        </div>
                        <div>
                          <h6 className="fw-semibold mb-1">{achievement.title}</h6>
                          <p className="small text-secondary-custom mb-0">{achievement.description}</p>
                          <span className="badge mt-1" style={{ background: getRarityColor(achievement.rarity) }}>
                            {achievement.rarity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Focus Time Breakdown */}
              <div className="row g-4">
                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Focus Time Breakdown</h6>
                  <div className="bg-muted rounded-3 p-3">
                    {Object.entries(mockUsageAnalytics.focusTimeBreakdown).map(([type, hours]) => (
                      <div key={type} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small text-capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="small fw-semibold">{hours}h</span>
                        </div>
                        <div className="progress" style={{ height: 8 }}>
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${(hours / mockUsageAnalytics.totalHoursStudied) * 100}%`,
                              background: type === 'deepWork' ? 'var(--accent-1)' : 
                                         type === 'collaborative' ? 'var(--accent-2)' : 'var(--support-moss)'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Recommendations</h6>
                  <div className="bg-muted rounded-3 p-3">
                    <ul className="mb-0">
                      {mockFocusReport.recommendations.map((rec, idx) => (
                        <li key={idx} className="mb-2 small">{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <h6 className="fw-semibold mb-3 mt-4">Next Month Goals</h6>
                  <div className="bg-muted rounded-3 p-3">
                    <ul className="mb-0">
                      {mockFocusReport.nextMonthGoals.map((goal, idx) => (
                        <li key={idx} className="mb-2 small">{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Money Saved Comparison */}
            <div className="card-custom p-4">
              <h5 className="fw-semibold mb-4">
                <i className="fas fa-piggy-bank me-2" style={{ color: 'var(--support-moss)' }}></i>
                Savings by Borrowing vs. Buying
              </h5>
              
              <div className="row align-items-center">
                <div className="col-md-4 text-center">
                  <p className="text-secondary-custom mb-2">If You Bought</p>
                  <h2 className="fw-bold text-danger">{formatCurrency(mockUsageAnalytics.moneySavedByBorrowing * 2)}</h2>
                </div>
                <div className="col-md-4 text-center">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: 100, height: 100, background: 'linear-gradient(135deg, var(--support-moss), #5A9B7A)' }}
                  >
                    <div className="text-center">
                      <i className="fas fa-arrow-down fa-lg text-white"></i>
                      <p className="text-white fw-bold mb-0">{formatCurrency(mockUsageAnalytics.moneySavedByBorrowing)}</p>
                      <p className="text-white small mb-0">Saved</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <p className="text-secondary-custom mb-2">You Spent</p>
                  <h2 className="fw-bold" style={{ color: 'var(--support-moss)' }}>{formatCurrency(mockUsageAnalytics.moneySavedByBorrowing)}</h2>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.7)', zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-custom p-4"
              style={{ maxWidth: '500px', width: '90%' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {paymentComplete ? (
                <div className="text-center py-4">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: 80, height: 80, background: 'var(--support-moss)' }}
                  >
                    <i className="fas fa-check fa-3x text-white"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Payment Successful!</h4>
                  <p className="text-secondary-custom mb-0">Your payment has been processed.</p>
                </div>
              ) : (
                <>
                  <h5 className="fw-semibold mb-4">
                    {pendingPenalties > 0 ? `Pay Dues: ${formatCurrency(pendingPenalties)}` : 'Select Payment Method'}
                  </h5>

                  <div className="mb-4">
                    {paymentGateways.map(gateway => (
                      <div
                        key={gateway.id}
                        className={`p-3 rounded-3 mb-2 ${selectedPaymentMethod === gateway.id ? 'bg-muted border border-primary' : 'bg-muted'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedPaymentMethod(gateway.id)}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <i className={`fas ${gateway.icon} fa-lg`} style={{ color: 'var(--accent-1)' }}></i>
                          <div>
                            <h6 className="fw-semibold mb-0">{gateway.name}</h6>
                            <p className="small text-secondary-custom mb-0">{gateway.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-custom flex-grow-1"
                      onClick={() => setShowPaymentModal(false)}
                      disabled={processingPayment}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary-custom flex-grow-1"
                      onClick={pendingPenalties > 0 ? handlePenaltyPayment : handlePayment}
                      disabled={!selectedPaymentMethod || processingPayment}
                    >
                      {processingPayment ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : (
                        `Pay ${formatCurrency(pendingPenalties || selectedPlan?.monthlyPrice || 0)}`
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pause Modal */}
      <AnimatePresence>
        {showPauseModal && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.7)', zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-custom p-4"
              style={{ maxWidth: '450px', width: '90%' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h5 className="fw-semibold mb-3">Pause Subscription</h5>
              <p className="text-secondary-custom mb-4">
                You can pause your subscription for up to 30 days. During this period, you won't be charged but also won't have access to member benefits.
              </p>
              
              <div className="mb-4">
                <label className="form-label">Pause Duration</label>
                <select className="form-select">
                  <option>1 week</option>
                  <option>2 weeks</option>
                  <option>1 month</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Reason (Optional)</label>
                <textarea className="form-control" rows={2} placeholder="e.g., Vacation, Travel..."></textarea>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-custom flex-grow-1"
                  onClick={() => setShowPauseModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary-custom flex-grow-1">
                  Pause Subscription
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Membership;