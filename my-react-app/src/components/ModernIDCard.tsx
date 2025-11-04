import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ModernIDCard.css';

const ModernIDCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const stats = [
    { label: 'Experience', value: '#', icon: '⚡' },
    { label: 'Projects', value: '6+', icon: '🚀' },
    { label: 'Achievements', value: '3+', icon: '💎' }
  ];

  return (
    <motion.div 
      ref={cardRef}
      className="modern-id-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX,
        rotateY
      }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
    >
      {/* Animated gradient orbs */}
      <div className="card-orb orb-blue"></div>
      <div className="card-orb orb-purple"></div>
      
      {/* Card content */}
      <div className="card-content">
        {/* Header with status */}
        <div className="card-header">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">Available for Work</span>
          </div>
        </div>

        {/* Profile section */}
        <div className="profile-section">
          <motion.div 
            className="avatar-container"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="avatar-glow"></div>
            <div className="avatar">
              <img src="/myphoto2.png" alt="Profile" className="avatar-image" />
            </div>
          </motion.div>
          
          <div className="profile-details">
            <h2 className="profile-name">Jeel Chandegra</h2>
            <p className="profile-role">Full Stack Android Developer</p>
            <div className="profile-meta">
              <span className="meta-item">📍 Rajkot, India</span>
          
              
            </div>
          </div>
        </div>


        {/* Stats grid */}
        <div className="stats-container">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-box"
              whileHover={{ y: -4, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-info">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-text">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        

       










      </div>
    </motion.div>
  );
};

export default ModernIDCard;
