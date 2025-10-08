'use client';

import { useEffect } from 'react';
import { AlertType } from '@/types';

interface ToastProps {
  id: string;
  type: AlertType;
  message: string;
  duration?: number;
  onRemove: (id: string) => void;
}

export default function Toast({ 
  id, 
  type, 
  message, 
  duration = 3000, 
  onRemove 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

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

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      case 'info':
        return 'toast-info';
      default:
        return 'toast-info';
    }
  };

  return (
    <div className={`toast ${getTypeClass()}`}>
      <div className="toast-content">
        <div className="toast-icon">
          <i className={getIcon()}></i>
        </div>
        <div className="toast-message">
          <p>{message}</p>
        </div>
        <button className="toast-close" onClick={() => onRemove(id)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

// Toast Container
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: AlertType;
    message: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
