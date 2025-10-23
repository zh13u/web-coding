'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Alert from '@/components/Alert';

export default function AdminProducts() {
  const [currentUser] = useLocalStorage<any>('currentUser', null);
  const [products, setProducts] = useState<any[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');

  // Mock data - trong thực tế sẽ fetch từ API
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 29990000,
      oldPrice: 32990000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      brand: 'Apple',
      category: 'Smartphone',
      inStock: true,
      description: 'iPhone 15 Pro với chip A17 Pro mạnh mẽ nhất từ Apple'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 19990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      brand: 'Samsung',
      category: 'Smartphone',
      inStock: true,
      description: 'Samsung Galaxy S24 với AI tích hợp và camera chuyên nghiệp'
    },
    {
      id: 3,
      name: 'Xiaomi 14',
      price: 15990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      brand: 'Xiaomi',
      category: 'Smartphone',
      inStock: false,
      description: 'Xiaomi 14 với Snapdragon 8 Gen 3 và camera Leica'
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showAlertMessage('Đã xóa sản phẩm thành công!');
    }
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      // Edit existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      ));
      showAlertMessage('Đã cập nhật sản phẩm thành công!');
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1
      };
      setProducts(prev => [...prev, newProduct]);
      showAlertMessage('Đã thêm sản phẩm mới thành công!');
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'all' || product.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  if (!currentUser) {
    return (
      <>
        <Header />
        <section className="page-header">
          <div className="container">
            <h1>Admin - Quản lý sản phẩm</h1>
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
          <h1>Quản lý sản phẩm</h1>
          <p>Quản lý danh sách sản phẩm của cửa hàng</p>
        </div>
      </section>

      <section className="admin-products">
        <div className="container">
          {/* Filters and Actions */}
          <div className="products-header">
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              
              <select 
                value={filterBrand} 
                onChange={(e) => setFilterBrand(e.target.value)}
                className="brand-filter"
              >
                <option value="all">Tất cả thương hiệu</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="OPPO">OPPO</option>
              </select>
            </div>
            
            <button className="btn btn-primary" onClick={handleAddProduct}>
              <i className="fas fa-plus"></i>
              Thêm sản phẩm mới
            </button>
          </div>

          {/* Products Table */}
          <div className="products-table">
            <div className="table-header">
              <div className="table-cell">Hình ảnh</div>
              <div className="table-cell">Tên sản phẩm</div>
              <div className="table-cell">Thương hiệu</div>
              <div className="table-cell">Giá</div>
              <div className="table-cell">Trạng thái</div>
              <div className="table-cell">Thao tác</div>
            </div>
            
            {filteredProducts.map((product) => (
              <div key={product.id} className="table-row">
                <div className="table-cell">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={60}
                    height={60}
                  />
                </div>
                <div className="table-cell">
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                  </div>
                </div>
                <div className="table-cell">{product.brand}</div>
                <div className="table-cell">
                  <div className="price-info">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                </div>
                <div className="table-cell">
                  <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </div>
                <div className="table-cell">
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEditProduct(product)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <i className="fas fa-box-open"></i>
              <h3>Không tìm thấy sản phẩm nào</h3>
              <p>Thử thay đổi bộ lọc hoặc thêm sản phẩm mới</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm 
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <Footer />
    </>
  );
}

// Product Form Component
function ProductForm({ product, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    oldPrice: product?.oldPrice || '',
    image: product?.image || '',
    brand: product?.brand || 'Apple',
    category: product?.category || 'Smartphone',
    inStock: product?.inStock ?? true,
    description: product?.description || ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) {
      newErrors.push('Tên sản phẩm là bắt buộc');
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.push('Giá sản phẩm phải lớn hơn 0');
    }

    if (!formData.image.trim()) {
      newErrors.push('Link hình ảnh là bắt buộc');
    }

    if (!formData.description.trim()) {
      newErrors.push('Mô tả sản phẩm là bắt buộc');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseInt(formData.price),
      oldPrice: formData.oldPrice ? parseInt(formData.oldPrice) : undefined
    };

    onSave(productData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button className="close-btn" onClick={onCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {errors.length > 0 && (
          <Alert type="error" message={errors.join(', ')} />
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Giá bán *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Nhập giá bán"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="oldPrice">Giá cũ</label>
              <input
                type="number"
                id="oldPrice"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                placeholder="Nhập giá cũ (nếu có)"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Thương hiệu *</label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="OPPO">OPPO</option>
                <option value="Vivo">Vivo</option>
                <option value="OnePlus">OnePlus</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Danh mục *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Accessories">Phụ kiện</option>
              </select>
            </div>
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
            <label htmlFor="description">Mô tả sản phẩm *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
              />
              <span>Còn hàng</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {product ? 'Cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
