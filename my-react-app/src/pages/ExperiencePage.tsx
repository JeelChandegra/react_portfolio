import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedText from '../components/AnimatedText';
import './ExperiencePage.css';

const experienceData = [
  {
    role: 'Senior Android Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    location: 'Remote',
    description: 'Leading Android development team, architecting scalable applications using Kotlin and Jetpack Compose.',
    achievements: [
      'Migrated legacy codebase to Jetpack Compose, improving performance by 40%',
      'Mentored 5 junior developers in Android best practices',
      'Implemented CI/CD pipeline reducing deployment time by 60%'
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Clean Architecture']
  },
  {
    role: 'Android Developer',
    company: 'Mobile Apps Co.',
    period: '2020 - 2022',
    location: 'New York, USA',
    description: 'Developed and maintained multiple Android applications with millions of active users.',
    achievements: [
      'Built e-commerce app with 1M+ downloads',
      'Reduced app crash rate by 75%',
      'Implemented real-time chat feature using Firebase'
    ],
    tech: ['Kotlin', 'Java', 'Firebase', 'Retrofit', 'Room']
  },
  {
    role: 'Junior Android Developer',
    company: 'StartUp Innovations',
    period: '2019 - 2020',
    location: 'San Francisco, USA',
    description: 'Contributed to Android app development and learned modern development practices.',
    achievements: [
      'Developed 5+ features for main product',
      'Fixed 100+ bugs improving app stability',
      'Collaborated with design team for UI/UX improvements'
    ],
    tech: ['Java', 'XML', 'SQLite', 'REST APIs']
  },
  {
    role: 'Junior Android Developer',
    company: 'StartUp Innovations',
    period: '2019 - 2020',
    location: 'San Francisco, USA',
    description: 'Contributed to Android app development and learned modern development practices.',
    achievements: [
      'Developed 5+ features for main product',
      'Fixed 100+ bugs improving app stability',
      'Collaborated with design team for UI/UX improvements'
    ],
    tech: ['Java', 'XML', 'SQLite', 'REST APIs']
  }
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
