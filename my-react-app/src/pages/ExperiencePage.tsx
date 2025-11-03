import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedText from '../components/AnimatedText';
import './ExperiencePage.css';

const experienceData = [
  {
    role: 'Machine Learning Internship',
    company: 'Brainybeam Info-Tech PVT LTD.',
    period: 'May 2025 - July 2025',
    location: 'Remote',
    description: '',
    achievements: [
      'Collected, cleaned, and preprocessed large datasets using Pandas, NumPy, and scikit-learn.',
      'Built and trained machine learning models (e.g., regression, classification).'
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Jupyter Notebooks']
  },
  
];

const ExperiencePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="page experience-page" ref={ref}>
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText text="Experience" className="page-title" />
          <p className="page-subtitle">My professional journey in Android development</p>
        </motion.div>

        <div className="timeline">
          {experienceData.map((exp, index) => (
            <SpotlightCard key={index}>
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <p className="experience-company">{exp.company}</p>
                  </div>
                  <div className="experience-meta">
                    <span className="experience-period">{exp.period}</span>
                    <span className="experience-location">📍 {exp.location}</span>
                  </div>
                </div>
                <p className="experience-description">{exp.description}</p>
                <ul className="achievements-list">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                <div className="tech-stack">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExperiencePage;
