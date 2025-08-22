import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import LocationCard from '../components/common/LocationCard';
import PricingCard from '../components/common/PricingCard';
import TestimonialCard from '../components/common/TestimonialCard';
import { useQuery } from '@tanstack/react-query';
import { Location, PricingPlan, Testimonial } from '../types';
import { HOW_IT_WORKS, FEATURES } from '../utils/constants';

// Import data
import locationsData from '../data/locations.json';
import pricingData from '../data/pricing.json';
import testimonialsData from '../data/testimonials.json';

const Home: React.FC = () => {
  const locations = locationsData.slice(0, 3) as Location[];
  const testimonials = testimonialsData.slice(0, 3) as Testimonial[];
  const pricingPlans = pricingData.student as PricingPlan[];

  const handleSelectPlan = (planId: string) => {
    // TODO: Implement plan selection
    console.log('Selected plan:', planId);
  };

  return (
    <div className="bg-dark-custom">
      {/* Hero Section */}
      <Hero />

      {/* Trust Indicators */}
      <section className="py-5 bg-panel">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-secondary-custom text-uppercase fw-semibold mb-4">
              Trusted by students from
            </h6>
            <div className="row justify-content-center align-items-center">
              {[
                "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80",
                "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80",
                "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80",
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80"
              ].map((logo, index) => (
                <div key={index} className="col-6 col-md-2 text-center mb-3">
                  <img src={logo} alt={`Partner ${index + 1}`} className="partner-logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <motion.h2 
              className="font-display fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              How StudyCove Works
            </motion.h2>
            <p className="fs-5 text-secondary-custom">
              Get your perfect study space in just three simple steps
            </p>
          </div>

          <div className="row g-4">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.step} className="col-md-4">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="feature-icon mx-auto">
                    <i className={step.icon}></i>
                  </div>
                  <h4 className="font-display fw-semibold mb-3">{step.title}</h4>
                  <p className="text-secondary-custom">{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-panel">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.h2 
                className="font-display fw-bold mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Why Choose StudyCove?
              </motion.h2>

              <div className="row g-4">
                {FEATURES.slice(0, 4).map((feature, index) => (
                  <div key={index} className="col-sm-6">
                    <motion.div 
                      className="d-flex align-items-start"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="me-3">
                        <i 
                          className={feature.icon} 
                          style={{ color: feature.color, fontSize: '1.5rem' }}
                        ></i>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">{feature.title}</h5>
                        <p className="text-secondary-custom small mb-0">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <motion.img 
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Cozy study environment with modern amenities" 
                className="img-fluid rounded-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Teaser */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <motion.h2 
                className="font-display fw-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Study Locations
              </motion.h2>
              <p className="text-secondary-custom">Premium spaces across major cities</p>
            </div>
            <button className="btn btn-outline-custom">
              View All Locations <i className="fas fa-arrow-right ms-2"></i>
            </button>
          </div>

          <div className="row g-4">
            {locations.map((location, index) => (
              <div key={location.id} className="col-lg-4 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <LocationCard location={location} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-5 bg-panel">
        <div className="container">
          <div className="text-center mb-5">
            <motion.h2 
              className="font-display fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <p className="fs-5 text-secondary-custom">Choose the plan that fits your study schedule</p>
          </div>

          <div className="row g-4 justify-content-center">
            {pricingPlans.map((plan, index) => (
              <div key={plan.id} className="col-lg-4 col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PricingCard 
                    plan={plan} 
                    isPopular={plan.popular}
                    onSelectPlan={handleSelectPlan}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <motion.h2 
              className="font-display fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              What Students Say
            </motion.h2>
            <p className="fs-5 text-secondary-custom">Join thousands of successful students</p>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="col-lg-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-panel">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.h2 
                className="font-display fw-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Ready to Transform Your Study Experience?
              </motion.h2>
              <p className="fs-5 text-secondary-custom mb-4">
                Join thousands of successful students who've found their perfect study space. 
                Book your first session today and experience the difference.
              </p>

              <motion.div 
                className="d-flex flex-wrap justify-content-center gap-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button className="btn btn-primary-custom btn-lg">
                  <i className="fas fa-rocket me-2"></i>Start Free Trial
                </button>
                <button className="btn btn-outline-custom btn-lg">
                  <i className="fas fa-calendar me-2"></i>Schedule a Tour
                </button>
              </motion.div>

              <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap text-secondary-custom">
                <span className="small"><i className="fas fa-check me-1"></i>No setup fees</span>
                <span className="small"><i className="fas fa-check me-1"></i>Cancel anytime</span>
                <span className="small"><i className="fas fa-check me-1"></i>7-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
