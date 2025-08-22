import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  membershipType: 'day' | 'monthly' | 'premium' | null;
  membershipExpiry?: string;
  totalBookings: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  lastActivity: string;
  avatar?: string;
}

const AdminMembers: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMembership, setSelectedMembership] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // TODO: Replace with actual data from API
  const members: Member[] = [
    {
      id: 'M001',
      name: 'Arjun Sharma',
      email: 'arjun@example.com',
      phone: '+91 98765 43210',
      joinedAt: '2024-01-15',
      membershipType: 'monthly',
      membershipExpiry: '2024-04-15',
      totalBookings: 24,
      totalSpent: 5980,
      status: 'active',
      lastActivity: '2024-03-15',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
    },
    {
      id: 'M002',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      joinedAt: '2024-02-01',
      membershipType: 'premium',
      membershipExpiry: '2024-05-01',
      totalBookings: 18,
      totalSpent: 8400,
      status: 'active',
      lastActivity: '2024-03-14',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
    },
    {
      id: 'M003',
      name: 'Rohit Kumar',
      email: 'rohit@example.com',
      phone: '+91 98765 43212',
      joinedAt: '2024-02-15',
      membershipType: null,
      totalBookings: 5,
      totalSpent: 995,
      status: 'active',
      lastActivity: '2024-03-10',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
    },
    {
      id: 'M004',
      name: 'Sneha Reddy',
      email: 'sneha@example.com',
      phone: '+91 98765 43213',
      joinedAt: '2024-01-20',
      membershipType: 'monthly',
      membershipExpiry: '2024-03-20',
      totalBookings: 12,
      totalSpent: 2988,
      status: 'inactive',
      lastActivity: '2024-02-28'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const membershipOptions = [
    { value: 'all', label: 'All Memberships' },
    { value: 'day', label: 'Day Pass Users' },
    { value: 'monthly', label: 'Monthly Members' },
    { value: 'premium', label: 'Premium Members' },
    { value: 'none', label: 'No Membership' }
  ];

  const filteredMembers = members.filter(member => {
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    const matchesMembership = selectedMembership === 'all' || 
                             (selectedMembership === 'none' && !member.membershipType) ||
                             member.membershipType === selectedMembership;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    return matchesStatus && matchesMembership && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--support-moss)';
      case 'inactive': return 'var(--support-amber)';
      case 'suspended': return 'var(--support-coral)';
      default: return 'var(--text-secondary)';
    }
  };

  const getMembershipBadge = (type: string | null) => {
    if (!type) return { label: 'No Membership', color: 'var(--text-secondary)' };
    
    switch (type) {
      case 'day': return { label: 'Day Pass', color: 'var(--accent-1)' };
      case 'monthly': return { label: 'Monthly', color: 'var(--support-moss)' };
      case 'premium': return { label: 'Premium', color: 'var(--support-amber)' };
      default: return { label: 'Unknown', color: 'var(--text-secondary)' };
    }
  };

  const handleMemberAction = (memberId: string, action: string) => {
    // TODO: Implement member actions
    console.log(`${action} member:`, memberId);
  };

  const totalMembers = filteredMembers.length;
  const activeMembers = filteredMembers.filter(m => m.status === 'active').length;
  const totalRevenue = filteredMembers.reduce((sum, m) => sum + m.totalSpent, 0);

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
            <h1 className="font-display fw-bold mb-2" data-testid="admin-members-title">
              Member Management
            </h1>
            <p className="text-secondary-custom">
              View and manage all StudyCove members
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-custom">
              <i className="fas fa-download me-2"></i>
              Export Members
            </button>
            <button className="btn btn-primary-custom">
              <i className="fas fa-plus me-2"></i>
              Add Member
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-users mb-3" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
              <h4 className="fw-bold mb-1">{totalMembers}</h4>
              <p className="text-secondary-custom small mb-0">Total Members</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-user-check mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h4 className="fw-bold mb-1">{activeMembers}</h4>
              <p className="text-secondary-custom small mb-0">Active Members</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-rupee-sign mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h4 className="fw-bold mb-1">₹{(totalRevenue / 1000).toFixed(0)}K</h4>
              <p className="text-secondary-custom small mb-0">Total Revenue</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-crown mb-3" style={{ fontSize: '2rem', color: 'var(--accent-2)' }}></i>
              <h4 className="fw-bold mb-1">
                {filteredMembers.filter(m => m.membershipType).length}
              </h4>
              <p className="text-secondary-custom small mb-0">Paid Members</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="card-custom p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small">Search Members</label>
              <input
                type="text"
                className="form-control bg-muted border-custom text-light"
                placeholder="Search by name, email, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-members"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small">Status</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                data-testid="filter-status"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Membership</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedMembership}
                onChange={(e) => setSelectedMembership(e.target.value)}
                data-testid="filter-membership"
              >
                {membershipOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Sort By</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="sort-members"
              >
                <option value="name">Name (A-Z)</option>
                <option value="joined">Join Date</option>
                <option value="spent">Total Spent</option>
                <option value="activity">Last Activity</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Members Grid */}
        <motion.div 
          className="row g-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredMembers.map((member, index) => (
            <div key={member.id} className="col-lg-6 col-xl-4">
              <motion.div 
                className="card-custom p-4 h-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                data-testid={`member-card-${member.id}`}
              >
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6CA0FF&color=fff`}
                    alt={member.name}
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="fw-semibold mb-1">{member.name}</h6>
                    <p className="text-secondary-custom small mb-1">{member.email}</p>
                    <div className="d-flex gap-2">
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: getStatusColor(member.status),
                          color: 'white',
                          borderRadius: '8px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                      <span 
                        className="badge px-2 py-1"
                        style={{ 
                          background: getMembershipBadge(member.membershipType).color,
                          color: 'white',
                          borderRadius: '8px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {getMembershipBadge(member.membershipType).label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <div className="text-center">
                      <h6 className="fw-bold mb-0">{member.totalBookings}</h6>
                      <small className="text-secondary-custom">Bookings</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center">
                      <h6 className="fw-bold mb-0">₹{member.totalSpent.toLocaleString()}</h6>
                      <small className="text-secondary-custom">Spent</small>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between text-secondary-custom small">
                    <span>Joined:</span>
                    <span>{new Date(member.joinedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="d-flex justify-content-between text-secondary-custom small">
                    <span>Last Activity:</span>
                    <span>{new Date(member.lastActivity).toLocaleDateString()}</span>
                  </div>
                  {member.membershipExpiry && (
                    <div className="d-flex justify-content-between text-secondary-custom small">
                      <span>Membership Expires:</span>
                      <span>{new Date(member.membershipExpiry).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-primary-custom btn-sm flex-fill"
                    onClick={() => handleMemberAction(member.id, 'view')}
                    data-testid={`btn-view-${member.id}`}
                  >
                    View Profile
                  </button>
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-custom btn-sm dropdown-toggle" 
                      type="button" 
                      data-bs-toggle="dropdown"
                      data-testid={`member-actions-${member.id}`}
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end bg-panel border-custom">
                      <li>
                        <button 
                          className="dropdown-item text-light"
                          onClick={() => handleMemberAction(member.id, 'edit')}
                        >
                          Edit Member
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item text-light"
                          onClick={() => handleMemberAction(member.id, 'message')}
                        >
                          Send Message
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item text-light"
                          onClick={() => handleMemberAction(member.id, 'bookings')}
                        >
                          View Bookings
                        </button>
                      </li>
                      <li><hr className="dropdown-divider border-custom" /></li>
                      <li>
                        <button 
                          className="dropdown-item text-warning"
                          onClick={() => handleMemberAction(member.id, 'suspend')}
                        >
                          {member.status === 'suspended' ? 'Unsuspend' : 'Suspend'} Member
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-users text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h4 className="text-secondary-custom mb-3">No members found</h4>
            <p className="text-secondary-custom">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminMembers;
