interface BadgeProps {
  text: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Badge({ 
  text, 
  type = 'default', 
  size = 'medium',
  className = "" 
}: BadgeProps) {
  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'badge-success';
      case 'warning':
        return 'badge-warning';
      case 'error':
        return 'badge-error';
      case 'info':
        return 'badge-info';
      default:
        return 'badge-default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'badge-small';
      case 'large':
        return 'badge-large';
      default:
        return 'badge-medium';
    }
  };

  return (
    <span className={`badge ${getTypeClass()} ${getSizeClass()} ${className}`}>
      {text}
    </span>
  );
}
