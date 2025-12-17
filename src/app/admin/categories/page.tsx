'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import Alert from '@/components/Alert';
import { categories as DEFAULT_CATEGORIES } from "@/data/categories";
import { products as DEFAULT_PRODUCTS } from "@/data/products";
import type { Category, Product } from "@/types";

export default function AdminCategories() {
  const { currentAdmin } = useAdminGuard();
  const [categories, setCategories] = useLocalStorage<Category[]>(
    'categories',
    DEFAULT_CATEGORIES,
  );
  const [products] = useLocalStorage<Product[]>(
    'products',
    DEFAULT_PRODUCTS,
  );
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - trong thực tế sẽ fetch từ API

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này? Tất cả sản phẩm trong danh mục sẽ bị ảnh hưởng.')) {
      setCategories(prev => prev.filter(c => c.id !== id));
      showAlertMessage('Đã xóa danh mục thành công!');
    }
  };

  const handleSaveCategory = (categoryData: any) => {
    if (editingCategory) {
      // Edit existing category
      setCategories(prev => prev.map(c => 
        c.id === editingCategory.id ? { ...categoryData, id: editingCategory.id } : c
      ));
      showAlertMessage('Đã cập nhật danh mục thành công!');
    } else {
      // Add new category
      const newCategory = {
        ...categoryData,
        id: Math.max(...categories.map(c => c.id)) + 1,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
      showAlertMessage('Đã thêm danh mục mới thành công!');
    }
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const categoriesWithCount = categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.category === category.name).length,
  }));

  const filteredCategories = categoriesWithCount.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentAdmin) {
    return (
      <>
        <Header />
        <section className="page-header">
          <div className="container">
            <h1>Admin - Quản lý danh mục</h1>
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
          <h1>Quản lý danh mục</h1>
          <p>Quản lý danh mục sản phẩm của cửa hàng</p>
        </div>
      </section>

      <section className="admin-categories">
        <div className="container">
          {/* Filters and Actions */}
          <div className="categories-header">
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            
            <button className="btn btn-primary" onClick={handleAddCategory}>
              <i className="fas fa-plus"></i>
              Thêm danh mục mới
            </button>
          </div>

          {/* Categories Grid */}
          <div className="categories-grid">
            {filteredCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    width={200}
                    height={150}
                  />
                  <div className="category-overlay">
                    <span className={`status-badge ${category.isActive ? 'active' : 'inactive'}`}>
                      {category.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </div>
                </div>
                
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  
                  <div className="category-stats">
                    <div className="stat">
                      <i className="fas fa-box"></i>
                      <span>{category.productCount} sản phẩm</span>
                    </div>
                    <div className="stat">
                      <i className="fas fa-calendar"></i>
                      <span>Tạo: {new Date(category.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  
                  <div className="category-actions">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEditCategory(category)}
                    >
                      <i className="fas fa-edit"></i>
                      Sửa
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <i className="fas fa-trash"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="no-categories">
              <i className="fas fa-folder-open"></i>
              <h3>Không tìm thấy danh mục nào</h3>
              <p>Thử thay đổi từ khóa tìm kiếm hoặc thêm danh mục mới</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <CategoryForm 
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => {
            setShowCategoryForm(false);
            setEditingCategory(null);
          }}
        />
      )}

      <Footer />
    </>
  );
}

// Category Form Component
function CategoryForm({ category, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    image: category?.image || '',
    isActive: category?.isActive ?? true
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push('Tên danh mục là bắt buộc');
    }

    if (!formData.description.trim()) {
      newErrors.push('Mô tả danh mục là bắt buộc');
    }

    if (!formData.image.trim()) {
      newErrors.push('Link hình ảnh là bắt buộc');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{category ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
          <button className="close-btn" onClick={onCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {errors.length > 0 && (
          <Alert type="error" message={errors.join(', ')} />
        )}

        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="name">Tên danh mục *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên danh mục"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả danh mục *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả danh mục"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Link hình ảnh *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Nhập link hình ảnh"
              required
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <span>Danh mục hoạt động</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {category ? 'Cập nhật' : 'Thêm danh mục'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
