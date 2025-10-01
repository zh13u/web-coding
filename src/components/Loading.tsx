interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Loading({ 
  message = "Đang tải...", 
  size = 'medium',
  className = "" 
}: LoadingProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'loading-small';
      case 'large':
        return 'loading-large';
      default:
        return 'loading-medium';
    }
  };

  return (
    <div className={`loading-container ${getSizeClass()} ${className}`}>
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
}
