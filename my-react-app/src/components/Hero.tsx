import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';
import AnimatedText from './AnimatedText';
import './Hero.css';
import resumePDF from '../assets/Jeel chandegra Resume (1).pdf';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Status Badge */}
        <motion.div
          className="status-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="status-dot"></span>
          Available for opportunities
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="hero-title">
            <AnimatedText text="Android Developer" />
          </h1>
          <h1 className="hero-title hero-subtitle">
            <AnimatedText text="Building Native Apps" gradient />
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Crafting exceptional mobile experiences with Kotlin, Jetpack Compose,
          and modern Android architecture patterns.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticButton href="#projects">
            <div className="btn-primary">
              View Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </MagneticButton>
          <MagneticButton href={resumePDF}>
            <a href={resumePDF} download="Jeel_Chandegra_Resume.pdf" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1V11M8 11L11 8M8 11L5 8M2 11V13C2 14.1046 2.89543 15 4 15H12C13.1046 15 14 14.1046 14 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </a>
          </MagneticButton>
          <MagneticButton href="#contact">
            <div className="btn-secondary">
              Get in Touch
            </div>
          </MagneticButton>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-card">
            <div className="stat-value">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">30+</div>
            <div className="stat-label">Projects</div>
          </div>
         
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
