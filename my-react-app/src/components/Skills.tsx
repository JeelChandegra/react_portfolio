import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import AnimatedText from './AnimatedText';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'XML', 'SQL', 'Python', 'JavaScript', 'Dart', 'C++', 'C#', 'HTML', 'CSS', 'TypeScript']
  },
  {
    title: 'Architecture',
    skills: ['MVVM', 'Clean Architecture', 'MVI', 'Repository Pattern']
  },
  {
    title: 'Networking',
    skills: ['Retrofit', 'OkHttp', 'Ktor', 'REST APIs', 'GraphQL']
  },
  {
    title: 'Databases',
    skills: ['SQLite', 'Room DB', 'Firebase Firestore', 'MySQL', 'PostgreSQL', 'MongoDB','Hive']
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['Jetpack Compose', 'React', 'Flutter', 'Node.js', 'Express.js']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Docker', 'GitHub Actions', 'AWS', 'Google Cloud', 'Firebase Hosting']
  },
  {
    title: 'Testing',
    skills: ['JUnit', 'Espresso', 'Mockito']
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'Gradle', 'CI/CD', 'Android Studio', 'Figma']
  }
];


const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText text="Skills & Expertise" className="section-title" />
          <p className="section-subtitle">Technologies and tools I work with</p>
        </motion.div>

        <div className="skills-bento">
          {skillCategories.map((category, categoryIndex) => (
            <SpotlightCard key={category.title}>
              <motion.div
                className="skill-category-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            </SpotlightCard>
          ))}
        </div>

        {/* Featured Skills */}
        <motion.div
          className="featured-skills"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SpotlightCard>
            <div className="featured-skill-card">
              <div className="featured-icon">⚡</div>
              <div className="featured-content">
                <h4>Fast Learner</h4>
                <p>Quick to adapt to new technologies and frameworks</p>
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard>
            <div className="featured-skill-card">
              <div className="featured-icon">🎯</div>
              <div className="featured-content">
                <h4>Problem Solver</h4>
                <p>Strong analytical and debugging skills</p>
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard>
            <div className="featured-skill-card">
              <div className="featured-icon">👥</div>
              <div className="featured-content">
                <h4>Team Player</h4>
                <p>Excellent collaboration and communication</p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
