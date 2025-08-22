import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isStudent: false,
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service');
      setIsLoading(false);
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        membershipType: null
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-custom min-vh-100 d-flex align-items-center py-5" style={{ marginTop: '76px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <motion.div 
              className="card-custom p-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-4">
                <h2 className="font-display fw-bold mb-2" data-testid="signup-title">
                  Join StudyCove
                </h2>
                <p className="text-secondary-custom">
                  Create your account and start studying better
                </p>
              </div>

              {error && (
                <motion.div 
                  className="alert alert-danger"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  data-testid="signup-error"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control bg-muted border-custom text-light"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div className="col-md-6">
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

                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control bg-muted border-custom text-light"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control bg-muted border-custom text-light"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      required
                      data-testid="input-password"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control bg-muted border-custom text-light"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                      data-testid="input-confirm-password"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="isStudent"
                      id="isStudent"
                      checked={formData.isStudent}
                      onChange={handleInputChange}
                      data-testid="checkbox-student"
                    />
                    <label className="form-check-label text-secondary-custom" htmlFor="isStudent">
                      I am a student (get 25% discount)
                    </label>
                  </div>

                  <div className="form-check mb-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="agreeToTerms"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      data-testid="checkbox-terms"
                    />
                    <label className="form-check-label text-secondary-custom" htmlFor="agreeToTerms">
                      I agree to the{' '}
                      <Link to="/terms" style={{ color: 'var(--accent-1)' }}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" style={{ color: 'var(--accent-1)' }}>
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary-custom w-100 mb-3"
                  disabled={isLoading}
                  data-testid="btn-signup"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-secondary-custom mb-0">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'var(--accent-1)' }}>
                    Sign in here
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
