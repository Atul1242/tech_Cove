import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQ } from '../types';
import faqsData from '../data/faqs.json';

const FAQs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqs = faqsData as FAQ[];

  const categories = [
    'all',
    ...Array.from(new Set(faqs.map(faq => faq.category)))
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
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
              data-testid="faqs-title"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find answers to common questions about StudyCove
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        {/* Search and Filters */}
        <motion.div 
          className="row mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="col-md-8 mb-3">
            <div className="position-relative">
              <input
                type="text"
                className="form-control bg-panel border-custom text-light ps-5"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-faqs"
              />
              <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary-custom"></i>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select bg-panel border-custom text-light"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              data-testid="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {filteredFAQs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                className="card-custom mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`faq-item-${faq.id}`}
              >
                <div 
                  className="card-header bg-transparent border-0 p-4 cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-semibold" data-testid={`faq-question-${faq.id}`}>
                      {faq.question}
                    </h6>
                    <div className="d-flex align-items-center gap-3">
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: 'var(--muted)', 
                          color: 'var(--text-secondary)',
                          borderRadius: '8px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {faq.category}
                      </span>
                      <i 
                        className={`fas fa-chevron-${openFAQ === faq.id ? 'up' : 'down'} text-secondary-custom`}
                        style={{ 
                          transition: 'transform 0.2s ease',
                          transform: openFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openFAQ === faq.id ? 'auto' : 0,
                    opacity: openFAQ === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="card-body pt-0 px-4 pb-4">
                    <p className="text-secondary-custom mb-0" data-testid={`faq-answer-${faq.id}`}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-question-circle text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h3 className="text-secondary-custom">No FAQs found</h3>
            <p className="text-secondary-custom">Try adjusting your search or category filter</p>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display fw-bold mb-3">Still have questions?</h3>
          <p className="text-secondary-custom mb-4">
            Our support team is here to help you get the most out of StudyCove
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-primary-custom">
              <i className="fas fa-comments me-2"></i>
              Live Chat
            </button>
            <button className="btn btn-outline-custom">
              <i className="fas fa-envelope me-2"></i>
              Email Support
            </button>
            <button className="btn btn-outline-custom">
              <i className="fas fa-phone me-2"></i>
              Call Us
            </button>
          </div>
        </motion.section>

        {/* Popular Topics */}
        <motion.section 
          className="py-5 mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display fw-bold text-center mb-4">Popular Help Topics</h3>
          <div className="row g-3">
            {[
              { icon: 'fas fa-credit-card', title: 'Billing & Payments', desc: 'Manage subscriptions and invoices' },
              { icon: 'fas fa-calendar-alt', title: 'Booking & Reservations', desc: 'How to book and cancel seats' },
              { icon: 'fas fa-user-cog', title: 'Account Management', desc: 'Profile settings and preferences' },
              { icon: 'fas fa-mobile-alt', title: 'Mobile App', desc: 'Download and use our mobile app' }
            ].map((topic, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card-custom p-4 text-center h-100">
                  <i 
                    className={`${topic.icon} mb-3`} 
                    style={{ fontSize: '2rem', color: 'var(--accent-1)' }}
                  ></i>
                  <h6 className="fw-semibold mb-2">{topic.title}</h6>
                  <p className="text-secondary-custom small mb-3">{topic.desc}</p>
                  <button className="btn btn-outline-custom btn-sm">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FAQs;
