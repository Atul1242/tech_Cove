import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div 
      className="testimonial-card h-100"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      <div className="d-flex align-items-center mb-3">
        <div className="me-3">
          <img 
            src={testimonial.avatar}
            alt={`${testimonial.name} testimonial`} 
            className="rounded-circle" 
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            data-testid={`testimonial-avatar-${testimonial.id}`}
          />
        </div>
        <div>
          <h6 className="fw-semibold mb-0" data-testid={`testimonial-name-${testimonial.id}`}>
            {testimonial.name}
          </h6>
          <small className="text-secondary-custom" data-testid={`testimonial-role-${testimonial.id}`}>
            {testimonial.role}
          </small>
        </div>
      </div>

      <p className="mb-3" data-testid={`testimonial-content-${testimonial.id}`}>
        {testimonial.content}
      </p>

      <div className="d-flex align-items-center">
        <div className="text-warning me-2" data-testid={`testimonial-rating-${testimonial.id}`}>
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star ${i < testimonial.rating ? '' : 'text-muted'}`}
            ></i>
          ))}
        </div>
        <small className="text-secondary-custom">{testimonial.rating}.0</small>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
