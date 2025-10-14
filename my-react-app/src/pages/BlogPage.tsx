import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Jetpack Compose',
    excerpt: 'Learn the fundamentals of building modern Android UIs with Jetpack Compose and declarative programming.',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    category: 'Tutorial',
    image: '📱'
  },
  {
    id: 2,
    title: 'MVVM Architecture Best Practices',
    excerpt: 'Comprehensive guide to implementing clean MVVM architecture in your Android applications.',
    date: 'Jan 10, 2025',
    readTime: '8 min read',
    category: 'Architecture',
    image: '🏗️'
  },
  {
    id: 3,
    title: 'Kotlin Coroutines Deep Dive',
    excerpt: 'Master asynchronous programming in Android with Kotlin Coroutines and Flow.',
    date: 'Dec 28, 2024',
    readTime: '10 min read',
    category: 'Kotlin',
    image: '⚡'
  },
  {
    id: 4,
    title: 'Material Design 3 in Android',
    excerpt: 'Implementing Material You design system with dynamic theming and modern components.',
    date: 'Dec 20, 2024',
    readTime: '6 min read',
    category: 'Design',
    image: '🎨'
  },
  {
    id: 5,
    title: 'Room Database Performance Tips',
    excerpt: 'Optimize your local database operations with Room for better app performance.',
    date: 'Dec 15, 2024',
    readTime: '7 min read',
    category: 'Database',
    image: '💾'
  },
  {
    id: 6,
    title: 'Android Testing Strategies',
    excerpt: 'Complete guide to unit testing, UI testing, and integration testing in Android apps.',
    date: 'Dec 10, 2024',
    readTime: '12 min read',
    category: 'Testing',
    image: '🧪'
  }
];

const BlogPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="page blog-page" ref={ref}>
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">Sharing knowledge and insights about Android development</p>
        </motion.div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link to={`/blog/${post.id}`} className="blog-link">
                <div className="blog-image">
                  <span className="blog-emoji">{post.image}</span>
                  <span className="blog-category">{post.category}</span>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
