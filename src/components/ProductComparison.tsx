'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/utils';
import Badge from './Badge';

interface ProductComparisonProps {
  onClose: () => void;
}

export default function ProductComparison({ onClose }: ProductComparisonProps) {
  const [comparisonItems, setComparisonItems] = useState<Product[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('comparison') || '[]');
    setComparisonItems(items);
  }, []);

  const removeFromComparison = (productId: number) => {
    const updatedItems = comparisonItems.filter(item => item.id !== productId);
    setComparisonItems(updatedItems);
    localStorage.setItem('comparison', JSON.stringify(updatedItems));
  };

  const clearComparison = () => {
    setComparisonItems([]);
    localStorage.removeItem('comparison');
  };

  if (comparisonItems.length === 0) {
    return (
      <div className="comparison-modal">
        <div className="comparison-content">
          <div className="comparison-header">
            <h2>So sánh sản phẩm</h2>
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="empty-comparison">
            <i className="fas fa-balance-scale"></i>
            <h3>Chưa có sản phẩm để so sánh</h3>
            <p>Thêm ít nhất 2 sản phẩm để bắt đầu so sánh</p>
          </div>
        </div>
      </div>
    );
  }

  const comparisonSpecs = [
    { key: 'name', label: 'Tên sản phẩm' },
    { key: 'price', label: 'Giá' },
    { key: 'brand', label: 'Thương hiệu' },
    { key: 'description', label: 'Mô tả' },
    { key: 'badge', label: 'Trạng thái' },
    { key: 'inStock', label: 'Tình trạng kho' }
  ];

  return (
    <div className="comparison-modal">
      <div className="comparison-content">
        <div className="comparison-header">
          <h2>So sánh sản phẩm ({comparisonItems.length})</h2>
          <div className="comparison-actions">
            <button className="btn btn-outline" onClick={clearComparison}>
              Xóa tất cả
            </button>
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="comparison-table">
          <div className="comparison-specs">
            {comparisonSpecs.map((spec) => (
              <div key={spec.key} className="spec-row">
                <div className="spec-label">{spec.label}</div>
                {comparisonItems.map((product) => (
                  <div key={`${spec.key}-${product.id}`} className="spec-value">
                    {spec.key === 'price' ? formatPrice(product.price) :
                     spec.key === 'badge' ? (product.badge ? <Badge text={product.badge} type="success" /> : '-') :
                     spec.key === 'inStock' ? (product.inStock ? 'Còn hàng' : 'Hết hàng') :
                     product[spec.key as keyof Product] || '-'}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="comparison-products">
            {comparisonItems.map((product) => (
              <div key={product.id} className="comparison-product">
                <div className="product-header">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromComparison(product.id)}
                    title="Xóa khỏi so sánh"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="product-image">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={150}
                    height={150}
                  />
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <button className="btn btn-primary btn-small">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

