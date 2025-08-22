import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Location } from '../../types';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 40) return 'var(--support-moss)';
    if (occupancy < 70) return 'var(--support-amber)';
    return 'var(--support-coral)';
  };

  const getOccupancyGradient = (occupancy: number) => {
    if (occupancy < 40) return 'linear-gradient(135deg, var(--support-moss), #5A9B7A)';
    if (occupancy < 70) return 'linear-gradient(135deg, var(--support-amber), #CC9A52)';
    return 'linear-gradient(135deg, var(--support-coral), #CC5A4E)';
  };

  return (
    <motion.div 
      className="card-custom h-100"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      data-testid={`location-card-${location.id}`}
    >
      <img 
        src={location.image}
        alt={`${location.name} location`} 
        className="card-img-top" 
        style={{ height: '200px', objectFit: 'cover' }}
        data-testid={`location-image-${location.id}`}
      />

      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-semibold mb-1" data-testid={`location-name-${location.id}`}>
              {location.name}
            </h5>
            <p className="text-secondary-custom small mb-0" data-testid={`location-address-${location.id}`}>
              <i className="fas fa-map-marker-alt me-1"></i>
              {location.address}
            </p>
          </div>
          <span 
            className="occupancy-badge" 
            style={{ background: getOccupancyGradient(location.occupancy) }}
            data-testid={`location-occupancy-${location.id}`}
          >
            {location.occupancy}% full
          </span>
        </div>

        <div className="d-flex align-items-center gap-3 mb-3">
          <span className="small text-secondary-custom" data-testid={`location-hours-${location.id}`}>
            <i className="fas fa-clock me-1"></i>
            {location.hours}
          </span>
          <span className="small text-secondary-custom" data-testid={`location-seats-${location.id}`}>
            <i className="fas fa-users me-1"></i>
            {location.totalSeats} seats
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {location.amenities.slice(0, 4).map((amenity, index) => (
            <span 
              key={index} 
              className="badge bg-secondary small"
              data-testid={`location-amenity-${location.id}-${index}`}
            >
              {amenity}
            </span>
          ))}
          {location.amenities.length > 4 && (
            <span className="badge bg-secondary small">
              +{location.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="price-highlight" data-testid={`location-price-${location.id}`}>
              ₹{location.pricePerDay}/day
            </span>
            <div className="d-flex align-items-center mt-1">
              <div className="text-warning me-1">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star ${i < Math.floor(location.rating) ? '' : 'text-muted'}`}
                  ></i>
                ))}
              </div>
              <small className="text-secondary-custom">
                {location.rating} ({location.reviewCount})
              </small>
            </div>
          </div>
          <Link 
            to={`/locations/${location.id}`}
            className="btn btn-primary-custom btn-sm"
            data-testid={`btn-view-location-${location.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
