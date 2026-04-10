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

  // Input style with focus state
  const inputStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '12px 16px',
    fontSize: '15px',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      <style>{`
        .login-input:focus {
          background-color: rgba(255, 255, 255, 0.08) !important;
          border-color: var(--accent-1) !important;
          box-shadow: 0 0 0 3px rgba(122, 199, 155, 0.1) !important;
          outline: none !important;
        }
        .login-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    <div className="bg-dark-custom min-vh-100 d-flex align-items-center" style={{ marginTop: '76px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <motion.div 
              className="card-custom p-5 shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, rgba(122, 199, 155, 0.05), rgba(255, 214, 63, 0.05))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-4">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))'
                  }}
                >
                  <i className="fas fa-user-circle fa-2x text-white"></i>
                </div>
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
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control login-input"
                    style={inputStyle}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control login-input"
                    style={inputStyle}
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
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                      data-testid="checkbox-remember"
                    />
                    <label className="form-check-label small" htmlFor="rememberMe" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Remember me
                    </label>
                  </div>
                  <Link 
                    to="/forgot-password" 
                    className="small text-decoration-none"
                    style={{ color: 'var(--accent-1)', fontWeight: 500 }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn w-100 mb-3 py-3 fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  disabled={isLoading}
                  data-testid="btn-login"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(122, 199, 155, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
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

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="text-center mb-3">
                  <small style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 500 }}>
                    <i className="fas fa-flask me-2"></i>Try Demo Accounts
                  </small>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button 
                      className="btn btn-sm w-100"
                      style={{
                        backgroundColor: 'rgba(122, 199, 155, 0.1)',
                        border: '1px solid rgba(122, 199, 155, 0.3)',
                        color: 'var(--accent-1)',
                        padding: '10px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setFormData({ email: 'student@demo.com', password: 'demo123' })}
                      data-testid="btn-demo-student"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(122, 199, 155, 0.2)';
                        e.currentTarget.style.borderColor = 'var(--accent-1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(122, 199, 155, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(122, 199, 155, 0.3)';
                      }}
                    >
                      <i className="fas fa-user-graduate me-1"></i>
                      Student
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn btn-sm w-100"
                      style={{
                        backgroundColor: 'rgba(255, 214, 63, 0.1)',
                        border: '1px solid rgba(255, 214, 63, 0.3)',
                        color: 'var(--accent-2)',
                        padding: '10px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setFormData({ email: 'admin@studycove.in', password: 'admin123' })}
                      data-testid="btn-demo-admin"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 214, 63, 0.2)';
                        e.currentTarget.style.borderColor = 'var(--accent-2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 214, 63, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 214, 63, 0.3)';
                      }}
                    >
                      <i className="fas fa-user-shield me-1"></i>
                      Admin
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
