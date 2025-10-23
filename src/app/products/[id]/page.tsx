'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import WishlistButton from "@/components/WishlistButton";
import Alert from "@/components/Alert";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('128GB - Titanium Natural');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const [cartItems, setCartItems] = useLocalStorage<any[]>('cart', []);

  // formatter an toàn cho VND
  const formatPriceSafe = (price: number) => formatCurrency(price);

  // Mock product data - trong thực tế sẽ fetch từ API
  const product = {
    id: parseInt(params.id),
    name: 'iPhone 15 Pro',
    description: 'iPhone 15 Pro được trang bị chip A17 Pro mạnh mẽ nhất từ Apple, camera 48MP với khả năng chụp ảnh chuyên nghiệp, màn hình Super Retina XDR 6.1 inch với ProMotion 120Hz. Thiết kế từ titanium cao cấp, chống nước IP68 và sạc nhanh 20W.',
    price: 29990000,
    oldPrice: 32990000,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    brand: 'Apple',
    category: 'Smartphone',
    inStock: true,
    badge: 'Mới',
    variants: [
      { id: '128gb-natural', name: '128GB - Titanium Natural', price: 29990000 },
      { id: '256gb-natural', name: '256GB - Titanium Natural', price: 32990000 },
      { id: '512gb-natural', name: '512GB - Titanium Natural', price: 37990000 },
      { id: '128gb-blue', name: '128GB - Titanium Blue', price: 29990000 },
      { id: '256gb-blue', name: '256GB - Titanium Blue', price: 32990000 }
    ],
    specifications: {
      'Màn hình': '6.1 inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Camera chính': '48MP',
      'Camera selfie': '12MP',
      'RAM': '8GB',
      'Dung lượng': '128GB/256GB/512GB',
      'Pin': '3274 mAh',
      'Sạc': '20W có dây, 15W không dây',
      'Kết nối': '5G, WiFi 6E, Bluetooth 5.3',
      'Chống nước': 'IP68',
      'Hệ điều hành': 'iOS 17'
    },
    features: [
      'Chip A17 Pro mạnh mẽ nhất',
      'Camera 48MP với zoom 3x',
      'Thiết kế titanium cao cấp',
      'Màn hình ProMotion 120Hz',
      'Chống nước IP68',
      'Sạc nhanh 20W'
    ]
  };

  // đổi sang formatter an toàn cho mọi hiển thị giá
  const formatPrice = (price: number) => formatPriceSafe(price);

  const handleAddToCart = () => {
    const selectedVariantData = product.variants.find(v => v.name === selectedVariant);
    
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: selectedVariantData?.price || product.price,
      quantity: quantity,
      variant: selectedVariant,
      image: product.images[0]
    };

    setCartItems(prev => [...prev, cartItem]);
    setAlertMessage('Đã thêm sản phẩm vào giỏ hàng!');
    setShowAlert(true);
    
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to cart
    window.location.href = '/cart';
  };

  const selectedVariantData = product.variants.find(v => v.name === selectedVariant);

  return (
    <>
      <Header />
      
      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      {/* Breadcrumb */}
      <section className="breadcrumb">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Trang chủ</Link>
            <span>/</span>
            <Link href="/products">Sản phẩm</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-container">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <Image 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  width={500}
                  height={500}
                  priority
                />
                {product.badge && (
                  <div className="product-badge">{product.badge}</div>
                )}
              </div>
              
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="brand">{product.brand}</p>
              
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <i key={star} className="fas fa-star active"></i>
                  ))}
                </div>
                <span className="rating-text">(4.8/5 - 156 đánh giá)</span>
              </div>

              <div className="price-section">
                <div className="current-price">{formatPriceSafe(selectedVariantData?.price || product.price)}</div>
                {product.oldPrice && (
                  <div className="old-price">{formatPriceSafe(product.oldPrice)}</div>
                )}
                <div className="discount">
                  {product.oldPrice && (
                    <span>Tiết kiệm {formatPriceSafe(product.oldPrice - (selectedVariantData?.price || product.price))}</span>
                  )}
                </div>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Variants */}
              <div className="variants">
                <h3>Chọn phiên bản:</h3>
                <div className="variant-options">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`variant-option ${selectedVariant === variant.name ? 'selected' : ''}`}
                      onClick={() => setSelectedVariant(variant.name)}
                    >
                      <div className="variant-name">{variant.name}</div>
                      <div className="variant-price">{formatPriceSafe(variant.price)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="quantity-section">
                <h3>Số lượng:</h3>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="10"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
                  <i className="fas fa-shopping-cart"></i>
                  Thêm vào giỏ hàng
                </button>
                <button className="btn btn-secondary btn-large" onClick={handleBuyNow}>
                  <i className="fas fa-bolt"></i>
                  Mua ngay
                </button>
                <WishlistButton 
                  productId={product.id}
                  productName={product.name}
                  productPrice={selectedVariantData?.price || product.price}
                  productImage={product.images[0]}
                />
              </div>

              {/* Features */}
              <div className="product-features">
                <h3>Tính năng nổi bật:</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="specifications-section">
            <h2>Thông số kỹ thuật</h2>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <ProductReviews 
            productId={product.id} 
            productName={product.name} 
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

