'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import type { AdminAccount, AdminRole } from '@/types';
import Alert from '@/components/Alert';
import { adminAccounts as DEFAULT_ADMINS } from "@/data/adminAccounts";

export default function AdminAccounts() {
  const { currentAdmin } = useAdminGuard();
  const [admins, setAdmins] = useLocalStorage<AdminAccount[]>(
    'adminAccounts',
    DEFAULT_ADMINS,
  );
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddAdmin = () => {
    setEditingAdmin(null);
    setShowAdminForm(true);
  };

  const handleEditAdmin = (admin: AdminAccount) => {
    setEditingAdmin(admin);
    setShowAdminForm(true);
  };

  const handleDeleteAdmin = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản admin này?')) {
      setAdmins(prev => prev.filter(a => a.id !== id));
      showAlertMessage('Đã xóa tài khoản admin thành công!');
    }
  };

  const handleSaveAdmin = (adminData: Omit<AdminAccount, 'id' | 'createdAt' | 'lastLogin'> & { password?: string }) => {
    if (editingAdmin) {
      // Edit existing admin
      setAdmins(prev => prev.map(a =>
        a.id === editingAdmin.id
          ? { ...a, ...adminData, password: adminData.password ?? a.password }
          : a
      ));
      showAlertMessage('Đã cập nhật tài khoản admin thành công!');
    } else {
      // Add new admin
      const newAdmin: AdminAccount = {
        id: admins.length ? Math.max(...admins.map(a => a.id)) + 1 : 1,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role as AdminRole,
        isActive: adminData.isActive,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: null,
        password: adminData.password
      };
      setAdmins(prev => [...prev, newAdmin]);
      showAlertMessage('Đã thêm tài khoản admin mới thành công!');
    }
    setShowAdminForm(false);
    setEditingAdmin(null);
  };

  const toggleAdminStatus = (id: number) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
    ));
    
    const admin = admins.find(a => a.id === id);
    showAlertMessage(`${admin?.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'} tài khoản admin thành công!`);
  };

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleLabel = (role: AdminRole) => {
    const roleLabels: Record<AdminRole, string> = {
      super_admin: 'Super Admin',
      product_manager: 'Quản lý sản phẩm',
      order_manager: 'Quản lý đơn hàng',
      customer_manager: 'Quản lý khách hàng'
    };
    return roleLabels[role];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (!currentAdmin) {
    return (
      <>
        <Header />
        <section className="page-header">
          <div className="container">
            <h1>Admin - Quản lý tài khoản</h1>
            <p>Bạn cần đăng nhập để truy cập trang này</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <section className="page-header">
        <div className="container">
          <h1>Quản lý tài khoản admin</h1>
          <p>Quản lý tài khoản quản trị viên của hệ thống</p>
        </div>
      </section>

      <section className="admin-accounts">
        <div className="container">
          {/* Filters and Actions */}
          <div className="accounts-header">
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm admin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            
            <button className="btn btn-primary" onClick={handleAddAdmin}>
              <i className="fas fa-plus"></i>
              Thêm admin mới
            </button>
          </div>

          {/* Admins Table */}
          <div className="admins-table">
            <div className="table-header">
              <div className="table-cell">Tài khoản</div>
              <div className="table-cell">Vai trò</div>
              <div className="table-cell">Thông tin</div>
              <div className="table-cell">Trạng thái</div>
              <div className="table-cell">Thao tác</div>
            </div>
            
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="table-row">
                <div className="table-cell">
                  <div className="admin-info">
                    <div className="admin-avatar">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="admin-details">
                      <h4>{admin.name}</h4>
                      <p>{admin.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="table-cell">
                  <span className="role-badge">
                    {getRoleLabel(admin.role)}
                  </span>
                </div>
                
                <div className="table-cell">
                  <div className="admin-stats">
                    <div className="stat-item">
                      <span className="stat-label">Tạo:</span>
                      <span className="stat-value">{formatDate(admin.createdAt)}</span>
                    </div>
                    {admin.lastLogin && (
                      <div className="stat-item">
                        <span className="stat-label">Đăng nhập cuối:</span>
                        <span className="stat-value">{formatDate(admin.lastLogin)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="table-cell">
                  <span className={`status-badge ${admin.isActive ? 'active' : 'inactive'}`}>
                    {admin.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                  </span>
                </div>
                
                <div className="table-cell">
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEditAdmin(admin)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className={`btn btn-sm ${admin.isActive ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => toggleAdminStatus(admin.id)}
                      title={admin.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    >
                      <i className={`fas fa-${admin.isActive ? 'ban' : 'check'}`}></i>
                    </button>
                    {admin.id !== 1 && ( // Không cho phép xóa super admin
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAdmins.length === 0 && (
            <div className="no-admins">
              <i className="fas fa-user-shield"></i>
              <h3>Không tìm thấy admin nào</h3>
              <p>Thử thay đổi từ khóa tìm kiếm hoặc thêm admin mới</p>
            </div>
          )}
        </div>
      </section>

      {/* Admin Form Modal */}
      {showAdminForm && (
        <AdminForm 
          admin={editingAdmin}
          onSave={handleSaveAdmin}
          onCancel={() => {
            setShowAdminForm(false);
            setEditingAdmin(null);
          }}
        />
      )}

      <Footer />
    </>
  );
}

// Admin Form Component
function AdminForm({ admin, onSave, onCancel }: { admin: AdminAccount | null; onSave: (data: { name: string; email: string; password?: string; role: AdminRole; isActive: boolean }) => void; onCancel: () => void; }) {
  const [formData, setFormData] = useState<{ 
    name: string; 
    email: string; 
    password?: string; 
    role: AdminRole; 
    isActive: boolean; 
  }>({
    name: admin?.name || '',
    email: admin?.email || '',
    password: '',
    role: (admin?.role as AdminRole) || 'product_manager',
    isActive: admin?.isActive ?? true
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push('Tên admin là bắt buộc');
    }

    if (!formData.email.trim()) {
      newErrors.push('Email là bắt buộc');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Email không hợp lệ');
    }

    if (!admin && !formData.password) {
      newErrors.push('Mật khẩu là bắt buộc');
    } else if (formData.password && formData.password.length < 6) {
      newErrors.push('Mật khẩu phải có ít nhất 6 ký tự');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const adminData = { ...formData } as { name: string; email: string; password?: string; role: AdminRole; isActive: boolean };
    if (admin && !formData.password) {
      // Nếu đang edit và không nhập mật khẩu mới, giữ nguyên mật khẩu cũ
      delete adminData.password;
    }

    onSave(adminData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{admin ? 'Chỉnh sửa tài khoản admin' : 'Thêm tài khoản admin mới'}</h2>
          <button className="close-btn" onClick={onCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {errors.length > 0 && (
          <Alert type="error" message={errors.join(', ')} />
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Tên admin *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên admin"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email admin"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Mật khẩu {!admin && '*'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={admin ? "Để trống nếu không muốn đổi mật khẩu" : "Nhập mật khẩu (ít nhất 6 ký tự)"}
              required={!admin}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Vai trò *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="product_manager">Quản lý sản phẩm</option>
              <option value="order_manager">Quản lý đơn hàng</option>
              <option value="customer_manager">Quản lý khách hàng</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <span>Tài khoản hoạt động</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {admin ? 'Cập nhật' : 'Thêm admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
