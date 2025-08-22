import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND, NAVIGATION, CONTACT } from '../../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-dark py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="navbar-brand font-display fw-bold fs-3 text-decoration-none">
                <i className="fas fa-book-open me-2" style={{ color: 'var(--accent-1)' }}></i>
                <span style={{ color: 'var(--text)' }}>{BRAND.name}</span>
              </Link>
              <p className="text-secondary-custom mt-3">
                {BRAND.description}
              </p>
            </motion.div>

            <motion.div 
              className="d-flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a 
                href={CONTACT.social.facebook} 
                className="social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href={CONTACT.social.twitter} 
                className="social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href={CONTACT.social.instagram} 
                className="social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href={CONTACT.social.linkedin} 
                className="social-icon" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="social-linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </motion.div>
          </div>

          {NAVIGATION.footer.map((section, index) => (
            <div key={section.title} className="col-lg-2 col-md-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <h6 className="fw-semibold mb-3">{section.title}</h6>
                <ul className="list-unstyled">
                  {section.links.map((link) => (
                    <li key={link.path} className="mb-2">
                      <Link 
                        to={link.path} 
                        className="text-secondary-custom text-decoration-none"
                        data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        <hr className="my-4 border-custom" />

        <motion.div 
          className="row align-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="col-md-6">
            <p className="text-secondary-custom small mb-0" data-testid="copyright">
              © {currentYear} {BRAND.name}. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end align-items-center gap-3">
              <span className="text-secondary-custom small">Made with ❤️ in India</span>
              <div className="d-flex gap-2">
                <span className="badge bg-secondary small">Hindi</span>
                <span className="badge bg-secondary small">English</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
