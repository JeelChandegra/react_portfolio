import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import AnimatedText from '../components/AnimatedText';
import MagneticButton from '../components/MagneticButton';
import SpotlightCard from '../components/SpotlightCard';

import resumePDF from '../assets/JeelchandegraResume.pdf';
import './Home.css';
import ModernIDCard from '../components/ModernIDCard';

const Home = () => {
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: '-100px' });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
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
            Passionate about creating beautiful, high-performance mobile apps using Flutter, React Native, Firebase, and Node.js built with modern design principles, clean architecture, and a focus on smooth, delightful user experiences.

          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton href="#about">
              <div className="btn-primary">
                View Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </MagneticButton>
            <MagneticButton>
              <a href={resumePDF} download="JeelchandegraResume.pdf" className="btn-secondary">
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

          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" ref={aboutRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">About Me</h2>

            <p className="section-subtitle">Passionate about creating exceptional mobile experiences</p>
          </motion.div>

          <div className="about-content">
            <motion.div
              className="profile-section"
              initial={{ opacity: 0, x: -30 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ModernIDCard />
            </motion.div>

            <SpotlightCard>
              <motion.div
                className="intro-card"
                initial={{ opacity: 0, x: 30 }}
                animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="card-icon">👨‍💻</div>
                <h3>Android Developer</h3>
                <p>
                 I specialize in building scalable, high-performance mobile applications using Kotlin, Jetpack Compose, Flutter, and React Native. My focus is on clean architecture, modern design patterns, and crafting smooth, intuitive user experiences. I’m passionate about writing clean, maintainable code and staying up to date with the latest tools and frameworks to deliver reliable, production-ready apps that users love.
                 </p>
                   
              </motion.div>
            </SpotlightCard>
          </div>

          
        </div>
      </section>
    </div>
  );
};

export default Home;
