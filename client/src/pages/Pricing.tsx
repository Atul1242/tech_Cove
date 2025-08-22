import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/common/PricingCard';
import { PricingPlan } from '../types';
import pricingData from '../data/pricing.json';

const Pricing: React.FC = () => {
  const [isStudentPricing, setIsStudentPricing] = useState(true);
  const plans = isStudentPricing ? pricingData.student : pricingData.general;

  const handleSelectPlan = (planId: string) => {
    // TODO: Implement plan selection
    console.log('Selected plan:', planId);
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
          <h1 className="font-display fw-bold mb-3" data-testid="pricing-title">
            Simple, Transparent Pricing
          </h1>
          <p className="fs-5 text-secondary-custom mb-4">
            Choose the plan that fits your study schedule
          </p>

          {/* Pricing Toggle */}
          <div className="d-inline-flex bg-muted rounded-4 p-1">
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
        </motion.div>

        {/* Pricing Cards */}
        <div className="row g-4 justify-content-center mb-5">
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

        {/* FAQ Section */}
        <motion.section 
          className="py-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h2 className="font-display fw-bold text-center mb-5">Frequently Asked Questions</h2>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">What's included in the Day Pass?</h5>
                  <p className="text-secondary-custom small">
                    8 hours of access, high-speed WiFi, power outlets, and basic amenities including water and restroom access.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">Can I cancel my membership?</h5>
                  <p className="text-secondary-custom small">
                    Yes, you can cancel anytime. Monthly memberships can be cancelled with 7 days notice.
                  </p>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">Do you offer corporate plans?</h5>
                  <p className="text-secondary-custom small">
                    Yes, we offer special corporate packages for teams. Contact us for custom pricing.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">Is there a free trial?</h5>
                  <p className="text-secondary-custom small">
                    New users get a 2-hour free trial at any location. Perfect to experience our environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="text-center py-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display fw-bold mb-3">Ready to get started?</h3>
          <p className="text-secondary-custom mb-4">
            Join thousands of students who have transformed their study experience
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn btn-primary-custom">
              Start Free Trial
            </button>
            <button className="btn btn-outline-custom">
              Contact Sales
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Pricing;
