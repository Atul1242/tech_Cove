import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND } from '../../utils/constants';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCTAs?: boolean;
  showStats?: boolean;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title = BRAND.tagline,
  subtitle = BRAND.description,
  showCTAs = true,
  showStats = true,
  backgroundImage = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
  children
}) => {
  return (
    <section 
      className="hero-gradient py-5" 
      style={{ 
        marginTop: '76px', 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center' 
      }}
    >
      <div className="container hero-content">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 
                className="font-display fw-bold mb-4" 
                style={{ fontSize: '3.5rem', lineHeight: '1.1' }}
                data-testid="hero-title"
              >
                {title.includes('quiet seat') ? (
                  <>
                    Your guaranteed <span style={{ color: 'var(--accent-1)' }}>quiet seat</span>—any day.
                  </>
                ) : (
                  title
                )}
              </h1>
              <p 
                className="fs-5 text-secondary-custom mb-4" 
                data-testid="hero-subtitle"
              >
                {subtitle}
              </p>

              {showCTAs && (
                <motion.div 
                  className="d-flex flex-wrap gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link 
                    to="/book-seat" 
                    className="btn btn-primary-custom btn-lg"
                    data-testid="btn-book-seat"
                  >
                    <i className="fas fa-calendar-check me-2"></i>Book Your Seat
                  </Link>
                  <Link 
                    to="/locations" 
                    className="btn btn-outline-custom btn-lg"
                    data-testid="btn-view-locations"
                  >
                    <i className="fas fa-map-marker-alt me-2"></i>View Locations
                  </Link>
                </motion.div>
              )}

              {showStats && (
                <motion.div 
                  className="d-flex align-items-center gap-4 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="d-flex align-items-center">
                    <div className="status-indicator status-green"></div>
                    <span className="small text-secondary-custom" data-testid="seats-available">
                      127 seats available today
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-star" style={{ color: 'var(--support-amber)' }}></i>
                    <span className="ms-1 small text-secondary-custom" data-testid="rating">
                      4.9/5 from 2,847 students
                    </span>
                  </div>
                </motion.div>
              )}

              {children}
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src={backgroundImage}
                alt="Modern study space with students" 
                className="img-fluid rounded-4 shadow-lg" 
                style={{ borderRadius: '24px !important' }}
                data-testid="hero-image"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
