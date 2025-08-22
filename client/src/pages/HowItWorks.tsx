import React from 'react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '../utils/constants';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-gradient py-5">
        <div className="container hero-content">
          <div className="text-center py-5">
            <motion.h1 
              className="font-display fw-bold mb-4" 
              style={{ fontSize: '3rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              data-testid="how-it-works-title"
            >
              How <span style={{ color: 'var(--accent-1)' }}>StudyCove</span> Works
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get your perfect study space in just three simple steps
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-5">
        <div className="container">
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div 
              key={step.step}
              className={`row align-items-center g-5 ${index < HOW_IT_WORKS.length - 1 ? 'mb-5 pb-5' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`col-lg-6 ${index % 2 === 1 ? 'order-lg-2' : ''}`}>
                <div className="d-flex align-items-start">
                  <div className="me-4">
                    <div 
                      className="feature-icon" 
                      style={{ 
                        width: '80px', 
                        height: '80px',
                        fontSize: '2rem'
                      }}
                    >
                      <i className={step.icon}></i>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center mb-3">
                      <span 
                        className="badge me-3 px-3 py-2"
                        style={{ 
                          background: 'var(--accent-1)', 
                          fontSize: '1rem',
                          borderRadius: '12px'
                        }}
                      >
                        Step {step.step}
                      </span>
                    </div>
                    <h2 className="font-display fw-bold mb-3">{step.title}</h2>
                    <p className="fs-5 text-secondary-custom mb-4">
                      {step.description}
                    </p>
                    
                    {/* Additional details for each step */}
                    {step.step === 1 && (
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Browse real-time availability across all locations
                        </li>
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          View detailed amenities and noise levels
                        </li>
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Check distance and transportation options
                        </li>
                      </ul>
                    )}
                    
                    {step.step === 2 && (
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Instant confirmation and digital receipt
                        </li>
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Flexible cancellation up to 2 hours before
                        </li>
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Multiple payment options available
                        </li>
                      </ul>
                    )}
                    
                    {step.step === 3 && (
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Contactless entry with QR code
                        </li>
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Automatic seat assignment and navigation
                        </li>
                        <li className="mb-2">
                          <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                          Access to all amenities and services
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`col-lg-6 ${index % 2 === 1 ? 'order-lg-1' : ''}`}>
                <img 
                  src={
                    index === 0 
                      ? "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                      : index === 1
                      ? "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                      : "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  }
                  alt={`Step ${step.step}: ${step.title}`}
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-5 bg-panel">
        <div className="container">
          <div className="text-center mb-5">
            <motion.h2 
              className="font-display fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              The Complete Journey
            </motion.h2>
            <p className="fs-5 text-secondary-custom">
              From registration to productive studying
            </p>
          </div>

          <div className="row g-4">
            {[
              { icon: 'fas fa-user-plus', title: 'Sign Up', desc: 'Create your account in under 2 minutes' },
              { icon: 'fas fa-credit-card', title: 'Add Payment', desc: 'Secure payment setup with multiple options' },
              { icon: 'fas fa-map-marked-alt', title: 'Choose Location', desc: 'Pick from our premium locations' },
              { icon: 'fas fa-calendar-alt', title: 'Select Time', desc: 'Book your preferred time slot' },
              { icon: 'fas fa-qrcode', title: 'Get QR Code', desc: 'Receive instant booking confirmation' },
              { icon: 'fas fa-door-open', title: 'Check In', desc: 'Scan and enter your study space' },
              { icon: 'fas fa-graduation-cap', title: 'Study & Succeed', desc: 'Focus on achieving your goals' },
              { icon: 'fas fa-star', title: 'Rate Experience', desc: 'Help us improve our services' }
            ].map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--muted)',
                      color: 'var(--accent-1)'
                    }}
                  >
                    <i className={item.icon} style={{ fontSize: '1.5rem' }}></i>
                  </div>
                  <h6 className="fw-semibold mb-2">{item.title}</h6>
                  <p className="text-secondary-custom small">{item.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display fw-bold mb-4">Ready to Get Started?</h2>
            <p className="fs-5 text-secondary-custom mb-4">
              Join thousands of students who have transformed their study experience
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-primary-custom btn-lg">
                <i className="fas fa-rocket me-2"></i>
                Start Your Journey
              </button>
              <button className="btn btn-outline-custom btn-lg">
                <i className="fas fa-question-circle me-2"></i>
                View FAQs
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
