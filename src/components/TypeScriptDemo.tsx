'use client';

import { useState } from 'react';
import { Product, ProductFilter, AlertType } from '@/types';
import { formatPrice, isValidEmail, debounce } from '@/utils';
import Alert from './Alert';
import Badge from './Badge';
import Loading from './Loading';

// Component demo để học TypeScript
export default function TypeScriptDemo() {
  // State với type rõ ràng
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Chip A17 Pro mạnh mẽ',
      price: 29990000,
      oldPrice: 32990000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      brand: 'iphone',
      badge: 'Mới',
      category: 'smartphone',
      inStock: true
    }
  ]);

  const [filter, setFilter] = useState<ProductFilter>({
    searchTerm: '',
    brandFilter: '',
    priceFilter: '',
    sortBy: 'name'
  });

  const [alertType, setAlertType] = useState<AlertType>('info');
  const [showLoading, setShowLoading] = useState<boolean>(false);

  // Function với type parameters
  const handleSearch = debounce((value: string) => {
    setFilter(prev => ({ ...prev, searchTerm: value }));
  }, 300);

  // Function với return type rõ ràng
  const validateEmail = (email: string): boolean => {
    return isValidEmail(email);
  };

  // Generic function example
  const getProductById = <T extends { id: number }>(items: T[], id: number): T | undefined => {
    return items.find(item => item.id === id);
  };

  // Event handler với proper typing
  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    
    if (validateEmail(email)) {
      setAlertType('success');
    } else {
      setAlertType('error');
    }
  };

  // Async function với proper typing
  const simulateApiCall = async (): Promise<string> => {
    setShowLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowLoading(false);
    return 'API call completed!';
  };

  return (
    <div className="typescript-demo">
      <h2>TypeScript Demo - Học TypeScript đơn giản</h2>
      
      {/* Demo Alert với type safety */}
      <Alert 
        type={alertType} 
        message={alertType === 'success' ? 'Email hợp lệ!' : 'Email không hợp lệ!'} 
      />

      {/* Demo Badge với type safety */}
      <div className="badge-demo">
        <h3>Badge Examples:</h3>
        <Badge text="Mới" type="success" size="small" />
        <Badge text="Hot" type="error" size="medium" />
        <Badge text="Giảm giá" type="warning" size="large" />
      </div>

      {/* Demo Loading */}
      {showLoading && <Loading message="Đang xử lý..." />}

      {/* Demo Product với type safety */}
      <div className="product-demo">
        <h3>Product Example:</h3>
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Giá: {formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p>Giá cũ: <span style={{textDecoration: 'line-through'}}>
                {formatPrice(product.oldPrice)}
              </span></p>
            )}
            <Badge text={product.badge || ''} type="success" />
          </div>
        ))}
      </div>

      {/* Demo Form với type safety */}
      <form onSubmit={handleEmailSubmit} className="demo-form">
        <h3>Email Validation Demo:</h3>
        <input 
          type="email" 
          name="email" 
          placeholder="Nhập email để test validation"
          required 
        />
        <button type="submit">Kiểm tra Email</button>
      </form>

      {/* Demo Search với debounce */}
      <div className="search-demo">
        <h3>Search Demo (với debounce):</h3>
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Demo Button với async function */}
      <div className="async-demo">
        <h3>Async Function Demo:</h3>
        <button onClick={simulateApiCall} disabled={showLoading}>
          {showLoading ? 'Đang xử lý...' : 'Gọi API Demo'}
        </button>
      </div>

      {/* Demo Generic Function */}
      <div className="generic-demo">
        <h3>Generic Function Demo:</h3>
        <p>Tìm sản phẩm ID = 1: {getProductById(products, 1)?.name || 'Không tìm thấy'}</p>
      </div>
    </div>
  );
}
