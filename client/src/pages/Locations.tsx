import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LocationCard from '../components/common/LocationCard';
import { Location } from '../types';
import locationsData from '../data/locations.json';

const Locations: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const locations = locationsData as Location[];

  const cities = ['all', ...Array.from(new Set(locations.map(location => location.city)))];

  const filteredLocations = locations.filter(location => {
    const matchesCity = selectedCity === 'all' || location.city === selectedCity;
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-3" data-testid="locations-title">
            Study Locations
          </h1>
          <p className="fs-5 text-secondary-custom">
            Find the perfect study space near you
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="row mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control bg-panel border-custom text-light"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="search-input"
            />
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select bg-panel border-custom text-light"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              data-testid="city-filter"
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <div className="row g-4">
          {filteredLocations.map((location, index) => (
            <div key={location.id} className="col-lg-4 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LocationCard location={location} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-map-marker-alt text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h3 className="text-secondary-custom">No locations found</h3>
            <p className="text-secondary-custom">Try adjusting your search criteria</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="row">
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold text-accent-1">6+</h3>
              <p className="text-secondary-custom">Cities</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold text-accent-1">1,000+</h3>
              <p className="text-secondary-custom">Study Seats</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold text-accent-1">24/7</h3>
              <p className="text-secondary-custom">Access Available</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold text-accent-1">99.9%</h3>
              <p className="text-secondary-custom">Uptime</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Locations;
