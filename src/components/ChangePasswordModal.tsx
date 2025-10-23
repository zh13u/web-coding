'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Alert from './Alert';
import Loading from './Loading';

interface ChangePasswordModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangePasswordModal({ onClose, onSuccess }: ChangePasswordModalProps) {
  const [currentUser, setCurrentUser] = useLocalStorage<any>('currentUser', null);
  const [users, setUsers] = useLocalStorage<any[]>('users', []);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.currentPassword) {
      newErrors.push('Mật khẩu hiện tại là bắt buộc');
    }

    if (!formData.newPassword) {
      newErrors.push('Mật khẩu mới là bắt buộc');
    } else if (formData.newPassword.length < 6) {
      newErrors.push('Mật khẩu mới phải có ít nhất 6 ký tự');
    }

    if (!formData.confirmPassword) {
      newErrors.push('Xác nhận mật khẩu là bắt buộc');
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.push('Mật khẩu xác nhận không khớp');
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.push('Mật khẩu mới phải khác mật khẩu hiện tại');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check current password
      if (formData.currentPassword !== currentUser?.password) {
        setErrors(['Mật khẩu hiện tại không đúng']);
        setIsLoading(false);
        return;
      }

      // Update password in users array
      const updatedUsers = users.map(user => 
        user.email === currentUser.email 
          ? { ...user, password: formData.newPassword }
          : user
      );
      setUsers(updatedUsers);

      // Update current user
      const updatedCurrentUser = { ...currentUser, password: formData.newPassword };
      setCurrentUser(updatedCurrentUser);

      onSuccess();
    } catch (error) {
      setErrors(['Có lỗi xảy ra, vui lòng thử lại']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Đổi mật khẩu</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {errors.length > 0 && (
          <Alert type="error" message={errors.join(', ')} />
        )}

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Mật khẩu hiện tại *</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Mật khẩu mới *</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Nhập lại mật khẩu mới"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <Loading size="small" /> : 'Đổi mật khẩu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

