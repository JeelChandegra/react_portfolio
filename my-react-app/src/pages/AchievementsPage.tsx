import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedText from '../components/AnimatedText';
import './AchievementsPage.css';

const certificatesData = [
  {
    title: 'Mission Blackout - 1st Runner Up',
    organization: 'Cyber Protectors',
    image: '/ctf1.jpeg',
    year: '2025',
    description: 'Ultimate Cyber Champion - Mission Blackout Cyber Treasure Hunt'
  },
 
  
   {
    title: 'Code Carnival 2025 - Participant',
    organization: 'Atmiya University',
    image: '/Hackathin_2.jpeg',
    year: '2025',
    description: 'A National Level Hackathon Code Carnival Season 2(36 Hours Hackathon) organized by Atmiya University'
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
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedCert(image);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

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
                  <div 
                    className="certificate-image-wrapper"
                    onClick={() => openModal(cert.image)}
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="certificate-image"
                    />
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

       
        
      </div>

      {/* Modal for full image view */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="certificate-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="certificate-modal-content"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                mass: 0.8
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
              <img src={selectedCert} alt="Certificate" className="modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsPage;
