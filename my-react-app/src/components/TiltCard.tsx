import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import './TiltCard.css';

interface TiltCardProps {
  children: ReactNode;
  tiltDegree?: number;
}

const TiltCard = ({ children, tiltDegree = 15 }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -tiltDegree;
    const rotateYValue = ((x - centerX) / centerX) * tiltDegree;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="tilt-card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
