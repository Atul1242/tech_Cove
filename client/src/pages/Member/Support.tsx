import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdated: string;
  category: string;
}

const Support: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('create');
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium'
  });

  // TODO: Replace with actual data from API
  const tickets: SupportTicket[] = [
    {
      id: 'TICK-2024-001',
      subject: 'Unable to check-in with QR code',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-03-15',
      lastUpdated: '2024-03-16',
      category: 'Technical Issue'
    },
    {
      id: 'TICK-2024-002',
      subject: 'Billing question about monthly plan',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-03-10',
      lastUpdated: '2024-03-12',
      category: 'Billing'
    },
    {
      id: 'TICK-2024-003',
      subject: 'Request for refund',
      status: 'closed',
      priority: 'low',
      createdAt: '2024-03-05',
      lastUpdated: '2024-03-08',
      category: 'Refund'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ticket submission
    console.log('Submitting support ticket:', formData);
    // Reset form
    setFormData({
      category: '',
      subject: '',
      description: '',
      priority: 'medium'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'var(--accent-1)';
      case 'in-progress': return 'var(--support-amber)';
      case 'resolved': return 'var(--support-moss)';
      case 'closed': return 'var(--text-secondary)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'var(--support-coral)';
      case 'high': return 'var(--accent-2)';
      case 'medium': return 'var(--support-amber)';
      case 'low': return 'var(--support-moss)';
      default: return 'var(--text-secondary)';
    }
  };

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
          <h1 className="font-display fw-bold mb-3" data-testid="support-title">
            Support Center
          </h1>
          <p className="fs-5 text-secondary-custom">
            Get help with your StudyCove experience
          </p>
        </motion.div>

        {/* Quick Help Section */}
        <motion.div 
          className="row g-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-md-3">
            <div className="card-custom p-4 text-center h-100">
              <i className="fas fa-book mb-3" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
              <h6 className="fw-semibold mb-2">Knowledge Base</h6>
              <p className="text-secondary-custom small mb-3">
                Find answers to common questions
              </p>
              <button className="btn btn-outline-custom btn-sm">
                Browse Articles
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-custom p-4 text-center h-100">
              <i className="fas fa-comments mb-3" style={{ fontSize: '2rem', color: 'var(--accent-2)' }}></i>
              <h6 className="fw-semibold mb-2">Live Chat</h6>
              <p className="text-secondary-custom small mb-3">
                Chat with our support team
              </p>
              <button className="btn btn-outline-custom btn-sm" data-testid="btn-live-chat">
                Start Chat
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-custom p-4 text-center h-100">
              <i className="fas fa-phone mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h6 className="fw-semibold mb-2">Phone Support</h6>
              <p className="text-secondary-custom small mb-3">
                Call us for urgent issues
              </p>
              <button className="btn btn-outline-custom btn-sm">
                +91 98765 43210
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-custom p-4 text-center h-100">
              <i className="fas fa-video mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h6 className="fw-semibold mb-2">Video Call</h6>
              <p className="text-secondary-custom small mb-3">
                Schedule a video session
              </p>
              <button className="btn btn-outline-custom btn-sm">
                Book Call
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="d-flex bg-panel rounded-4 p-2">
            <button
              className={`btn flex-fill ${selectedTab === 'create' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
              onClick={() => setSelectedTab('create')}
              data-testid="tab-create-ticket"
            >
              <i className="fas fa-plus me-2"></i>
              Create Ticket
            </button>
            <button
              className={`btn flex-fill ${selectedTab === 'tickets' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
              onClick={() => setSelectedTab('tickets')}
              data-testid="tab-my-tickets"
            >
              <i className="fas fa-ticket-alt me-2"></i>
              My Tickets ({tickets.length})
            </button>
          </div>
        </motion.div>

        {/* Create Ticket Tab */}
        {selectedTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card-custom p-5">
                  <h4 className="font-display fw-semibold mb-4">Create Support Ticket</h4>
                  
                  <form onSubmit={handleSubmitTicket}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Category *</label>
                        <select
                          className="form-select bg-muted border-custom text-light"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          data-testid="select-category"
                        >
                          <option value="">Select a category</option>
                          <option value="technical">Technical Issue</option>
                          <option value="billing">Billing & Payment</option>
                          <option value="booking">Booking Support</option>
                          <option value="account">Account Management</option>
                          <option value="refund">Refund Request</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Priority</label>
                        <select
                          className="form-select bg-muted border-custom text-light"
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          data-testid="select-priority"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Subject *</label>
                      <input
                        type="text"
                        className="form-control bg-muted border-custom text-light"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your issue"
                        required
                        data-testid="input-subject"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control bg-muted border-custom text-light"
                        rows={6}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please provide detailed information about your issue..."
                        required
                        data-testid="textarea-description"
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary-custom" data-testid="btn-submit-ticket">
                      <i className="fas fa-paper-plane me-2"></i>
                      Submit Ticket
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* My Tickets Tab */}
        {selectedTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-custom">
              {tickets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Subject</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket, index) => (
                        <tr key={ticket.id} data-testid={`ticket-row-${index}`}>
                          <td className="fw-semibold">{ticket.id}</td>
                          <td>{ticket.subject}</td>
                          <td>{ticket.category}</td>
                          <td>
                            <span 
                              className="badge px-2 py-1"
                              style={{ 
                                background: getPriorityColor(ticket.priority),
                                color: 'white',
                                borderRadius: '8px'
                              }}
                            >
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </span>
                          </td>
                          <td>
                            <span 
                              className="badge px-2 py-1"
                              style={{ 
                                background: getStatusColor(ticket.status),
                                color: 'white',
                                borderRadius: '8px'
                              }}
                            >
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button 
                              className="btn btn-outline-custom btn-sm"
                              data-testid={`btn-view-ticket-${ticket.id}`}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-ticket-alt text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-secondary-custom mb-3">No Support Tickets</h5>
                  <p className="text-secondary-custom">You haven't created any support tickets yet.</p>
                  <button 
                    className="btn btn-primary-custom"
                    onClick={() => setSelectedTab('create')}
                  >
                    Create Your First Ticket
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* FAQ Section */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="font-display fw-bold text-center mb-4">Frequently Asked Questions</h4>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">How do I cancel my booking?</h6>
                  <p className="text-secondary-custom small">
                    You can cancel your booking up to 2 hours before your scheduled time through the "My Bookings" section.
                  </p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">What if I can't check-in with my QR code?</h6>
                  <p className="text-secondary-custom small">
                    If your QR code isn't working, contact the front desk or create a support ticket. They can manually check you in.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">How do I get a refund?</h6>
                  <p className="text-secondary-custom small">
                    Refunds are processed according to our refund policy. Create a support ticket for refund requests.
                  </p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">Can I change my membership plan?</h6>
                  <p className="text-secondary-custom small">
                    Yes, you can upgrade or downgrade your plan anytime from the "Membership" section in your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Support;
