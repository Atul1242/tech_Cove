import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  revenue: {
    total: number;
    growth: number;
    monthly: Array<{ month: string; amount: number; bookings: number }>;
  };
  occupancy: {
    average: number;
    peak: number;
    byLocation: Array<{ location: string; rate: number; capacity: number }>;
  };
  users: {
    total: number;
    active: number;
    new: number;
    retention: number;
    demographics: Array<{ segment: string; count: number; percentage: number }>;
  };
  bookings: {
    total: number;
    completed: number;
    cancelled: number;
    noShows: number;
    byTimeSlot: Array<{ hour: number; bookings: number }>;
  };
}

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // TODO: Replace with actual data from API
  const analyticsData: AnalyticsData = {
    revenue: {
      total: 485000,
      growth: 12.5,
      monthly: [
        { month: 'Jan', amount: 120000, bookings: 450 },
        { month: 'Feb', amount: 135000, bookings: 520 },
        { month: 'Mar', amount: 150000, bookings: 580 },
        { month: 'Apr', amount: 145000, bookings: 560 },
        { month: 'May', amount: 160000, bookings: 620 },
        { month: 'Jun', amount: 175000, bookings: 680 }
      ]
    },
    occupancy: {
      average: 72,
      peak: 89,
      byLocation: [
        { location: 'Delhi Central', rate: 85, capacity: 150 },
        { location: 'Mumbai Bandra', rate: 78, capacity: 200 },
        { location: 'Bangalore Koramangala', rate: 65, capacity: 180 },
        { location: 'Pune Koregaon', rate: 58, capacity: 120 }
      ]
    },
    users: {
      total: 2847,
      active: 1950,
      new: 234,
      retention: 78,
      demographics: [
        { segment: 'Students (18-25)', count: 1420, percentage: 50 },
        { segment: 'Young Professionals (26-35)', count: 855, percentage: 30 },
        { segment: 'Professionals (36-45)', count: 427, percentage: 15 },
        { segment: 'Others (45+)', count: 145, percentage: 5 }
      ]
    },
    bookings: {
      total: 3240,
      completed: 2590,
      cancelled: 420,
      noShows: 230,
      byTimeSlot: [
        { hour: 6, bookings: 45 },
        { hour: 7, bookings: 80 },
        { hour: 8, bookings: 150 },
        { hour: 9, bookings: 280 },
        { hour: 10, bookings: 320 },
        { hour: 11, bookings: 290 },
        { hour: 12, bookings: 250 },
        { hour: 13, bookings: 180 },
        { hour: 14, bookings: 240 },
        { hour: 15, bookings: 260 },
        { hour: 16, bookings: 220 },
        { hour: 17, bookings: 180 },
        { hour: 18, bookings: 120 },
        { hour: 19, bookings: 80 },
        { hour: 20, bookings: 35 }
      ]
    }
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'var(--support-moss)' : 'var(--support-coral)';
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 80) return 'var(--support-coral)';
    if (rate >= 60) return 'var(--support-amber)';
    return 'var(--support-moss)';
  };

  const maxBookings = Math.max(...analyticsData.bookings.byTimeSlot.map(slot => slot.bookings));

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="d-flex justify-content-between align-items-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-display fw-bold mb-2" data-testid="analytics-title">
              Analytics & Reports
            </h1>
            <p className="text-secondary-custom">
              Comprehensive insights into StudyCove performance
            </p>
          </div>
          <div className="d-flex gap-2">
            <select
              className="form-select bg-panel border-custom text-light"
              style={{ width: 'auto' }}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              data-testid="period-selector"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="btn btn-outline-custom">
              <i className="fas fa-download me-2"></i>
              Export Report
            </button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <i className="fas fa-rupee-sign mb-2" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
                  <h4 className="fw-bold mb-1">₹{(analyticsData.revenue.total / 1000).toFixed(0)}K</h4>
                  <p className="text-secondary-custom small mb-0">Total Revenue</p>
                </div>
                <span 
                  className="badge px-2 py-1"
                  style={{ 
                    background: getGrowthColor(analyticsData.revenue.growth),
                    color: 'white',
                    borderRadius: '8px'
                  }}
                >
                  +{analyticsData.revenue.growth}%
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <i className="fas fa-chart-pie mb-2" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
                  <h4 className="fw-bold mb-1">{analyticsData.occupancy.average}%</h4>
                  <p className="text-secondary-custom small mb-0">Avg Occupancy</p>
                </div>
                <small className="text-secondary-custom">Peak: {analyticsData.occupancy.peak}%</small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <i className="fas fa-users mb-2" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
                  <h4 className="fw-bold mb-1">{analyticsData.users.total.toLocaleString()}</h4>
                  <p className="text-secondary-custom small mb-0">Total Users</p>
                </div>
                <div className="text-end">
                  <div className="small fw-semibold">{analyticsData.users.active}</div>
                  <small className="text-secondary-custom">Active</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <i className="fas fa-calendar-check mb-2" style={{ fontSize: '2rem', color: 'var(--accent-2)' }}></i>
                  <h4 className="fw-bold mb-1">{analyticsData.bookings.total}</h4>
                  <p className="text-secondary-custom small mb-0">Total Bookings</p>
                </div>
                <div className="text-end">
                  <div className="small fw-semibold">{Math.round((analyticsData.bookings.completed / analyticsData.bookings.total) * 100)}%</div>
                  <small className="text-secondary-custom">Success Rate</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="row g-5">
          {/* Revenue Chart */}
          <div className="col-lg-8">
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h5 className="font-display fw-semibold mb-4">Revenue Trend</h5>
              <div className="mb-4">
                <div className="d-flex align-items-end" style={{ height: '200px', gap: '8px' }}>
                  {analyticsData.revenue.monthly.map((data, index) => (
                    <div key={data.month} className="flex-fill d-flex flex-column align-items-center">
                      <div 
                        className="w-100 rounded-top"
                        style={{ 
                          height: `${(data.amount / 180000) * 160}px`,
                          background: 'linear-gradient(to top, var(--accent-1), var(--accent-2))',
                          minHeight: '20px'
                        }}
                        data-testid={`revenue-bar-${index}`}
                      ></div>
                      <small className="text-secondary-custom mt-2">{data.month}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row text-center">
                <div className="col-4">
                  <div className="fw-bold">₹{(analyticsData.revenue.monthly.slice(-1)[0].amount / 1000).toFixed(0)}K</div>
                  <small className="text-secondary-custom">This Month</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold">₹{(analyticsData.revenue.monthly.slice(-2, -1)[0].amount / 1000).toFixed(0)}K</div>
                  <small className="text-secondary-custom">Last Month</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold">₹{(analyticsData.revenue.monthly.reduce((sum, m) => sum + m.amount, 0) / analyticsData.revenue.monthly.length / 1000).toFixed(0)}K</div>
                  <small className="text-secondary-custom">Avg Monthly</small>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Occupancy by Location */}
          <div className="col-lg-4">
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h5 className="font-display fw-semibold mb-4">Occupancy by Location</h5>
              {analyticsData.occupancy.byLocation.map((location, index) => (
                <div key={index} className="mb-3" data-testid={`occupancy-location-${index}`}>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small fw-semibold">{location.location}</span>
                    <span className="small">{location.rate}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${location.rate}%`,
                        background: getOccupancyColor(location.rate)
                      }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <small className="text-secondary-custom">{location.capacity} seats</small>
                    <small className="text-secondary-custom">{Math.round(location.rate * location.capacity / 100)} occupied</small>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="row g-5 mt-0">
          {/* Booking Patterns */}
          <div className="col-lg-8">
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h5 className="font-display fw-semibold mb-4">Daily Booking Patterns</h5>
              <div className="mb-4">
                <div className="d-flex align-items-end" style={{ height: '150px', gap: '4px' }}>
                  {analyticsData.bookings.byTimeSlot.map((slot, index) => (
                    <div key={index} className="flex-fill d-flex flex-column align-items-center">
                      <div 
                        className="w-100 rounded-top"
                        style={{ 
                          height: `${(slot.bookings / maxBookings) * 120}px`,
                          background: 'var(--support-moss)',
                          minHeight: '10px'
                        }}
                        data-testid={`booking-bar-${index}`}
                      ></div>
                      <small className="text-secondary-custom mt-1" style={{ fontSize: '0.7rem' }}>
                        {slot.hour}:00
                      </small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row text-center">
                <div className="col-3">
                  <div className="fw-bold">9-11 AM</div>
                  <small className="text-secondary-custom">Peak Hours</small>
                </div>
                <div className="col-3">
                  <div className="fw-bold">{analyticsData.bookings.completed}</div>
                  <small className="text-secondary-custom">Completed</small>
                </div>
                <div className="col-3">
                  <div className="fw-bold">{analyticsData.bookings.cancelled}</div>
                  <small className="text-secondary-custom">Cancelled</small>
                </div>
                <div className="col-3">
                  <div className="fw-bold">{analyticsData.bookings.noShows}</div>
                  <small className="text-secondary-custom">No-shows</small>
                </div>
              </div>
            </motion.div>
          </div>

          {/* User Demographics */}
          <div className="col-lg-4">
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h5 className="font-display fw-semibold mb-4">User Demographics</h5>
              {analyticsData.users.demographics.map((segment, index) => (
                <div key={index} className="mb-3" data-testid={`demographics-${index}`}>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small">{segment.segment}</span>
                    <span className="small fw-bold">{segment.percentage}%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${segment.percentage}%`,
                        background: `hsl(${220 + index * 30}, 70%, 60%)`
                      }}
                    ></div>
                  </div>
                  <small className="text-secondary-custom">{segment.count.toLocaleString()} users</small>
                </div>
              ))}
              
              <div className="mt-4 pt-3 border-top border-custom">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Retention Rate</span>
                  <span className="fw-bold" style={{ color: 'var(--support-moss)' }}>
                    {analyticsData.users.retention}%
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">New Users (This Month)</span>
                  <span className="fw-bold" style={{ color: 'var(--accent-1)' }}>
                    +{analyticsData.users.new}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Performance Summary */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="font-display fw-bold text-center mb-4">Performance Summary</h4>
            <div className="row g-4">
              <div className="col-md-3 text-center">
                <div className="fw-bold fs-4" style={{ color: 'var(--accent-1)' }}>₹15.2K</div>
                <small className="text-secondary-custom">Avg Revenue per Day</small>
              </div>
              <div className="col-md-3 text-center">
                <div className="fw-bold fs-4" style={{ color: 'var(--support-moss)' }}>4.2h</div>
                <small className="text-secondary-custom">Avg Session Duration</small>
              </div>
              <div className="col-md-3 text-center">
                <div className="fw-bold fs-4" style={{ color: 'var(--support-amber)' }}>89%</div>
                <small className="text-secondary-custom">Customer Satisfaction</small>
              </div>
              <div className="col-md-3 text-center">
                <div className="fw-bold fs-4" style={{ color: 'var(--accent-2)' }}>2.3x</div>
                <small className="text-secondary-custom">YoY Growth</small>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Analytics;
