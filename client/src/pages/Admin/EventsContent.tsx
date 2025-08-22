import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EventContent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  locationId: string;
  instructor: string;
  capacity: number;
  registered: number;
  price: number;
  category: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogContent {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  image: string;
  readTime: number;
}

const EventsContent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('events');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // TODO: Replace with actual data from API
  const events: EventContent[] = [
    {
      id: 'evt-001',
      title: 'Time Management for Students',
      description: 'Learn effective time management strategies to boost your productivity and achieve better study-life balance.',
      date: '2024-03-20',
      time: '10:00',
      duration: 120,
      location: 'Delhi Central',
      locationId: 'delhi-central',
      instructor: 'Dr. Rajesh Kumar',
      capacity: 50,
      registered: 23,
      price: 299,
      category: 'Workshop',
      status: 'published',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      createdAt: '2024-03-01',
      updatedAt: '2024-03-02'
    },
    {
      id: 'evt-002',
      title: 'Advanced Study Techniques',
      description: 'Discover proven study methods used by top performers to maximize retention and understanding.',
      date: '2024-03-25',
      time: '14:00',
      duration: 180,
      location: 'Mumbai Bandra',
      locationId: 'mumbai-bandra',
      instructor: 'Prof. Meera Sharma',
      capacity: 40,
      registered: 35,
      price: 399,
      category: 'Seminar',
      status: 'published',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      createdAt: '2024-03-05',
      updatedAt: '2024-03-06'
    },
    {
      id: 'evt-003',
      title: 'Career Guidance Session',
      description: 'Navigate your tech career path with insights from industry experts.',
      date: '2024-04-02',
      time: '18:00',
      duration: 90,
      location: 'Bangalore Koramangala',
      locationId: 'bangalore-koramangala',
      instructor: 'Ravi Agarwal',
      capacity: 60,
      registered: 18,
      price: 199,
      category: 'Career',
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-11'
    }
  ];

  const blogPosts: BlogContent[] = [
    {
      id: 'blog-001',
      title: 'The Psychology of Study Spaces',
      excerpt: 'Discover how your study environment impacts cognitive performance and learn to optimize your space for maximum productivity.',
      content: 'Research shows that environmental factors significantly influence learning outcomes...',
      author: 'Dr. Sarah Johnson',
      category: 'Psychology',
      tags: ['study-tips', 'psychology', 'productivity'],
      status: 'published',
      publishedAt: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      readTime: 5
    },
    {
      id: 'blog-002',
      title: '10 Productivity Techniques Every Student Should Know',
      excerpt: 'Master these proven productivity methods to study smarter, not harder, and achieve better results in less time.',
      content: 'Effective studying isn\'t about the hours you put in, but how efficiently you use that time...',
      author: 'Prof. Raj Patel',
      category: 'Productivity',
      tags: ['productivity', 'study-methods', 'time-management'],
      status: 'published',
      publishedAt: '2024-02-20',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      readTime: 7
    },
    {
      id: 'blog-003',
      title: 'Ultimate Guide to Exam Preparation',
      excerpt: 'A comprehensive guide covering everything from creating study schedules to managing exam day anxiety.',
      content: 'Successful exam preparation requires a strategic approach that begins weeks before the actual exam...',
      author: 'Dr. Priya Sharma',
      category: 'Exam Prep',
      tags: ['exams', 'preparation', 'study-schedule'],
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
      readTime: 10
    }
  ];

  const filteredContent = selectedTab === 'events' 
    ? events.filter(item => {
        const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      })
    : blogPosts.filter(item => {
        const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'var(--support-moss)';
      case 'draft': return 'var(--support-amber)';
      case 'completed': return 'var(--text-secondary)';
      case 'cancelled': return 'var(--support-coral)';
      case 'archived': return 'var(--text-secondary)';
      default: return 'var(--text-secondary)';
    }
  };

  const handleContentAction = (id: string, action: string) => {
    // TODO: Implement content actions
    console.log(`${action} content:`, id);
  };

  const handleCreateContent = () => {
    setShowCreateModal(true);
  };

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
            <h1 className="font-display fw-bold mb-2" data-testid="events-content-title">
              Events & Content Management
            </h1>
            <p className="text-secondary-custom">
              Create and manage events, workshops, and blog content
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-custom">
              <i className="fas fa-calendar me-2"></i>
              Schedule Event
            </button>
            <button 
              className="btn btn-primary-custom"
              onClick={handleCreateContent}
              data-testid="btn-create-content"
            >
              <i className="fas fa-plus me-2"></i>
              Create {selectedTab === 'events' ? 'Event' : 'Post'}
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
              <i className="fas fa-calendar-alt mb-3" style={{ fontSize: '2rem', color: 'var(--accent-1)' }}></i>
              <h4 className="fw-bold mb-1">{events.length}</h4>
              <p className="text-secondary-custom small mb-0">Total Events</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-users mb-3" style={{ fontSize: '2rem', color: 'var(--support-moss)' }}></i>
              <h4 className="fw-bold mb-1">
                {events.reduce((sum, event) => sum + event.registered, 0)}
              </h4>
              <p className="text-secondary-custom small mb-0">Total Registrations</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-blog mb-3" style={{ fontSize: '2rem', color: 'var(--support-amber)' }}></i>
              <h4 className="fw-bold mb-1">{blogPosts.length}</h4>
              <p className="text-secondary-custom small mb-0">Blog Posts</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card-custom p-4 text-center">
              <i className="fas fa-eye mb-3" style={{ fontSize: '2rem', color: 'var(--accent-2)' }}></i>
              <h4 className="fw-bold mb-1">15.2K</h4>
              <p className="text-secondary-custom small mb-0">Total Views</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs and Filters */}
        <motion.div 
          className="card-custom p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <div className="d-flex bg-muted rounded-3 p-1">
                <button
                  className={`btn flex-fill ${selectedTab === 'events' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                  onClick={() => setSelectedTab('events')}
                  data-testid="tab-events"
                >
                  <i className="fas fa-calendar-alt me-2"></i>Events
                </button>
                <button
                  className={`btn flex-fill ${selectedTab === 'blog' ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                  onClick={() => setSelectedTab('blog')}
                  data-testid="tab-blog"
                >
                  <i className="fas fa-blog me-2"></i>Blog Posts
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label small">Search</label>
              <input
                type="text"
                className="form-control bg-muted border-custom text-light"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-content"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small">Status</label>
              <select
                className="form-select bg-muted border-custom text-light"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                data-testid="filter-status"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                {selectedTab === 'events' && <option value="completed">Completed</option>}
                {selectedTab === 'events' && <option value="cancelled">Cancelled</option>}
                {selectedTab === 'blog' && <option value="archived">Archived</option>}
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-custom w-100">
                <i className="fas fa-filter me-2"></i>
                More Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="row g-4">
          {filteredContent.map((item: any, index) => (
            <div key={item.id} className="col-lg-6">
              <motion.div 
                className="card-custom h-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`content-card-${item.id}`}
              >
                <div className="row g-0 h-100">
                  <div className="col-4">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover', minHeight: '200px' }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body p-4 h-100 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span 
                          className="badge px-2 py-1"
                          style={{ 
                            background: getStatusColor(item.status),
                            color: 'white',
                            borderRadius: '8px'
                          }}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                        <span className="badge bg-secondary small">
                          {selectedTab === 'events' ? item.category : item.category}
                        </span>
                      </div>

                      <h6 className="fw-semibold mb-2" data-testid={`content-title-${item.id}`}>
                        {item.title}
                      </h6>
                      
                      <p className="text-secondary-custom small mb-3 flex-grow-1">
                        {selectedTab === 'events' ? item.description : item.excerpt}
                      </p>

                      {selectedTab === 'events' ? (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between text-secondary-custom small mb-1">
                            <span>Date:</span>
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <div className="d-flex justify-content-between text-secondary-custom small mb-1">
                            <span>Instructor:</span>
                            <span>{item.instructor}</span>
                          </div>
                          <div className="d-flex justify-content-between text-secondary-custom small">
                            <span>Registered:</span>
                            <span>{item.registered}/{item.capacity}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between text-secondary-custom small mb-1">
                            <span>Author:</span>
                            <span>{item.author}</span>
                          </div>
                          <div className="d-flex justify-content-between text-secondary-custom small mb-1">
                            <span>Read Time:</span>
                            <span>{item.readTime} min</span>
                          </div>
                          {item.publishedAt && (
                            <div className="d-flex justify-content-between text-secondary-custom small">
                              <span>Published:</span>
                              <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-primary-custom btn-sm flex-fill"
                          onClick={() => handleContentAction(item.id, 'edit')}
                          data-testid={`btn-edit-${item.id}`}
                        >
                          Edit
                        </button>
                        <div className="dropdown">
                          <button 
                            className="btn btn-outline-custom btn-sm dropdown-toggle" 
                            type="button" 
                            data-bs-toggle="dropdown"
                            data-testid={`content-actions-${item.id}`}
                          >
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end bg-panel border-custom">
                            <li>
                              <button 
                                className="dropdown-item text-light"
                                onClick={() => handleContentAction(item.id, 'view')}
                              >
                                View Details
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item text-light"
                                onClick={() => handleContentAction(item.id, 'duplicate')}
                              >
                                Duplicate
                              </button>
                            </li>
                            {item.status === 'draft' && (
                              <li>
                                <button 
                                  className="dropdown-item text-light"
                                  onClick={() => handleContentAction(item.id, 'publish')}
                                >
                                  Publish
                                </button>
                              </li>
                            )}
                            {item.status === 'published' && (
                              <li>
                                <button 
                                  className="dropdown-item text-light"
                                  onClick={() => handleContentAction(item.id, 'unpublish')}
                                >
                                  Unpublish
                                </button>
                              </li>
                            )}
                            <li><hr className="dropdown-divider border-custom" /></li>
                            <li>
                              <button 
                                className="dropdown-item text-danger"
                                onClick={() => handleContentAction(item.id, 'delete')}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredContent.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className={`fas fa-${selectedTab === 'events' ? 'calendar-times' : 'blog'} text-secondary-custom mb-3`} style={{ fontSize: '3rem' }}></i>
            <h4 className="text-secondary-custom mb-3">No {selectedTab} found</h4>
            <p className="text-secondary-custom">Try adjusting your search criteria or create new content</p>
            <button 
              className="btn btn-primary-custom"
              onClick={handleCreateContent}
            >
              <i className="fas fa-plus me-2"></i>
              Create {selectedTab === 'events' ? 'Event' : 'Post'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventsContent;
