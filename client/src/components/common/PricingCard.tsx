import React from 'react';
import { motion } from 'framer-motion';
import { PricingPlan } from '../../types';

interface PricingCardProps {
  plan: PricingPlan;
  isPopular?: boolean;
  onSelectPlan: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isPopular, onSelectPlan }) => {
  return (
    <motion.div 
      className={`card-custom h-100 text-center p-4 position-relative ${isPopular ? 'border-2' : ''}`}
      style={isPopular ? { border: '2px solid var(--accent-1)' } : {}}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      data-testid={`pricing-card-${plan.id}`}
    >
      {isPopular && (
        <div className="position-absolute top-0 start-50 translate-middle">
          <span 
            className="badge px-3 py-2" 
            style={{ background: 'var(--accent-1)', color: 'white' }}
            data-testid="popular-badge"
          >
            Most Popular
          </span>
        </div>
      )}

      <div className={`mb-4 ${isPopular ? 'mt-3' : ''}`}>
        <h4 className="font-display fw-bold" data-testid={`plan-name-${plan.id}`}>
          {plan.name}
        </h4>
        <p className="text-secondary-custom" data-testid={`plan-description-${plan.id}`}>
          {plan.description}
        </p>
      </div>

      <div className="mb-4">
        <span 
          className="price-highlight" 
          style={{ fontSize: '3rem', fontWeight: '700' }}
          data-testid={`plan-price-${plan.id}`}
        >
          ₹{plan.price.toLocaleString()}
        </span>
        <span className="text-secondary-custom">/{plan.period}</span>
        {plan.originalPrice && (
          <div className="small text-secondary-custom">
            <del>₹{plan.originalPrice.toLocaleString()}</del> Save ₹{(plan.originalPrice - plan.price).toLocaleString()}
          </div>
        )}
        {plan.period === 'month' && (
          <div className="small text-secondary-custom">
            ₹{Math.round(plan.price / 30)}/day equivalent
          </div>
        )}
      </div>

      <ul className="list-unstyled mb-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="mb-2" data-testid={`plan-feature-${plan.id}-${index}`}>
            <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
            {feature}
          </li>
        ))}
      </ul>

      <button 
        className={`btn w-100 ${isPopular ? 'btn-primary-custom' : 'btn-outline-custom'}`}
        onClick={() => onSelectPlan(plan.id)}
        data-testid={`btn-select-plan-${plan.id}`}
      >
        Choose {plan.name}
      </button>
    </motion.div>
  );
};

export default PricingCard;
