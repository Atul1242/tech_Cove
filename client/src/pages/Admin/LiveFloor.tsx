import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SeatData {
  id: string;
  number: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  user?: string;
  checkInTime?: string;
  plannedDuration?: number;
}

interface LocationFloor {
  id: string;
  name: string;
  totalSeats: number;
  occupiedSeats: number;
  reservedSeats: number;
  availableSeats: number;
  seats: SeatData[];
}

const LiveFloor: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('delhi-central');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // TODO: Replace with actual real-time data from API
  const locations: LocationFloor[] = [
    {
      id: 'delhi-central',
      name: 'Delhi Central',
      totalSeats: 150,
      occupiedSeats: 89,
      reservedSeats: 15,
      availableSeats: 46,
      seats: Array.from({ length: 150 }, (_, i) => ({
        id: `seat-${i + 1}`,
        number: `${String.fromCharCode(65 + Math.floor(i / 25))}-${(i % 25) + 1}`,
        status: Math.random() > 0.6 ? 'occupied' : 
                Math.random() > 0.8 ? 'reserved' : 
                Math.random() > 0.95 ? 'maintenance' : 'available',
        user: Math.random() > 0.6 ? `User ${i + 1}` : undefined,
        checkInTime: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000).toISOString() : undefined,
        plannedDuration: Math.random() > 0.6 ? Math.floor(Math.random() * 8) + 1 : undefined
      }))
    }
  ];

  const currentLocation = locations.find(loc => loc.id === selectedLocation) || locations[0];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
        // TODO: Fetch updated seat data
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available': return 'var(--support-moss)';
      case 'occupied': return 'var(--support-coral)';
      case 'reserved': return 'var(--support-amber)';
      case 'maintenance': return 'var(--text-secondary)';
      default: return 'var(--borders)';
    }
  };

  const getSeatIcon = (status: string) => {
    switch (status) {
      case 'available': return 'fas fa-chair';
      case 'occupied': return 'fas fa-user';
      case 'reserved': return 'fas fa-clock';
      case 'maintenance': return 'fas fa-tools';
      default: return 'fas fa-chair';
    }
  };

  const handleSeatClick = (seat: SeatData) => {
    // TODO: Implement seat management actions
    console.log('Seat clicked:', seat);
  };

  const getOccupancyLevel = (percentage: number) => {
    if (percentage >= 90) return { label: 'Very High', color: 'var(--support-coral)' };
    if (percentage >= 75) return { label: 'High', color: 'var(--accent-2)' };
    if (percentage >= 50) return { label: 'Medium', color: 'var(--support-amber)' };
    return { label: 'Low', color: 'var(--support-moss)' };
  };

  const occupancyPercentage = Math.round((currentLocation.occupiedSeats / currentLocation.totalSeats) * 100);
  const occupancyLevel = getOccupancyLevel(occupancyPercentage);

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container-fluid py-5">
        {/* Header */}
        <motion.div 
          className="d-flex justify-content-between align-items-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-display fw-bold mb-2" data-testid="live-floor-title">
              Live Floor View
            </h1>
            <p className="text-secondary-custom">
              Real-time occupancy monitoring • Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="d-flex gap-3 align-items-center">
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                data-testid="auto-refresh-toggle"
              />
              <label className="form-check-label text-secondary-custom">Auto Refresh</label>
            </div>
            
            <select
              className="form-select bg-panel border-custom text-light"
              style={{ width: 'auto' }}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              data-testid="location-selector"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            
            <button className="btn btn-outline-custom">
              <i className="fas fa-sync-alt me-2"></i>
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Status Overview */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: occupancyLevel.color + '20',
                    color: occupancyLevel.color
                  }}
                >
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{occupancyPercentage}%</h3>
                  <small className="text-secondary-custom">Occupancy</small>
                </div>
              </div>
              <span 
                className="badge px-3 py-1"
                style={{ background: occupancyLevel.color, color: 'white', borderRadius: '12px' }}
              >
                {occupancyLevel.label} Usage
              </span>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-users mb-3" style={{ fontSize: '2rem', color: 'var(--support-coral)' }}></i>
              <h3 className="fw-bold mb-1">{currentLocation.occupiedSeats}</h3>
              <p className="text-secondary-custom small mb-0">Occupied Seats</p>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-clock mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h3 className="fw-bold mb-1">{currentLocation.reservedSeats}</h3>
              <p className="text-secondary-custom small mb-0">Reserved Seats</p>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-chair mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h3 className="fw-bold mb-1">{currentLocation.availableSeats}</h3>
              <p className="text-secondary-custom small mb-0">Available Seats</p>
            </div>
          </div>
        </motion.div>

        {/* Floor Map */}
        <motion.div 
          className="card-custom p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="font-display fw-semibold">Floor Map - {currentLocation.name}</h4>
            
            {/* Legend */}
            <div className="d-flex gap-4">
              {[
                { status: 'available', label: 'Available' },
                { status: 'occupied', label: 'Occupied' },
                { status: 'reserved', label: 'Reserved' },
                { status: 'maintenance', label: 'Maintenance' }
              ].map(item => (
                <div key={item.status} className="d-flex align-items-center">
                  <div 
                    className="rounded me-2"
                    style={{ 
                      width: '16px', 
                      height: '16px', 
                      background: getSeatColor(item.status) 
                    }}
                  ></div>
                  <small className="text-secondary-custom">{item.label}</small>
                </div>
              ))}
            </div>
          </div>
          
          {/* Seat Grid */}
          <div className="row g-2">
            {currentLocation.seats.map((seat, index) => (
              <div key={seat.id} className="col-auto">
                <motion.button
                  className="btn p-2 position-relative"
                  style={{ 
                    width: '45px', 
                    height: '45px',
                    background: getSeatColor(seat.status),
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  onClick={() => handleSeatClick(seat)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`seat-${seat.id}`}
                  title={`Seat ${seat.number} - ${seat.status}${seat.user ? ` (${seat.user})` : ''}`}
                >
                  <i className={getSeatIcon(seat.status)} style={{ fontSize: '0.8rem' }}></i>
                  <span 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end justify-content-center"
                    style={{ fontSize: '0.6rem', lineHeight: '1' }}
                  >
                    {seat.number.split('-')[1]}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Actions */}
        <motion.div 
          className="card-custom p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h5 className="font-display fw-semibold mb-3">Quick Actions</h5>
          <div className="d-flex gap-3 flex-wrap">
            <button className="btn btn-outline-custom">
              <i className="fas fa-broadcast-tower me-2"></i>
              Send Announcement
            </button>
            <button className="btn btn-outline-custom">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Report Issue
            </button>
            <button className="btn btn-outline-custom">
              <i className="fas fa-broom me-2"></i>
              Schedule Cleaning
            </button>
            <button className="btn btn-outline-custom">
              <i className="fas fa-download me-2"></i>
              Export Data
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveFloor;
