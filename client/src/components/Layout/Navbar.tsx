import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { BRAND, NAVIGATION } from '../../utils/constants';
import logo from "../../lib/studycove_navbar.png"

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav 
      className={`navbar navbar-expand-lg navbar-light fixed-top ${isScrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: isScrolled ? '#FFFFFF' : '#F8FAFC',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <Link className="navbar-brand font-display fw-bold fs-3" to="/" data-testid="navbar-brand">
          <img 
            src={logo} 
            style={{ 
              height: isScrolled ? "50px" : "60px", 
              width: "auto",
              transition: "height 0.3s ease-out"
            }} 
            alt="StudyCove"
          />
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          data-testid="navbar-toggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {NAVIGATION.public.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  to={item.path}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
                  style={{
                    color: location.pathname === item.path ? 'var(--accent-1)' : '#4A4A4A',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = '#4A4A4A';
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown"
                  data-testid="user-dropdown"
                  style={{
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                    color: 'var(--accent-1)',
                    padding: '8px 16px',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--accent-1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                  }}
                >
                  <i className="fas fa-user-circle me-2"></i>
                  {user.name.split(' ')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" style={{
                  backgroundColor: '#1a1d29',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  minWidth: '200px'
                }}>
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/dashboard" 
                      data-testid="dropdown-dashboard"
                      style={{
                        color: 'white',
                        padding: '10px 20px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 199, 155, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-home me-2" style={{ color: 'var(--accent-1)' }}></i>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/my-bookings" 
                      data-testid="dropdown-bookings"
                      style={{
                        color: 'white',
                        padding: '10px 20px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 199, 155, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-calendar-check me-2" style={{ color: 'var(--accent-1)' }}></i>
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/membership" 
                      data-testid="dropdown-membership"
                      style={{
                        color: 'white',
                        padding: '10px 20px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 199, 155, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-crown me-2" style={{ color: 'var(--accent-2)' }}></i>
                      Membership
                    </Link>
                  </li>
                  {user.isAdmin && (
                    <>
                      <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} /></li>
                      <li>
                        <Link 
                          className="dropdown-item" 
                          to="/admin" 
                          data-testid="dropdown-admin"
                          style={{
                            color: 'white',
                            padding: '10px 20px',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 214, 63, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <i className="fas fa-user-shield me-2" style={{ color: 'var(--accent-2)' }}></i>
                          Admin Panel
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                      data-testid="dropdown-logout"
                      style={{
                        color: 'white',
                        padding: '10px 20px',
                        transition: 'background-color 0.2s',
                        width: '100%',
                        textAlign: 'left',
                        border: 'none',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <i className="fas fa-sign-out-alt me-2" style={{ color: '#ef4444' }}></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link 
                  className="btn" 
                  to="/login"
                  data-testid="btn-login"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #E5D5CC',
                    color: '#4A4A4A',
                    padding: '8px 20px',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F7F1ED';
                    e.currentTarget.style.borderColor = '#FF6B35';
                    e.currentTarget.style.color = '#FF6B35';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#E5D5CC';
                    e.currentTarget.style.color = '#4A4A4A';
                  }}
                >
                  Login
                </Link>
                <Link 
                  className="btn" 
                  to="/signup"
                  data-testid="btn-signup"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
                    border: 'none',
                    color: 'white',
                    padding: '8px 20px',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
