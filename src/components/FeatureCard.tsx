import { ReactNode } from "react";

// Interface cho props của FeatureCard
interface FeatureCardProps {
  icon: string;
  title: string;
  children: ReactNode; // Children prop để truyền nội dung động
  className?: string;
  variant?: 'default' | 'highlighted' | 'minimal';
  onClick?: () => void;
  disabled?: boolean;
}

// Component FeatureCard với children props
export default function FeatureCard({
  icon,
  title,
  children,
  className = "",
  variant = 'default',
  onClick,
  disabled = false
}: FeatureCardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'highlighted':
        return 'feature-card-highlighted';
      case 'minimal':
        return 'feature-card-minimal';
      default:
        return 'feature-card';
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`${getVariantClass()} ${className} ${disabled ? 'disabled' : ''} ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <div className="feature-content">
        {children}
      </div>
    </div>
  );
}

// Component con để tạo nội dung phức tạp
export function FeatureDescription({ children }: { children: ReactNode }) {
  return <div className="feature-description">{children}</div>;
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="feature-list">
      {items.map((item, index) => (
        <li key={index}>
          <i className="fas fa-check"></i>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function FeatureButton({ 
  text, 
  onClick, 
  variant = 'primary' 
}: { 
  text: string; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
