import { motion } from 'motion/react';
import './AnimatedText.css';

interface AnimatedTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', gradient = false }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`animated-text ${gradient ? 'gradient-text' : ''} ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          className="animated-word"
          variants={child}
          key={index}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
