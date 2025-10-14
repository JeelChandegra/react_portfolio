import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import ProfileCard from './ProfileCard';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Passionate about creating exceptional mobile experiences</p>
        </motion.div>

        <div className="about-intro">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ProfileCard
              avatarUrl="/profile.jpg"
              miniAvatarUrl="/profile.jpg"
              name="Jeel Chandegra"
              title="Senior Android Developer"
              handle="@jeelchandegra"
              status="Available for work"
              contactText="Contact"
              showUserInfo={true}
              showBehindGradient={true}
              enableTilt={true}
              enableMobileTilt={true}
            />
          </motion.div>

          <SpotlightCard>
            <motion.div
              className="bento-card android-dev-card"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="card-icon">👨‍💻</div>
              <h3>Android Developer</h3>
              <p>
                Specializing in building scalable, high-performance Android applications using Kotlin and Jetpack Compose. 
                I focus on clean architecture, modern design patterns, and creating delightful user experiences.
              </p>
              <div className="tag-list">
                <span className="tag">Kotlin</span>
                <span className="tag">Jetpack Compose</span>
                <span className="tag">MVVM</span>
              </div>
            </motion.div>
          </SpotlightCard>
        </div>

        <div className="bento-grid">

          {/* Experience Card */}
          <SpotlightCard>
            <motion.div
              className="bento-card bento-small"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-icon">⚡</div>
              <h3>5+ Years</h3>
              <p>Professional Android Development Experience</p>
            </motion.div>
          </SpotlightCard>

          {/* Approach Card */}
          <SpotlightCard>
            <motion.div
              className="bento-card bento-small"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-icon">🎯</div>
              <h3>User-Centric</h3>
              <p>Always prioritizing user experience and app performance</p>
            </motion.div>
          </SpotlightCard>

          {/* Tech Stack Card */}
          <SpotlightCard>
            <motion.div
              className="bento-card bento-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card-icon">🛠️</div>
              <h3>Tech Stack</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <span>Kotlin</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="tech-item">
                  <span>Compose</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="tech-item">
                  <span>Architecture</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Learning Card */}
          <SpotlightCard>
            <motion.div
              className="bento-card bento-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
            <div className="card-icon">📚</div>
            <h3>Continuous Learning</h3>
            <p>
              Staying updated with the latest Android development trends, best practices, 
              and emerging technologies to deliver cutting-edge solutions.
            </p>
          </motion.div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default About;
