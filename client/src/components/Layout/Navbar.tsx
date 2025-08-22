import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { BRAND, NAVIGATION } from '../../utils/constants';

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
      className={`navbar navbar-expand-lg navbar-dark-custom fixed-top ${isScrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: isScrolled ? 'rgba(21, 25, 34, 0.98)' : 'rgba(21, 25, 34, 0.95)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <Link className="navbar-brand font-display fw-bold fs-3" to="/" data-testid="navbar-brand">
          <i className="fas fa-book-open me-2" style={{ color: 'var(--accent-1)' }}></i>
          {BRAND.name}
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
                  className="btn btn-outline-custom dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown"
                  data-testid="user-dropdown"
                >
                  <i className="fas fa-user me-2"></i>
                  {user.name.split(' ')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-panel border-custom">
                  <li><Link className="dropdown-item text-light" to="/dashboard" data-testid="dropdown-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item text-light" to="/my-bookings" data-testid="dropdown-bookings">My Bookings</Link></li>
                  <li><Link className="dropdown-item text-light" to="/membership" data-testid="dropdown-membership">Membership</Link></li>
                  {user.isAdmin && (
                    <>
                      <li><hr className="dropdown-divider border-custom" /></li>
                      <li><Link className="dropdown-item text-light" to="/admin" data-testid="dropdown-admin">Admin Panel</Link></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider border-custom" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-light" 
                      onClick={handleLogout}
                      data-testid="dropdown-logout"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link 
                  className="btn btn-outline-custom" 
                  to="/login"
                  data-testid="btn-login"
                >
                  Login
                </Link>
                <Link 
                  className="btn btn-primary-custom" 
                  to="/signup"
                  data-testid="btn-signup"
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
