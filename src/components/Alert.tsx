import { ReactNode } from "react";

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function Alert({ 
  type, 
  message, 
  children, 
  onClose, 
  className = "" 
}: AlertProps) {
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <div className={`alert ${getAlertClass()} ${className}`}>
      <div className="alert-content">
        <div className="alert-icon">
          <i className={getIcon()}></i>
        </div>
        <div className="alert-message">
          <p>{message}</p>
          {children && <div className="alert-children">{children}</div>}
        </div>
        {onClose && (
          <button className="alert-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}
