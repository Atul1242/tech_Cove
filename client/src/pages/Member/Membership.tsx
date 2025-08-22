import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import PricingCard from '../../components/common/PricingCard';
import { PricingPlan } from '../../types';
import pricingData from '../../data/pricing.json';

const Membership: React.FC = () => {
  const { user } = useAuth();
  const [isStudentPricing, setIsStudentPricing] = useState(true);
  const plans = isStudentPricing ? pricingData.student : pricingData.general;

  const membershipStats = {
    daysRemaining: user?.membershipExpiry ? 
      Math.max(0, Math.ceil((new Date(user.membershipExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0,
    totalBookings: 24,
    hoursUsed: 186,
    savings: 2450
  };

  const usageHistory = [
    { month: 'February', bookings: 8, hours: 64, amount: 1200 },
    { month: 'January', bookings: 12, hours: 96, amount: 1800 },
    { month: 'December', bookings: 10, hours: 80, amount: 1500 }
  ];

  const handleSelectPlan = (planId: string) => {
    // TODO: Implement plan selection/upgrade
    console.log('Selected plan:', planId);
  };

  const handleCancelMembership = () => {
    // TODO: Implement membership cancellation
    console.log('Cancelling membership');
  };

  const getMembershipBadgeColor = () => {
    if (!user?.membershipType) return 'var(--text-secondary)';
    switch (user.membershipType) {
      case 'premium': return 'var(--support-amber)';
      case 'monthly': return 'var(--accent-1)';
      default: return 'var(--support-moss)';
    }
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
          <h1 className="font-display fw-bold mb-3" data-testid="membership-title">
            My Membership
          </h1>
          <p className="fs-5 text-secondary-custom">
            Manage your subscription and view usage statistics
          </p>
        </motion.div>

        {/* Current Membership Status */}
        <motion.div 
          className="card-custom p-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-4"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: getMembershipBadgeColor(),
                    color: 'white'
                  }}
                >
                  <i className="fas fa-crown" style={{ fontSize: '2rem' }}></i>
                </div>
                <div>
                  <h3 className="font-display fw-bold mb-1">
                    {user?.membershipType ? 
                      `${user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} Member` : 
                      'No Active Membership'
                    }
                  </h3>
                  <p className="text-secondary-custom mb-0">
                    {user?.membershipType ? 
                      `${membershipStats.daysRemaining} days remaining` : 
                      'Upgrade to unlock unlimited access'
                    }
                  </p>
                </div>
              </div>

              {user?.membershipType && (
                <div className="row g-4">
                  <div className="col-6 col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold mb-1" style={{ color: 'var(--accent-1)' }}>
                        {membershipStats.totalBookings}
                      </h4>
                      <small className="text-secondary-custom">Total Bookings</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold mb-1" style={{ color: 'var(--support-moss)' }}>
                        {membershipStats.hoursUsed}h
                      </h4>
                      <small className="text-secondary-custom">Hours Studied</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold mb-1" style={{ color: 'var(--support-amber)' }}>
                        ₹{membershipStats.savings}
                      </h4>
                      <small className="text-secondary-custom">Total Savings</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-center">
                      <h4 className="fw-bold mb-1" style={{ color: 'var(--accent-2)' }}>
                        {membershipStats.daysRemaining}
                      </h4>
                      <small className="text-secondary-custom">Days Left</small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              {user?.membershipType ? (
                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-primary-custom" data-testid="btn-extend-membership">
                    <i className="fas fa-plus me-2"></i>
                    Extend Membership
                  </button>
                  <button className="btn btn-outline-custom" data-testid="btn-manage-membership">
                    <i className="fas fa-cog me-2"></i>
                    Manage Plan
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary-custom btn-lg" data-testid="btn-get-membership">
                  <i className="fas fa-crown me-2"></i>
                  Get Membership
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Usage History */}
        {user?.membershipType && (
          <motion.div 
            className="card-custom p-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display fw-semibold mb-4">Usage History</h4>
            <div className="table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Bookings</th>
                    <th>Hours</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {usageHistory.map((month, index) => (
                    <tr key={index}>
                      <td>{month.month}</td>
                      <td>{month.bookings}</td>
                      <td>{month.hours}h</td>
                      <td>₹{month.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Available Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-4">
            <h3 className="font-display fw-bold mb-3">
              {user?.membershipType ? 'Upgrade Your Plan' : 'Choose Your Plan'}
            </h3>
            
            {/* Pricing Toggle */}
            <div className="d-inline-flex bg-panel rounded-4 p-1">
              <button 
                className={`btn btn-sm px-4 py-2 ${isStudentPricing ? 'active' : ''}`}
                style={isStudentPricing ? {
                  background: 'var(--accent-1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px'
                } : {
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)'
                }}
                onClick={() => setIsStudentPricing(true)}
                data-testid="btn-student-pricing"
              >
                Student Pricing
              </button>
              <button 
                className={`btn btn-sm px-4 py-2 ${!isStudentPricing ? 'active' : ''}`}
                style={!isStudentPricing ? {
                  background: 'var(--accent-1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px'
                } : {
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)'
                }}
                onClick={() => setIsStudentPricing(false)}
                data-testid="btn-general-pricing"
              >
                General Pricing
              </button>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {plans.map((plan, index) => (
              <div key={plan.id} className="col-lg-4 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PricingCard 
                    plan={plan as PricingPlan} 
                    isPopular={plan.popular}
                    onSelectPlan={handleSelectPlan}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Membership Benefits */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="font-display fw-bold text-center mb-4">Membership Benefits</h4>
            <div className="row g-4">
              {[
                { icon: 'fas fa-infinity', title: 'Unlimited Access', desc: 'Book as many sessions as you need' },
                { icon: 'fas fa-star', title: 'Priority Booking', desc: 'Get first pick of the best seats' },
                { icon: 'fas fa-users', title: 'Guest Passes', desc: 'Bring friends to study sessions' },
                { icon: 'fas fa-gift', title: 'Exclusive Perks', desc: 'Member-only events and discounts' }
              ].map((benefit, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className="text-center">
                    <i 
                      className={benefit.icon} 
                      style={{ fontSize: '2rem', color: 'var(--accent-1)', marginBottom: '1rem' }}
                    ></i>
                    <h6 className="fw-semibold mb-2">{benefit.title}</h6>
                    <p className="text-secondary-custom small">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Cancel Membership */}
        {user?.membershipType && (
          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button 
              className="btn btn-outline-danger"
              onClick={handleCancelMembership}
              data-testid="btn-cancel-membership"
            >
              Cancel Membership
            </button>
            <p className="text-secondary-custom small mt-2">
              You can cancel anytime. Your membership will remain active until the end of the billing period.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Membership;
