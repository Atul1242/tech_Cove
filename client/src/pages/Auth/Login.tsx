import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-custom min-vh-100 d-flex align-items-center" style={{ marginTop: '76px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <motion.div 
              className="card-custom p-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-4">
                <h2 className="font-display fw-bold mb-2" data-testid="login-title">
                  Welcome Back
                </h2>
                <p className="text-secondary-custom">
                  Sign in to access your study space
                </p>
              </div>

              {error && (
                <motion.div 
                  className="alert alert-danger"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  data-testid="login-error"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-muted border-custom text-light"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control bg-muted border-custom text-light"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    data-testid="input-password"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="rememberMe"
                      data-testid="checkbox-remember"
                    />
                    <label className="form-check-label small text-secondary-custom" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="small" style={{ color: 'var(--accent-1)' }}>
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary-custom w-100 mb-3"
                  disabled={isLoading}
                  data-testid="btn-login"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-secondary-custom mb-0">
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ color: 'var(--accent-1)' }}>
                    Sign up here
                  </Link>
                </p>
              </div>

              <div className="mt-4 pt-4 border-top border-custom">
                <div className="text-center mb-3">
                  <small className="text-secondary-custom">Demo Accounts</small>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button 
                      className="btn btn-outline-custom btn-sm w-100"
                      onClick={() => setFormData({ email: 'student@demo.com', password: 'demo123' })}
                      data-testid="btn-demo-student"
                    >
                      Student Demo
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn btn-outline-custom btn-sm w-100"
                      onClick={() => setFormData({ email: 'admin@studycove.in', password: 'admin123' })}
                      data-testid="btn-demo-admin"
                    >
                      Admin Demo
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
