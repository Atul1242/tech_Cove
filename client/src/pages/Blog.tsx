import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import blogData from '../data/blog.json';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const posts = blogData as BlogPost[];

  const categories = [
    'all',
    ...Array.from(new Set(posts.map(post => post.category)))
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
              data-testid="blog-title"
            >
              Study Blog
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tips, insights, and stories to help you study better and achieve more
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        {/* Category Filter */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="d-inline-flex bg-panel rounded-4 p-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                className={`btn btn-sm px-4 py-2 me-2 mb-2 ${selectedCategory === category ? 'active' : ''}`}
                style={selectedCategory === category ? {
                  background: 'var(--accent-1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px'
                } : {
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)'
                }}
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category}`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div 
            className="mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-custom overflow-hidden">
              <div className="row g-0">
                <div className="col-lg-6">
                  <img 
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', minHeight: '300px' }}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-5 h-100 d-flex flex-column">
                    <div>
                      <span 
                        className="badge px-3 py-2 mb-3"
                        style={{ 
                          background: 'var(--accent-1)', 
                          color: 'white',
                          borderRadius: '12px'
                        }}
                      >
                        Featured Post
                      </span>
                      <h2 className="font-display fw-bold mb-3" data-testid="featured-post-title">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-secondary-custom mb-4">
                        {filteredPosts[0].excerpt}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="d-flex align-items-center mb-3">
                        <img 
                          src={filteredPosts[0].authorAvatar}
                          alt={filteredPosts[0].author}
                          className="rounded-circle me-3"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-0">{filteredPosts[0].author}</h6>
                          <small className="text-secondary-custom">
                            {formatDate(filteredPosts[0].publishedAt)} • {filteredPosts[0].readTime} min read
                          </small>
                        </div>
                      </div>
                      
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {filteredPosts[0].tags.map(tag => (
                          <span key={tag} className="badge bg-secondary small">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="btn btn-primary-custom">
                        Read More <i className="fas fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="row g-4">
          {filteredPosts.slice(1).map((post, index) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <motion.article 
                className="card-custom h-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`blog-post-${post.id}`}
              >
                <img 
                  src={post.image}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-3">
                    <span 
                      className="badge px-2 py-1 mb-2"
                      style={{ 
                        background: 'var(--muted)', 
                        color: 'var(--text-secondary)',
                        borderRadius: '8px'
                      }}
                    >
                      {post.category}
                    </span>
                    <h5 className="fw-semibold mb-2" data-testid={`post-title-${post.id}`}>
                      {post.title}
                    </h5>
                    <p className="text-secondary-custom small">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="d-flex align-items-center mb-3">
                      <img 
                        src={post.authorAvatar}
                        alt={post.author}
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="mb-0 small">{post.author}</h6>
                        <small className="text-secondary-custom">
                          {formatDate(post.publishedAt)}
                        </small>
                      </div>
                      <div className="ms-auto">
                        <small className="text-secondary-custom">
                          <i className="fas fa-clock me-1"></i>
                          {post.readTime} min
                        </small>
                      </div>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <button className="btn btn-outline-custom btn-sm w-100">
                      Read Article
                    </button>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-newspaper text-secondary-custom mb-3" style={{ fontSize: '3rem' }}></i>
            <h3 className="text-secondary-custom">No posts found</h3>
            <p className="text-secondary-custom">Try selecting a different category</p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display fw-bold mb-3">Stay Updated</h3>
          <p className="text-secondary-custom mb-4">
            Get the latest study tips and productivity insights delivered to your inbox
          </p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control bg-muted border-custom text-light"
                  placeholder="Enter your email"
                  data-testid="newsletter-email"
                />
                <button className="btn btn-primary-custom" data-testid="btn-subscribe">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Blog;
