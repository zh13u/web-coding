'use client';

import Image from "next/image";
import { SyntheticEvent, useState } from "react";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 240' role='img' aria-label='Placeholder'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230ea5e9'/%3E%3Cstop offset='100%25' stop-color='%236366f1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='240' rx='18' fill='url(%23g)'/%3E%3Crect x='98' y='24' width='124' height='192' rx='16' fill='%23111' stroke='%23222' stroke-width='3'/%3E%3Crect x='112' y='52' width='96' height='136' rx='12' fill='%23182'/%3E%3Ccircle cx='160' cy='38' r='4' fill='%23cbd5e1'/%3E%3Crect x='136' y='40' width='48' height='5' rx='2.5' fill='%23cbd5e1'/%3E%3Ccircle cx='160' cy='206' r='5' fill='%23cbd5e1'/%3E%3Ctext x='160' y='192' fill='%23e2e8f0' font-family='Arial, sans-serif' font-size='14' text-anchor='middle'%3EPhoneStore%3C/text%3E%3C/svg%3E";

// Interface cho props phức tạp của ProductDetail
interface ProductVariant {
  color: string;
  storage: string;
  price: number;
}

interface ProductSpecs {
  display: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
}

interface ProductDetailProps {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  variants: ProductVariant[];
  specs: ProductSpecs;
  features: string[];
  onAddToCart: (productId: number, variant: ProductVariant, quantity: number) => void;
  onBuyNow?: (productId: number, variant: ProductVariant, quantity: number) => void;
  onQuantityChange?: (quantity: number) => void;
  className?: string;
}

// Component ProductDetail với props phức tạp
export default function ProductDetail({
  id,
  name,
  description,
  basePrice,
  oldPrice,
  image,
  badge,
  variants,
  specs,
  features,
  onAddToCart,
  onQuantityChange,
  className = ""
}: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src !== FALLBACK_IMAGE) {
      img.src = FALLBACK_IMAGE;
      img.srcset = FALLBACK_IMAGE;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      if (onQuantityChange) {
        onQuantityChange(newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    onAddToCart(id, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(id, selectedVariant, quantity);
    } else {
      onAddToCart(id, selectedVariant, quantity);
    }
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className={`product-detail ${className}`}>
      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <Image 
              src={image} 
              alt={name} 
              width={500}
              height={500}
              onError={handleImageError}
            />
            {badge && (
              <div className="product-badge">{badge}</div>
            )}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{name}</h1>
          <p className="product-description">{description}</p>
          
          <div className="product-price">
            <span className="current-price">{formatPrice(selectedVariant.price)}</span>
            {oldPrice && (
              <span className="old-price">{formatPrice(oldPrice)}</span>
            )}
          </div>

          <div className="product-options">
            <div className="option-group">
              <label>Màu sắc:</label>
              <div className="color-options">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`color-option ${
                      selectedVariant.color === variant.color ? 'active' : ''
                    }`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Dung lượng:</label>
              <div className="storage-options">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`storage-option ${
                      selectedVariant.storage === variant.storage ? 'active' : ''
                    }`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    {variant.storage}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Số lượng:</label>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  min="1" 
                  max="10"
                  className="quantity-input"
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                />
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart"></i>
            Thêm vào giỏ hàng
          </button>
          <button className="btn btn-outline btn-large" onClick={handleBuyNow}>
            Mua ngay
          </button>

          <div className="product-features">
            <h3>Tính năng nổi bật:</h3>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-specs">
            <h3>Thông số kỹ thuật:</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Màn hình:</span>
                <span className="spec-value">{specs.display}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Chip xử lý:</span>
                <span className="spec-value">{specs.processor}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Camera:</span>
                <span className="spec-value">{specs.camera}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Pin:</span>
                <span className="spec-value">{specs.battery}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Hệ điều hành:</span>
                <span className="spec-value">{specs.os}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
