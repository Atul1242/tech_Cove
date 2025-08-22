import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT } from '../utils/constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      {/* Header */}
      <section className="hero-gradient py-5">
        <div className="container">
          <div className="text-center py-4">
            <motion.h1 
              className="font-display fw-bold mb-4" 
              style={{ fontSize: '3rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              data-testid="contact-title"
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're here to help you succeed. Reach out with any questions or feedback.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-lg-8">
            <motion.div 
              className="card-custom p-5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display fw-bold mb-4">Send us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control bg-muted border-custom text-light"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control bg-muted border-custom text-light"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject *</label>
                  <select
                    className="form-select bg-muted border-custom text-light"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    data-testid="select-subject"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-control bg-muted border-custom text-light"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    required
                    data-testid="textarea-message"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary-custom btn-lg"
                  data-testid="btn-submit"
                >
                  <i className="fas fa-paper-plane me-2"></i>
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            <motion.div 
              className="card-custom p-4 mb-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-display fw-bold mb-4">Contact Information</h4>
              
              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <i className="fas fa-map-marker-alt me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-1">Address</h6>
                    <p className="text-secondary-custom small mb-0">{CONTACT.address}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <i className="fas fa-phone me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-1">Phone</h6>
                    <p className="text-secondary-custom small mb-0">{CONTACT.phone}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <i className="fas fa-envelope me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-1">Email</h6>
                    <p className="text-secondary-custom small mb-0">{CONTACT.email}</p>
                  </div>
                </div>
              </div>

              <div className="border-top border-custom pt-4">
                <h6 className="fw-semibold mb-3">Follow Us</h6>
                <div className="d-flex gap-2">
                  <a 
                    href={CONTACT.social.facebook} 
                    className="social-icon"
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="social-facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href={CONTACT.social.twitter} 
                    className="social-icon"
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="social-twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href={CONTACT.social.instagram} 
                    className="social-icon"
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="social-instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href={CONTACT.social.linkedin} 
                    className="social-icon"
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="social-linkedin"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h5 className="fw-semibold mb-3">Office Hours</h5>
              <div className="small">
                <div className="d-flex justify-content-between mb-2">
                  <span>Monday - Friday</span>
                  <span className="text-secondary-custom">9:00 AM - 6:00 PM</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Saturday</span>
                  <span className="text-secondary-custom">10:00 AM - 4:00 PM</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Sunday</span>
                  <span className="text-secondary-custom">Closed</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-top border-custom">
                <p className="text-secondary-custom small mb-0">
                  <i className="fas fa-clock me-2"></i>
                  We typically respond within 24 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h3 className="font-display fw-bold mb-3">Quick Answers</h3>
              <p className="text-secondary-custom">
                Check out these common questions before reaching out
              </p>
            </div>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fas fa-question-circle me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-2">How do I book a study seat?</h6>
                    <p className="text-secondary-custom small">
                      You can book through our website or mobile app. Select location, date, and time to reserve your spot.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fas fa-question-circle me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-2">What's your cancellation policy?</h6>
                    <p className="text-secondary-custom small">
                      Free cancellation up to 2 hours before your booking. See our terms for full details.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fas fa-question-circle me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-2">Do you offer student discounts?</h6>
                    <p className="text-secondary-custom small">
                      Yes! Students get up to 25% off with valid student ID verification.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fas fa-question-circle me-3 mt-1" style={{ color: 'var(--accent-1)' }}></i>
                  <div>
                    <h6 className="fw-semibold mb-2">Is WiFi included?</h6>
                    <p className="text-secondary-custom small">
                      Absolutely! High-speed WiFi is complimentary at all our locations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <button className="btn btn-outline-custom">
                View All FAQs <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
