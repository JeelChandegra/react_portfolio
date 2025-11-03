import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AnimatedText from './AnimatedText';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch('https://formsubmit.co/chandegrajeel@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('Message sent successfully! 🎉');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Failed to send. Please email me directly.');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('Failed to send. Please email me directly.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText text="Let's Connect" className="section-title" />
          <p className="section-subtitle">Get in touch for opportunities or just to say hi</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-cards">
            <SpotlightCard>
              <motion.a
                href="mailto:chandegrajeel@gmail.com"
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact-card-icon">📧</div>
                <h3>Email</h3>
                <p>chandegrajeel@gmail.com</p>
              </motion.a>
            </SpotlightCard>

            <SpotlightCard>
              <motion.a
                href="https://github.com/jeelchandegra"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact-card-icon"></div>
                <h3>GitHub</h3>
                <p>@jeelchandegra</p>
              </motion.a>
            </SpotlightCard>

            <SpotlightCard>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact-card-icon">💼</div>
                <h3>LinkedIn</h3>
                <p>Connect with me</p>
              </motion.a>
            </SpotlightCard>

            <SpotlightCard>
              <motion.div
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="contact-card-icon">📍</div>
                <h3>Location</h3>
                <p>Rajkot, India</p>
              </motion.div>
            </SpotlightCard>
          </div>

          {/* Contact Form */}
          <SpotlightCard>
            <motion.div
              className="form-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                <h3>Send a Message</h3>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="form-input form-textarea"
                />
                
                {status && (
                  <motion.div
                    className={`status-message ${status.includes('success') ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {status}
                  </motion.div>
                )}
                
                <MagneticButton>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8L15 8M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </MagneticButton>
              </form>
            </motion.div>
          </SpotlightCard>
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; 2025 Your Name. Built with React & Framer Motion</p>
      </footer>
    </section>
  );
};

export default Contact;
