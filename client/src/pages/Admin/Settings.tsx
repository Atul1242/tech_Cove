import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    supportEmail: string;
    supportPhone: string;
    timezone: string;
    currency: string;
    language: string;
  };
  booking: {
    maxAdvanceBookingDays: number;
    cancellationDeadlineHours: number;
    noShowGracePeriod: number;
    autoCheckoutHours: number;
    maxDailyBookingsPerUser: number;
  };
  pricing: {
    lateCancellationFee: number;
    noShowPenalty: number;
    membershipDiscounts: {
      student: number;
      monthly: number;
      premium: number;
    };
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    bookingReminders: boolean;
    paymentNotifications: boolean;
    marketingEmails: boolean;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    twoFactorAuth: boolean;
    dataRetentionDays: number;
  };
}

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  // TODO: Replace with actual settings from API
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      siteName: 'StudyCove',
      siteDescription: 'Premium study spaces with guaranteed seating, perfect acoustics, and all the amenities you need to focus and succeed.',
      supportEmail: 'support@studycove.in',
      supportPhone: '+91 98765 43210',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      language: 'en'
    },
    booking: {
      maxAdvanceBookingDays: 30,
      cancellationDeadlineHours: 2,
      noShowGracePeriod: 15,
      autoCheckoutHours: 1,
      maxDailyBookingsPerUser: 3
    },
    pricing: {
      lateCancellationFee: 50,
      noShowPenalty: 100,
      membershipDiscounts: {
        student: 25,
        monthly: 15,
        premium: 10
      }
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      bookingReminders: true,
      paymentNotifications: true,
      marketingEmails: false
    },
    security: {
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      twoFactorAuth: false,
      dataRetentionDays: 365
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: 'fas fa-cog' },
    { id: 'booking', label: 'Booking Rules', icon: 'fas fa-calendar-alt' },
    { id: 'pricing', label: 'Pricing', icon: 'fas fa-rupee-sign' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' }
  ];

  const handleInputChange = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleNestedInputChange = (section: keyof SystemSettings, parentField: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...(prev[section] as any)[parentField],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    // TODO: Implement settings save
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    // TODO: Implement settings reset to defaults
    console.log('Resetting settings to defaults');
    setHasChanges(false);
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
            <h1 className="font-display fw-bold mb-2" data-testid="settings-title">
              System Settings
            </h1>
            <p className="text-secondary-custom">
              Configure global system settings and preferences
            </p>
          </div>
          <div className="d-flex gap-2">
            {hasChanges && (
              <>
                <button 
                  className="btn btn-outline-custom"
                  onClick={handleResetSettings}
                  data-testid="btn-reset-settings"
                >
                  Reset Changes
                </button>
                <button 
                  className="btn btn-primary-custom"
                  onClick={handleSaveSettings}
                  data-testid="btn-save-settings"
                >
                  <i className="fas fa-save me-2"></i>
                  Save Changes
                </button>
              </>
            )}
          </div>
        </motion.div>

        <div className="row g-5">
          {/* Settings Tabs */}
          <div className="col-lg-3">
            <motion.div 
              className="card-custom p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="list-group list-group-flush">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`list-group-item list-group-item-action d-flex align-items-center p-3 ${
                      selectedTab === tab.id ? 'active' : ''
                    }`}
                    style={{
                      background: selectedTab === tab.id ? 'var(--accent-1)' : 'transparent',
                      color: selectedTab === tab.id ? 'white' : 'var(--text)',
                      border: 'none',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                    onClick={() => setSelectedTab(tab.id)}
                    data-testid={`tab-${tab.id}`}
                  >
                    <i className={`${tab.icon} me-3`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Settings Content */}
          <div className="col-lg-9">
            <motion.div 
              className="card-custom p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* General Settings */}
              {selectedTab === 'general' && (
                <div>
                  <h4 className="font-display fw-semibold mb-4">General Settings</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Site Name</label>
                      <input
                        type="text"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.general.siteName}
                        onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                        data-testid="input-site-name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Support Email</label>
                      <input
                        type="email"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.general.supportEmail}
                        onChange={(e) => handleInputChange('general', 'supportEmail', e.target.value)}
                        data-testid="input-support-email"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Site Description</label>
                      <textarea
                        className="form-control bg-muted border-custom text-light"
                        rows={3}
                        value={settings.general.siteDescription}
                        onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                        data-testid="textarea-site-description"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Support Phone</label>
                      <input
                        type="tel"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.general.supportPhone}
                        onChange={(e) => handleInputChange('general', 'supportPhone', e.target.value)}
                        data-testid="input-support-phone"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Timezone</label>
                      <select
                        className="form-select bg-muted border-custom text-light"
                        value={settings.general.timezone}
                        onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        data-testid="select-timezone"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Currency</label>
                      <select
                        className="form-select bg-muted border-custom text-light"
                        value={settings.general.currency}
                        onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                        data-testid="select-currency"
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Language</label>
                      <select
                        className="form-select bg-muted border-custom text-light"
                        value={settings.general.language}
                        onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                        data-testid="select-language"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Settings */}
              {selectedTab === 'booking' && (
                <div>
                  <h4 className="font-display fw-semibold mb-4">Booking Rules</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Max Advance Booking (Days)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.booking.maxAdvanceBookingDays}
                        onChange={(e) => handleInputChange('booking', 'maxAdvanceBookingDays', parseInt(e.target.value))}
                        data-testid="input-max-advance-days"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Cancellation Deadline (Hours)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.booking.cancellationDeadlineHours}
                        onChange={(e) => handleInputChange('booking', 'cancellationDeadlineHours', parseInt(e.target.value))}
                        data-testid="input-cancellation-deadline"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">No-Show Grace Period (Minutes)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.booking.noShowGracePeriod}
                        onChange={(e) => handleInputChange('booking', 'noShowGracePeriod', parseInt(e.target.value))}
                        data-testid="input-grace-period"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Auto Checkout (Hours)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.booking.autoCheckoutHours}
                        onChange={(e) => handleInputChange('booking', 'autoCheckoutHours', parseInt(e.target.value))}
                        data-testid="input-auto-checkout"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Max Daily Bookings per User</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.booking.maxDailyBookingsPerUser}
                        onChange={(e) => handleInputChange('booking', 'maxDailyBookingsPerUser', parseInt(e.target.value))}
                        data-testid="input-max-daily-bookings"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Settings */}
              {selectedTab === 'pricing' && (
                <div>
                  <h4 className="font-display fw-semibold mb-4">Pricing Configuration</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Late Cancellation Fee (₹)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.pricing.lateCancellationFee}
                        onChange={(e) => handleInputChange('pricing', 'lateCancellationFee', parseInt(e.target.value))}
                        data-testid="input-cancellation-fee"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">No-Show Penalty (₹)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.pricing.noShowPenalty}
                        onChange={(e) => handleInputChange('pricing', 'noShowPenalty', parseInt(e.target.value))}
                        data-testid="input-no-show-penalty"
                      />
                    </div>
                  </div>
                  
                  <h6 className="fw-semibold mt-4 mb-3">Membership Discounts (%)</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Student Discount</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.pricing.membershipDiscounts.student}
                        onChange={(e) => handleNestedInputChange('pricing', 'membershipDiscounts', 'student', parseInt(e.target.value))}
                        data-testid="input-student-discount"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Monthly Member Discount</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.pricing.membershipDiscounts.monthly}
                        onChange={(e) => handleNestedInputChange('pricing', 'membershipDiscounts', 'monthly', parseInt(e.target.value))}
                        data-testid="input-monthly-discount"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Premium Member Discount</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.pricing.membershipDiscounts.premium}
                        onChange={(e) => handleNestedInputChange('pricing', 'membershipDiscounts', 'premium', parseInt(e.target.value))}
                        data-testid="input-premium-discount"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {selectedTab === 'notifications' && (
                <div>
                  <h4 className="font-display fw-semibold mb-4">Notification Preferences</h4>
                  <div className="row g-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="col-12">
                        <div className="d-flex justify-content-between align-items-center p-3 bg-muted rounded-3">
                          <div>
                            <h6 className="fw-semibold mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h6>
                            <small className="text-secondary-custom">
                              {key === 'emailNotifications' && 'Send email notifications to users'}
                              {key === 'smsNotifications' && 'Send SMS notifications for important updates'}
                              {key === 'bookingReminders' && 'Send booking reminder notifications'}
                              {key === 'paymentNotifications' && 'Send payment and billing notifications'}
                              {key === 'marketingEmails' && 'Send promotional and marketing emails'}
                            </small>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                              data-testid={`switch-${key}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {selectedTab === 'security' && (
                <div>
                  <h4 className="font-display fw-semibold mb-4">Security Configuration</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Session Timeout (Hours)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        data-testid="input-session-timeout"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Max Login Attempts</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                        data-testid="input-max-login-attempts"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Password Min Length</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                        data-testid="input-password-min-length"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Data Retention (Days)</label>
                      <input
                        type="number"
                        className="form-control bg-muted border-custom text-light"
                        value={settings.security.dataRetentionDays}
                        onChange={(e) => handleInputChange('security', 'dataRetentionDays', parseInt(e.target.value))}
                        data-testid="input-data-retention"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center p-3 bg-muted rounded-3">
                      <div>
                        <h6 className="fw-semibold mb-1">Two-Factor Authentication</h6>
                        <small className="text-secondary-custom">
                          Require 2FA for admin accounts
                        </small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                          data-testid="switch-2fa"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* System Information */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h4 className="font-display fw-bold text-center mb-4">System Information</h4>
            <div className="row g-4 text-center">
              <div className="col-md-3">
                <div className="fw-bold">v1.2.3</div>
                <small className="text-secondary-custom">Application Version</small>
              </div>
              <div className="col-md-3">
                <div className="fw-bold">MySQL 8.0</div>
                <small className="text-secondary-custom">Database Version</small>
              </div>
              <div className="col-md-3">
                <div className="fw-bold">99.9%</div>
                <small className="text-secondary-custom">System Uptime</small>
              </div>
              <div className="col-md-3">
                <div className="fw-bold">2024-03-15</div>
                <small className="text-secondary-custom">Last Updated</small>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Settings;
