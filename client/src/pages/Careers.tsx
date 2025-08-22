import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const Careers: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobPositions: JobPosition[] = [
    {
      id: 'community-manager-delhi',
      title: 'Community Manager',
      department: 'Operations',
      location: 'Delhi Central',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Lead our Delhi location, ensuring excellent member experience and smooth daily operations.',
      requirements: [
        'Bachelor\'s degree in Business or related field',
        'Experience in hospitality or customer service',
        'Strong communication and leadership skills',
        'Fluency in Hindi and English'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Free study space access',
        'Performance bonuses'
      ]
    },
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Build and enhance our web and mobile applications using React, TypeScript, and modern frameworks.',
      requirements: [
        'Strong experience with React and TypeScript',
        'Knowledge of modern CSS frameworks',
        'Experience with mobile-first development',
        'Understanding of UX/UI principles'
      ],
      benefits: [
        'Competitive salary',
        'Remote work options',
        'Learning allowance',
        'Stock options'
      ]
    },
    {
      id: 'marketing-specialist',
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Drive our digital marketing initiatives including social media, content creation, and performance marketing.',
      requirements: [
        'Experience with digital marketing campaigns',
        'Knowledge of Google Ads and Facebook Ads',
        'Strong writing and creative skills',
        'Analytics and data-driven mindset'
      ],
      benefits: [
        'Creative freedom',
        'Marketing budget to experiment',
        'Health insurance',
        'Free study space access'
      ]
    },
    {
      id: 'business-development',
      title: 'Business Development Manager',
      department: 'Sales',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Identify and develop new business opportunities, partnerships, and expansion strategies.',
      requirements: [
        'Proven track record in B2B sales',
        'Experience in real estate or hospitality',
        'Strong negotiation skills',
        'MBA preferred'
      ],
      benefits: [
        'High earning potential',
        'Commission structure',
        'Travel opportunities',
        'Stock options'
      ]
    }
  ];

  const departments = [
    'all',
    ...Array.from(new Set(jobPositions.map(job => job.department)))
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobPositions 
    : jobPositions.filter(job => job.department === selectedDepartment);

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
              data-testid="careers-title"
            >
              Join Our Team
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Help us build the future of productive study spaces
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        {/* Why Work With Us */}
        <motion.section 
          className="mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-5">
            <h2 className="font-display fw-bold mb-3">Why StudyCove?</h2>
            <p className="fs-5 text-secondary-custom">
              Be part of a mission that transforms how students achieve their dreams
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: 'fas fa-rocket',
                title: 'Fast Growth',
                description: 'Join a rapidly expanding startup with unlimited potential'
              },
              {
                icon: 'fas fa-heart',
                title: 'Impact Focus',
                description: 'Directly contribute to student success and academic achievement'
              },
              {
                icon: 'fas fa-users',
                title: 'Great Team',
                description: 'Work with passionate, talented people who care about excellence'
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Career Growth',
                description: 'Clear advancement paths and continuous learning opportunities'
              }
            ].map((value, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div 
                    className="feature-icon mx-auto mb-3"
                    style={{ width: '60px', height: '60px' }}
                  >
                    <i className={value.icon}></i>
                  </div>
                  <h5 className="fw-semibold mb-2">{value.title}</h5>
                  <p className="text-secondary-custom small">{value.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Job Openings */}
        <motion.div 
          className="d-flex justify-content-between align-items-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-display fw-bold">Open Positions</h2>
          <select
            className="form-select bg-panel border-custom text-light"
            style={{ width: 'auto' }}
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            data-testid="department-filter"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Job Listings */}
        <div className="row g-4">
          {filteredJobs.map((job, index) => (
            <div key={job.id} className="col-lg-6">
              <motion.div 
                className="card-custom p-4 h-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`job-card-${job.id}`}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h4 className="fw-semibold mb-1" data-testid={`job-title-${job.id}`}>
                      {job.title}
                    </h4>
                    <p className="text-secondary-custom small mb-0">{job.department}</p>
                  </div>
                  <span 
                    className="badge px-3 py-1"
                    style={{ 
                      background: 'var(--accent-1)', 
                      color: 'white',
                      borderRadius: '12px'
                    }}
                  >
                    {job.type}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-map-marker-alt me-2" style={{ color: 'var(--accent-1)' }}></i>
                    <span className="small">{job.location}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-briefcase me-2" style={{ color: 'var(--accent-1)' }}></i>
                    <span className="small">{job.experience} experience</span>
                  </div>
                </div>

                <p className="text-secondary-custom mb-4">{job.description}</p>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">Key Requirements</h6>
                  <ul className="list-unstyled">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx} className="small text-secondary-custom mb-1">
                        <i className="fas fa-check me-2" style={{ color: 'var(--support-moss)' }}></i>
                        {req}
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="small text-secondary-custom">
                        <i className="fas fa-plus me-2" style={{ color: 'var(--accent-1)' }}></i>
                        {job.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">Benefits</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {job.benefits.map((benefit, idx) => (
                      <span key={idx} className="badge bg-secondary small">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn btn-primary-custom w-100"
                  data-testid={`btn-apply-${job.id}`}
                >
                  Apply Now
                </button>
              </motion.div>
            </div>
          ))}
        </div>

        {/* No Jobs Message */}
        {filteredJobs.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-briefcase text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h3 className="text-secondary-custom">No openings in this department</h3>
            <p className="text-secondary-custom">Check back soon or view all departments</p>
          </motion.div>
        )}

        {/* Culture Section */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <h3 className="font-display fw-bold mb-3">Our Culture</h3>
              <p className="text-secondary-custom">
                What makes StudyCove a great place to work
              </p>
            </div>
            
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Team collaboration"
                  className="img-fluid rounded-3 mb-3"
                />
                <h5 className="fw-semibold mb-2">Collaborative</h5>
                <p className="text-secondary-custom small">
                  We believe the best ideas come from working together
                </p>
              </div>
              
              <div className="col-md-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Innovation focus"
                  className="img-fluid rounded-3 mb-3"
                />
                <h5 className="fw-semibold mb-2">Innovative</h5>
                <p className="text-secondary-custom small">
                  Always looking for better ways to serve our community
                </p>
              </div>
              
              <div className="col-md-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Work-life balance"
                  className="img-fluid rounded-3 mb-3"
                />
                <h5 className="fw-semibold mb-2">Balanced</h5>
                <p className="text-secondary-custom small">
                  Healthy work-life balance with flexible arrangements
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Application Process */}
        <motion.section 
          className="py-5 mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-5">
            <h3 className="font-display fw-bold mb-3">Application Process</h3>
            <p className="text-secondary-custom">
              How we'll get to know each other
            </p>
          </div>
          
          <div className="row g-4">
            {[
              { step: 1, title: 'Apply', desc: 'Submit your application with resume and cover letter' },
              { step: 2, title: 'Screen', desc: 'Initial phone/video screening with our team' },
              { step: 3, title: 'Interview', desc: 'In-depth interview with hiring manager and team' },
              { step: 4, title: 'Decision', desc: 'Reference check and final decision within 1 week' }
            ].map((step, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="text-center">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--accent-1)',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {step.step}
                  </div>
                  <h6 className="fw-semibold mb-2">{step.title}</h6>
                  <p className="text-secondary-custom small">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          className="text-center py-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display fw-bold mb-3">Don't see the right role?</h3>
          <p className="text-secondary-custom mb-4">
            We're always looking for exceptional talent. Send us your resume anyway!
          </p>
          <button className="btn btn-outline-custom btn-lg">
            <i className="fas fa-envelope me-2"></i>
            Send General Application
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default Careers;
