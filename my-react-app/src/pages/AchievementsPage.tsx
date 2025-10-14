import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedText from '../components/AnimatedText';
import './AchievementsPage.css';

const achievementsData = [
  {
    icon: '🏆',
    title: 'Google I/O Extended Speaker',
    description: 'Presented on Jetpack Compose best practices',
    year: '2024'
  },
  {
    icon: '⭐',
    title: '100K+ App Downloads',
    description: 'Multiple apps crossed 100K downloads milestone',
    year: '2023'
  },
  {
    icon: '📱',
    title: 'App of the Year',
    description: 'Featured app in Google Play Store',
    year: '2023'
  },
  {
    icon: '🎓',
    title: 'Android Certified Developer',
    description: 'Google Associate Android Developer Certification',
    year: '2022'
  },
  {
    icon: '💻',
    title: 'Open Source Contributor',
    description: 'Contributed to major Android libraries',
    year: '2022'
  },
  {
    icon: '🚀',
    title: 'Startup Launch',
    description: 'Successfully launched 3 startup applications',
    year: '2021'
  }
];

const certificatesData = [
  {
    title: 'Mission Blackout - 1st Runner Up',
    organization: 'Cyber Protectors',
    image: '/ctf1.jpeg',
    year: '2025',
    description: 'Ultimate Cyber Champion - Mission Blackout Cyber Treasure Hunt'
  },
  {
    title: 'Mission Blackout - 2nd Runner Up',
    organization: 'Cyber Protectors',
    image: '/docker.jpg',
    year: '2025',
    description: 'Cyber Specialist - Mission Blackout Cyber Treasure Hunt'
  },
  {
    title: 'Docker 101 Workshop',
    organization: 'Atmiya University',
    image: '/ctf2.jpeg',
    year: '2024',
    description: '2 Days Workshop on Docker 101 - Department of Computer Science'
  },
   
];

const AchievementsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="page achievements-page" ref={ref}>
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText text="Achievements" className="page-title" />
          <p className="page-subtitle">Milestones and recognitions in my career</p>
        </motion.div>

        {/* Certificates Section */}
        <motion.div
          className="certificates-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="section-heading">Certificates & Awards</h3>
          <div className="certificates-grid">
            {certificatesData.map((cert, index) => (
              <SpotlightCard key={index}>
                <motion.div
                  className="certificate-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="certificate-image-wrapper">
                    <img src={cert.image} alt={cert.title} className="certificate-image" />
                    <div className="certificate-overlay">
                      <span className="certificate-year">{cert.year}</span>
                    </div>
                  </div>
                  <div className="certificate-content">
                    <h4 className="certificate-title">{cert.title}</h4>
                    <p className="certificate-organization">{cert.organization}</p>
                    <p className="certificate-description">{cert.description}</p>
                  </div>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Regular Achievements */}
        <motion.div
          className="achievements-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="section-heading">Career Milestones</h3>
          <div className="achievements-grid">
            {achievementsData.map((achievement, index) => (
              <SpotlightCard key={index}>
                <motion.div
                  className="achievement-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                <div className="achievement-icon">{achievement.icon}</div>
                <span className="achievement-year">{achievement.year}</span>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;
