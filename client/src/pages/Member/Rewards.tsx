import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'discounts' | 'freebies' | 'upgrades';
  available: boolean;
  imageUrl: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

const Rewards: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const userStats = {
    totalPoints: 1250,
    pointsThisMonth: 320,
    currentLevel: 'Gold',
    nextLevel: 'Platinum',
    pointsToNextLevel: 750
  };

  const rewards: Reward[] = [
    {
      id: 'reward-1',
      title: '1 Hour Free Study Session',
      description: 'Redeem for 1 hour of free study time at any location',
      pointsCost: 200,
      category: 'freebies',
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
    },
    {
      id: 'reward-2',
      title: '20% Off Day Pass',
      description: 'Get 20% discount on your next day pass booking',
      pointsCost: 150,
      category: 'discounts',
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
    },
    {
      id: 'reward-3',
      title: 'Premium Seat Upgrade',
      description: 'Upgrade to premium seating area for one session',
      pointsCost: 300,
      category: 'upgrades',
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
    },
    {
      id: 'reward-4',
      title: 'StudyCove Merchandise',
      description: 'Exclusive StudyCove branded notebook and pen set',
      pointsCost: 500,
      category: 'freebies',
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
    },
    {
      id: 'reward-5',
      title: 'Guest Pass',
      description: 'Bring a friend for a free study session',
      pointsCost: 400,
      category: 'freebies',
      available: false,
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
    },
    {
      id: 'reward-6',
      title: '50% Off Monthly Plan',
      description: 'Half price on your next monthly membership',
      pointsCost: 800,
      category: 'discounts',
      available: false,
      imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      title: 'First Timer',
      description: 'Complete your first study session',
      icon: 'fas fa-star',
      unlockedAt: '2024-01-15'
    },
    {
      id: 'ach-2',
      title: 'Study Streak',
      description: 'Study for 7 consecutive days',
      icon: 'fas fa-fire',
      unlockedAt: '2024-02-10'
    },
    {
      id: 'ach-3',
      title: 'Night Owl',
      description: 'Complete 5 late night sessions (after 8 PM)',
      icon: 'fas fa-moon',
      unlockedAt: '2024-02-20'
    },
    {
      id: 'ach-4',
      title: 'Marathon Student',
      description: 'Study for 100 hours total',
      icon: 'fas fa-clock',
      progress: 186,
      target: 100,
      unlockedAt: '2024-03-01'
    },
    {
      id: 'ach-5',
      title: 'Social Butterfly',
      description: 'Refer 5 friends to StudyCove',
      icon: 'fas fa-users',
      progress: 2,
      target: 5
    },
    {
      id: 'ach-6',
      title: 'Location Explorer',
      description: 'Visit all StudyCove locations',
      icon: 'fas fa-map-marked-alt',
      progress: 4,
      target: 6
    }
  ];

  const categories = [
    { id: 'all', label: 'All Rewards' },
    { id: 'discounts', label: 'Discounts' },
    { id: 'freebies', label: 'Free Items' },
    { id: 'upgrades', label: 'Upgrades' }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handleRedeemReward = (rewardId: string, pointsCost: number) => {
    if (userStats.totalPoints >= pointsCost) {
      // TODO: Implement reward redemption
      console.log('Redeeming reward:', rewardId);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'bronze': return 'var(--support-coral)';
      case 'silver': return 'var(--text-secondary)';
      case 'gold': return 'var(--support-amber)';
      case 'platinum': return 'var(--accent-1)';
      default: return 'var(--text-secondary)';
    }
  };

  const getReferralLink = () => {
    // TODO: Generate actual referral link
    return 'https://studycove.in/invite/USER123';
  };

  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-3" data-testid="rewards-title">
            Rewards & Achievements
          </h1>
          <p className="fs-5 text-secondary-custom">
            Earn points for studying and unlock amazing rewards
          </p>
        </motion.div>

        {/* Points Overview */}
        <motion.div 
          className="card-custom p-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-4"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: getLevelColor(userStats.currentLevel),
                    color: 'white'
                  }}
                >
                  <i className="fas fa-trophy" style={{ fontSize: '2rem' }}></i>
                </div>
                <div>
                  <h3 className="font-display fw-bold mb-1">
                    {userStats.currentLevel} Member
                  </h3>
                  <p className="text-secondary-custom mb-0">
                    {userStats.pointsToNextLevel} points to {userStats.nextLevel}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Progress to {userStats.nextLevel}</span>
                  <span>{Math.round((1 - userStats.pointsToNextLevel / 2000) * 100)}%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${(1 - userStats.pointsToNextLevel / 2000) * 100}%`,
                      background: getLevelColor(userStats.nextLevel)
                    }}
                  ></div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="text-center">
                    <h4 className="fw-bold mb-1" style={{ color: 'var(--accent-1)' }}>
                      {userStats.totalPoints.toLocaleString()}
                    </h4>
                    <small className="text-secondary-custom">Total Points</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <h4 className="fw-bold mb-1" style={{ color: 'var(--support-moss)' }}>
                      {userStats.pointsThisMonth}
                    </h4>
                    <small className="text-secondary-custom">This Month</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <h4 className="fw-bold mb-1" style={{ color: 'var(--support-amber)' }}>
                      {userStats.pointsToNextLevel}
                    </h4>
                    <small className="text-secondary-custom">To Next Level</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <div className="bg-muted rounded-3 p-4">
                <h6 className="fw-semibold mb-3">How to Earn Points</h6>
                <div className="text-secondary-custom small">
                  <div className="mb-2">
                    <i className="fas fa-clock me-2"></i>
                    1 point per hour studied
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-calendar-check me-2"></i>
                    10 points per booking
                  </div>
                  <div className="mb-2">
                    <i className="fas fa-users me-2"></i>
                    50 points per referral
                  </div>
                  <div>
                    <i className="fas fa-star me-2"></i>
                    Bonus for achievements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="row g-5">
          {/* Rewards */}
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="font-display fw-semibold">Available Rewards</h3>
                
                {/* Category Filter */}
                <div className="d-flex bg-panel rounded-3 p-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`btn btn-sm px-3 ${selectedCategory === category.id ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                      onClick={() => setSelectedCategory(category.id)}
                      data-testid={`filter-${category.id}`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="row g-4">
                {filteredRewards.map((reward, index) => (
                  <div key={reward.id} className="col-md-6">
                    <motion.div 
                      className={`card-custom h-100 ${!reward.available ? 'opacity-50' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: reward.available ? 1 : 0.5, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={reward.available ? { y: -5 } : {}}
                      data-testid={`reward-card-${reward.id}`}
                    >
                      <img 
                        src={reward.imageUrl}
                        alt={reward.title}
                        className="card-img-top"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      
                      <div className="card-body p-4 d-flex flex-column">
                        <div className="flex-grow-1">
                          <h6 className="fw-semibold mb-2">{reward.title}</h6>
                          <p className="text-secondary-custom small mb-3">
                            {reward.description}
                          </p>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-coins me-2" style={{ color: 'var(--support-amber)' }}></i>
                            <span className="fw-bold">{reward.pointsCost} points</span>
                          </div>
                          
                          <button 
                            className="btn btn-primary-custom btn-sm"
                            disabled={!reward.available || userStats.totalPoints < reward.pointsCost}
                            onClick={() => handleRedeemReward(reward.id, reward.pointsCost)}
                            data-testid={`btn-redeem-${reward.id}`}
                          >
                            {!reward.available 
                              ? 'Unavailable' 
                              : userStats.totalPoints < reward.pointsCost 
                              ? 'Need More Points' 
                              : 'Redeem'
                            }
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <div className="col-lg-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display fw-semibold mb-4">Achievements</h3>
              
              <div className="row g-3">
                {achievements.map((achievement, index) => (
                  <div key={achievement.id} className="col-12">
                    <motion.div 
                      className={`card-custom p-3 ${achievement.unlockedAt ? 'border-success' : ''}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      data-testid={`achievement-${achievement.id}`}
                    >
                      <div className="d-flex align-items-start">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ 
                            width: '50px', 
                            height: '50px', 
                            background: achievement.unlockedAt ? 'var(--support-moss)' : 'var(--muted)',
                            color: 'white'
                          }}
                        >
                          <i className={achievement.icon}></i>
                        </div>
                        
                        <div className="flex-grow-1">
                          <h6 className="fw-semibold mb-1">{achievement.title}</h6>
                          <p className="text-secondary-custom small mb-2">
                            {achievement.description}
                          </p>
                          
                          {achievement.unlockedAt ? (
                            <small className="text-success">
                              <i className="fas fa-check me-1"></i>
                              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </small>
                          ) : achievement.progress !== undefined ? (
                            <div>
                              <div className="d-flex justify-content-between mb-1">
                                <small className="text-secondary-custom">
                                  {achievement.progress}/{achievement.target}
                                </small>
                                <small className="text-secondary-custom">
                                  {Math.round((achievement.progress! / achievement.target!) * 100)}%
                                </small>
                              </div>
                              <div className="progress" style={{ height: '4px' }}>
                                <div 
                                  className="progress-bar bg-success" 
                                  style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <small className="text-secondary-custom">
                              <i className="fas fa-lock me-1"></i>
                              Not started
                            </small>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Referral Program */}
        <motion.section 
          className="py-5 mt-5 bg-panel rounded-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="text-center mb-4">
              <h4 className="font-display fw-bold mb-3">Refer Friends & Earn</h4>
              <p className="text-secondary-custom">
                Invite friends to StudyCove and earn 50 points for each successful referral
              </p>
            </div>
            
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control bg-muted border-custom text-light"
                    value={getReferralLink()}
                    readOnly
                    data-testid="referral-link"
                  />
                  <button 
                    className="btn btn-primary-custom"
                    onClick={() => navigator.clipboard.writeText(getReferralLink())}
                    data-testid="btn-copy-referral"
                  >
                    <i className="fas fa-copy me-2"></i>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Rewards;
