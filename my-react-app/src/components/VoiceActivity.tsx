import './VoiceActivity.css';

interface VoiceActivityProps {
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function VoiceActivity({ color = '#667eea', size = 'medium' }: VoiceActivityProps) {
  const dotCount = 5;

  return (
    <div className={`voice-activity ${size}`}>
      {Array.from({ length: dotCount }).map((_, index) => (
        <div
          key={index}
          className="activity-dot"
          style={{
            backgroundColor: color,
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
