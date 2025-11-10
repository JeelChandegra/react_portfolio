import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SpotlightCard from './SpotlightCard';
import TiltCard from './TiltCard';
import './Projects.css';

const projectsData = [
  {
    id: 'email-sender-mcp',
    title: 'Prompt2Mail - AI Email MCP',
    description: 'Transform short prompts into polished emails with attachments. FastMCP server with Gemini AI and Gmail SMTP.',
    tech: ['Python', 'FastMCP', 'Gemini AI', 'SMTP', 'MIME'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '📧',
    featured: true,
    category: 'AI/Python',
  },
  {
    id: 'adaptive-quiz-engine',
    title: 'Adaptive Quiz Engine',
    description: 'AI-powered learning platform using IRT algorithms and Google Gemini for personalized quizzes.',
    tech: ['Flutter', 'Firebase', 'AI/ML', 'IRT', 'RAG'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '🎓',
    featured: true,
    category: 'Flutter',
  },
  {
    id: 'probuddy',
    title: 'ProBuddy',
    description: 'Swipe-based professional networking app for developers with real-time messaging.',
    tech: ['Flutter', 'Firebase', 'Firestore', 'Provider'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '🤝',
    featured: true,
    category: 'Flutter',
  },
  {
    id: 'scribble-game',
    title: 'Scribble Game',
    description: 'Real-time multiplayer drawing and guessing game with live synchronization.',
    tech: ['Flutter', 'Firebase', 'Real-time Sync', 'Multiplayer'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: '�',
    featured: true,
    category: 'Flutter',
  },
   {
    id: 'codeforces-tracker',
    title: 'Codeforces Problem Tracker',
    description: 'Analytics dashboard for tracking competitive programming progress with smart problem recommendations.',
    tech: ['JavaScript', 'Chart.js', 'Codeforces API'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '📊',
    featured: true,
    category: 'Web',
  },
  {
    id: 'attendance-management',
    title: 'Attendance Manager',
    description: 'Employee attendance tracking with automated salary calculations and reporting.',
    tech: ['Flutter', 'SQLite', 'Provider', 'Calendar'],
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    icon: '�',
    featured: true,
    category: 'Flutter',
  },
  {
    id: 'journey-journal',
    title: 'Journey Journal',
    description: 'Interactive map-based travel diary with multimedia photo and video support.',
    tech: ['Flutter', 'Hive DB', 'Maps', 'Geocoding'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: '�️',
    featured: true,
    category: 'Flutter',
  },
  {
    id: 'gemini-ai-chatbot',
    title: 'Gemini AI Chatbot',
    description: 'Feature-rich interactive chatbot powered by Google Gemini AI with advanced markdown rendering and conversation management.',
    tech: ['React', 'Gemini API', 'Markdown', 'LocalStorage'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '🤖',
    featured: true,
    category: 'Web',
  },
];

const categories = ['All', 'Flutter', 'Web', 'AI/Python'];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Browse by technology stack</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="category-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
              <span className="category-count">
                {category === 'All' 
                  ? projectsData.length 
                  : projectsData.filter(p => p.category === category).length}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <SpotlightCard className={`project-card ${project.featured ? 'featured' : ''}`}>
                <TiltCard>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="project-header" style={{ background: project.gradient }}>
                      {project.featured && <span className="featured-badge">Featured</span>}
                      <div className="project-icon">{project.icon}</div>
                    </div>
                    <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.featured ? (
                        <Link to={`/projects/${project.id}`} className="project-btn">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          View Details
                        </Link>
                      ) : (
                        <button className="project-btn" disabled>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
                </TiltCard>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
