import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import './TestimonialsPage.css';

const testimonialsData = [
  {
    name: 'John Smith',
    role: 'CTO at TechCorp',
    image: '👨‍💼',
    content: 'Outstanding Android developer! Delivered our app ahead of schedule with exceptional quality. The code is clean, well-documented, and follows best practices.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at AppStart',
    image: '👩‍💼',
    content: 'Transformed our vision into a beautiful, high-performance Android application. Great communication and technical expertise throughout the project.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CEO at MobileSolutions',
    image: '👨‍💻',
    content: 'Highly skilled in Kotlin and Jetpack Compose. Built a complex app with seamless animations and excellent user experience. Would definitely work with again!',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Startup Founder',
    image: '👩‍🚀',
    content: 'Incredible attention to detail and commitment to quality. Our app has received amazing feedback from users thanks to the excellent work done.',
    rating: 5
  },
  {
    name: 'David Wilson',
    role: 'Engineering Lead at DevHub',
    image: '👨‍🔧',
    content: 'Expert in Android architecture patterns. Helped refactor our codebase to MVVM which significantly improved our app performance and maintainability.',
    rating: 5
  },
  {
    name: 'Lisa Anderson',
    role: 'Project Manager at InnovateTech',
    image: '👩‍💻',
    content: 'Professional, reliable, and extremely talented. Met all deadlines and delivered features beyond our expectations. A pleasure to work with!',
    rating: 5
  }
];

const TestimonialsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="page testimonials-page" ref={ref}>
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Testimonials</h1>
          <p className="page-subtitle">What clients and colleagues say about my work</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="quote-mark">"</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
