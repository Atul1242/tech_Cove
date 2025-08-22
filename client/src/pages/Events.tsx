import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Event } from '../types';
import eventsData from '../data/events.json';

const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const events = eventsData as Event[];

  const categories = [
    'all',
    ...Array.from(new Set(events.map(event => event.category)))
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const handleRegister = (eventId: string) => {
    // TODO: Implement event registration
    console.log('Registering for event:', eventId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
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
              data-testid="events-title"
            >
              Events & Workshops
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Enhance your skills with expert-led sessions and networking opportunities
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        {/* Category Filter */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="d-inline-flex bg-panel rounded-4 p-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`btn btn-sm px-4 py-2 me-2 mb-2 ${selectedCategory === category ? 'active' : ''}`}
                style={selectedCategory === category ? {
                  background: 'var(--accent-1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px'
                } : {
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)'
                }}
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category}`}
              >
                {category === 'all' ? 'All Events' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="row g-4">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="col-lg-6">
              <motion.div 
                className="card-custom h-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`event-card-${event.id}`}
              >
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', minHeight: '200px' }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 h-100 d-flex flex-column">
                      <div className="mb-3">
                        <span 
                          className="badge px-3 py-1 mb-2"
                          style={{ 
                            background: 'var(--accent-1)', 
                            color: 'white',
                            borderRadius: '12px'
                          }}
                        >
                          {event.category}
                        </span>
                        <h5 className="fw-semibold mb-2" data-testid={`event-title-${event.id}`}>
                          {event.title}
                        </h5>
                        <p className="text-secondary-custom small mb-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="fas fa-calendar me-2" style={{ color: 'var(--accent-1)' }}></i>
                          <span className="small">{formatDate(event.date)}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="fas fa-clock me-2" style={{ color: 'var(--accent-1)' }}></i>
                          <span className="small">{formatTime(event.time)} ({event.duration} mins)</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="fas fa-map-marker-alt me-2" style={{ color: 'var(--accent-1)' }}></i>
                          <span className="small">{event.location}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-user me-2" style={{ color: 'var(--accent-1)' }}></i>
                          <span className="small">By {event.instructor}</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <div className="small text-secondary-custom">
                              {event.registered}/{event.capacity} registered
                            </div>
                            <div 
                              className="progress mt-1" 
                              style={{ height: '4px', background: 'var(--muted)' }}
                            >
                              <div 
                                className="progress-bar" 
                                style={{ 
                                  width: `${(event.registered / event.capacity) * 100}%`,
                                  background: 'var(--support-moss)'
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="price-highlight fw-bold">₹{event.price}</div>
                          </div>
                        </div>

                        <button 
                          className="btn btn-primary-custom w-100"
                          onClick={() => handleRegister(event.id)}
                          disabled={event.registered >= event.capacity}
                          data-testid={`btn-register-${event.id}`}
                        >
                          {event.registered >= event.capacity ? 'Sold Out' : 'Register Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-calendar-times text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h3 className="text-secondary-custom">No events found</h3>
            <p className="text-secondary-custom">Try selecting a different category</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display fw-bold mb-3">Want to Host an Event?</h3>
          <p className="text-secondary-custom mb-4">
            Share your expertise with our community. We provide the space and audience.
          </p>
          <button className="btn btn-outline-custom">
            <i className="fas fa-plus me-2"></i>
            Propose an Event
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default Events;
