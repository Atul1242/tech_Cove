import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../utils/constants';

const Features: React.FC = () => {
  const additionalFeatures = [
    {
      icon: 'fas fa-shield-alt',
      title: '24/7 Security',
      description: 'Round-the-clock security personnel and CCTV monitoring for your peace of mind',
      color: 'var(--support-coral)'
    },
    {
      icon: 'fas fa-users',
      title: 'Community',
      description: 'Connect with like-minded students and professionals in our vibrant study community',
      color: 'var(--accent-2)'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Flexible Booking',
      description: 'Book by the hour, day, or month. Cancel anytime with our flexible policies',
      color: 'var(--support-amber)'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile App',
      description: 'Manage bookings, check-in with QR codes, and monitor occupancy on the go',
      color: 'var(--accent-1)'
    }
  ];

  const allFeatures = [...FEATURES, ...additionalFeatures];

  return (
    <>
      <style>{`
        .feature-icon-dark {
          color: #1a1d29 !important;
        }
      `}</style>
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
              data-testid="features-title"
            >
              Everything You Need to <span style={{ color: 'var(--accent-1)' }}>Study Better</span>
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium amenities and services designed to enhance your productivity
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {allFeatures.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <motion.div 
                  className="card-custom p-4 text-center h-100"
                  style={{
                    background: 'linear-gradient(135deg, #f0f4f8, #e8eef5)',
                    border: '1px solid rgba(229, 213, 204, 0.5)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <div 
                    className="mx-auto mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 20px ${feature.color}40`
                    }}
                  >
                    <i 
                      className={`${feature.icon} feature-icon-dark`}
                      style={{
                        fontSize: '2.5rem'
                      }}
                    ></i>
                  </div>
                  <h4 className="font-display fw-semibold mb-3" style={{ color: '#1a1d29' }}>
                    {feature.title}
                  </h4>
                  <p className="mb-0" style={{ color: '#4A4A4A' }}>
                    {feature.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Environment Section */}
      <section className="py-5 bg-panel">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display fw-bold mb-4">Designed for Deep Focus</h2>
                <p className="text-secondary-custom mb-4">
                  Our study spaces are scientifically designed to optimize concentration and productivity. 
                  From acoustic panels to ergonomic seating, every detail matters.
                </p>
                
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-thermometer-half me-3" style={{ color: 'var(--accent-1)' }}></i>
                      <div>
                        <h6 className="mb-0">Climate Control</h6>
                        <small className="text-secondary-custom">22-24°C optimal</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-lightbulb me-3" style={{ color: 'var(--support-amber)' }}></i>
                      <div>
                        <h6 className="mb-0">Perfect Lighting</h6>
                        <small className="text-secondary-custom">500-1000 lux</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-leaf me-3" style={{ color: 'var(--support-moss)' }}></i>
                      <div>
                        <h6 className="mb-0">Air Quality</h6>
                        <small className="text-secondary-custom">HEPA filtered</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-chair me-3" style={{ color: 'var(--accent-2)' }}></i>
                      <div>
                        <h6 className="mb-0">Ergonomic Seats</h6>
                        <small className="text-secondary-custom">Herman Miller</small>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="col-lg-6">
              <motion.img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern study environment"
                className="img-fluid rounded-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <motion.h2 
              className="font-display fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Cutting-Edge Technology
            </motion.h2>
            <p className="fs-5 text-secondary-custom">
              State-of-the-art infrastructure to support your academic goals
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <motion.div 
                className="card-custom p-4 text-center h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <i className="fas fa-wifi text-accent-1 mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-semibold mb-2">Ultra-Fast WiFi</h5>
                <p className="text-secondary-custom small mb-3">
                  1 Gbps fiber internet with backup connections for uninterrupted access
                </p>
                <div className="small text-secondary-custom">
                  <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                  99.9% uptime guarantee
                </div>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div 
                className="card-custom p-4 text-center h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <i className="fas fa-qrcode text-accent-2 mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-semibold mb-2">Smart Check-in</h5>
                <p className="text-secondary-custom small mb-3">
                  QR code based seamless entry and seat allocation system
                </p>
                <div className="small text-secondary-custom">
                  <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                  Contactless experience
                </div>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div 
                className="card-custom p-4 text-center h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <i className="fas fa-chart-line text-support-moss mb-3" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="fw-semibold mb-2">Real-time Analytics</h5>
                <p className="text-secondary-custom small mb-3">
                  Live occupancy tracking and noise level monitoring
                </p>
                <div className="small text-secondary-custom">
                  <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                  Data-driven insights
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-panel">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display fw-bold mb-4">Experience the Difference</h2>
            <p className="fs-5 text-secondary-custom mb-4">
              See why thousands of students choose StudyCove for their academic success
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-primary-custom btn-lg">
                <i className="fas fa-calendar-check me-2"></i>
                Book Free Trial
              </button>
              <button className="btn btn-outline-custom btn-lg">
                <i className="fas fa-map-marker-alt me-2"></i>
                Find Locations
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Features;
