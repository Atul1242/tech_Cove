import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  location: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Open Study Area',
      category: 'study-areas',
      location: 'Delhi Central'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Collaborative Workspace',
      category: 'study-areas',
      location: 'Mumbai Bandra'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Modern Reception',
      category: 'amenities',
      location: 'Bangalore Koramangala'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Premium Lounge',
      category: 'amenities',
      location: 'Hyderabad Hi-Tech'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Private Cabins',
      category: 'private-areas',
      location: 'Mumbai Bandra'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Meeting Room',
      category: 'private-areas',
      location: 'Bangalore Koramangala'
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Cafe Area',
      category: 'amenities',
      location: 'Delhi Central'
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      title: 'Quiet Zone',
      category: 'study-areas',
      location: 'Chennai T. Nagar'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'study-areas', label: 'Study Areas' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'private-areas', label: 'Private Areas' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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
              data-testid="gallery-title"
            >
              Gallery
            </motion.h1>
            <motion.p 
              className="fs-5 text-secondary-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Take a virtual tour of our premium study spaces
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
          <div className="d-inline-flex bg-panel rounded-4 p-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`btn btn-sm px-4 py-2 me-2 ${selectedCategory === category.id ? 'active' : ''}`}
                style={selectedCategory === category.id ? {
                  background: 'var(--accent-1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px'
                } : {
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)'
                }}
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`filter-${category.id}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="row g-4">
          {filteredImages.map((image, index) => (
            <div key={image.id} className="col-lg-4 col-md-6">
              <motion.div
                className="position-relative overflow-hidden rounded-4 shadow"
                style={{ height: '300px', cursor: 'pointer' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image)}
                data-testid={`gallery-image-${image.id}`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <div 
                  className="position-absolute bottom-0 start-0 w-100 p-3"
                  style={{ 
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: 'white'
                  }}
                >
                  <h6 className="fw-semibold mb-1">{image.title}</h6>
                  <small>{image.location}</small>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="row">
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold" style={{ color: 'var(--accent-1)' }}>6+</h3>
              <p className="text-secondary-custom">Premium Locations</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold" style={{ color: 'var(--accent-1)' }}>1,000+</h3>
              <p className="text-secondary-custom">Study Seats</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold" style={{ color: 'var(--accent-1)' }}>50+</h3>
              <p className="text-secondary-custom">Meeting Rooms</p>
            </div>
            <div className="col-md-3 mb-4">
              <h3 className="font-display fw-bold" style={{ color: 'var(--accent-1)' }}>24/7</h3>
              <p className="text-secondary-custom">Security</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            background: 'rgba(0,0,0,0.9)', 
            zIndex: 1050,
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            className="position-relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="img-fluid rounded-4"
              style={{ maxWidth: '90vw', maxHeight: '80vh' }}
            />
            <button
              className="btn btn-outline-light position-absolute top-0 end-0 m-3"
              onClick={() => setSelectedImage(null)}
              style={{ borderRadius: '50%', width: '40px', height: '40px' }}
              data-testid="btn-close-modal"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
              <h5 className="fw-semibold mb-1">{selectedImage.title}</h5>
              <p className="mb-0">{selectedImage.location}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
