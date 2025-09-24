'use client';

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

interface CartItemData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 29990000,
      quantity: 1,
      variant: 'Màu: Titanium Natural | Dung lượng: 128GB',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 19990000,
      quantity: 2,
      variant: 'Màu: Titanium Black | Dung lượng: 256GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Xiaomi 14',
      price: 15990000,
      quantity: 1,
      variant: 'Màu: Black | Dung lượng: 128GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
      setCartItems([]);
    }
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      alert('Mã giảm giá đã được áp dụng! Bạn được giảm 10% cho đơn hàng.');
    } else if (couponCode === 'WELCOME') {
      alert('Mã giảm giá đã được áp dụng! Bạn được giảm 2 triệu đồng cho đơn hàng.');
    } else {
      alert('Mã giảm giá không hợp lệ. Vui lòng kiểm tra lại.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) - 2000000;
    alert(`Chuyển đến trang thanh toán với tổng đơn hàng: ${total.toLocaleString('vi-VN')}đ`);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 2000000;
  const total = subtotal - discount;

  return (
    <>
      <Header activePage="cart" />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Giỏ hàng</h1>
          <p>Kiểm tra và thanh toán đơn hàng của bạn</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="cart-content">
        <div className="container">
          <div className="cart-container">
            {/* Cart Items */}
            <div className="cart-items">
              <div className="cart-header">
                <h2>Sản phẩm trong giỏ hàng</h2>
                <button className="btn btn-outline" onClick={clearCart}>Xóa tất cả</button>
              </div>

              {cartItems.length > 0 ? (
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      variant={item.variant}
                      image={item.image}
                      onQuantityChange={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-cart">
                  <div className="empty-cart-content">
                    <i className="fas fa-shopping-cart"></i>
                    <h3>Giỏ hàng trống</h3>
                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <Link href="/products" className="btn btn-primary">Tiếp tục mua sắm</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-card">
                <h3>Tóm tắt đơn hàng</h3>
                
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                
                <div className="summary-row">
                  <span>Giảm giá:</span>
                  <span className="discount">-{formatPrice(discount)}</span>
                </div>
                
                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="coupon-section">
                  <h4>Mã giảm giá</h4>
                  <div className="coupon-input">
                    <input 
                      type="text" 
                      placeholder="Nhập mã giảm giá" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="btn btn-outline" onClick={applyCoupon}>Áp dụng</button>
                  </div>
                </div>

                <div className="checkout-actions">
                  <button className="btn btn-primary btn-large" onClick={handleCheckout}>
                    <i className="fas fa-credit-card"></i>
                    Thanh toán
                  </button>
                  <Link href="/products" className="btn btn-outline btn-large">
                    <i className="fas fa-arrow-left"></i>
                    Tiếp tục mua sắm
                  </Link>
                </div>

                <div className="payment-methods">
                  <h4>Phương thức thanh toán</h4>
                  <div className="payment-options">
                    <div className="payment-option">
                      <i className="fas fa-credit-card"></i>
                      <span>Thẻ tín dụng</span>
                    </div>
                    <div className="payment-option">
                      <i className="fas fa-university"></i>
                      <span>Chuyển khoản</span>
                    </div>
                    <div className="payment-option">
                      <i className="fas fa-money-bill-wave"></i>
                      <span>COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="recommended-products">
        <div className="container">
          <h2 className="section-title">Sản phẩm gợi ý</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <Image 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="OPPO Find X7" 
                  width={280}
                  height={250}
                />
              </div>
              <div className="product-info">
                <h3>OPPO Find X7</h3>
                <p className="product-description">Camera Hasselblad, sạc nhanh 100W</p>
                <div className="product-price">
                  <span className="current-price">12.990.000đ</span>
                </div>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <Image 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Vivo X100" 
                  width={280}
                  height={250}
                />
              </div>
              <div className="product-info">
                <h3>Vivo X100</h3>
                <p className="product-description">MediaTek Dimensity 9300, camera ZEISS</p>
                <div className="product-price">
                  <span className="current-price">11.990.000đ</span>
                </div>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <Image 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Samsung Galaxy A55" 
                  width={280}
                  height={250}
                />
              </div>
              <div className="product-info">
                <h3>Samsung Galaxy A55</h3>
                <p className="product-description">Exynos 1480, camera 50MP</p>
                <div className="product-price">
                  <span className="current-price">17.990.000đ</span>
                </div>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <Image 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Xiaomi Redmi Note 13" 
                  width={280}
                  height={250}
                />
              </div>
              <div className="product-info">
                <h3>Xiaomi Redmi Note 13</h3>
                <p className="product-description">Snapdragon 685, camera 108MP</p>
                <div className="product-price">
                  <span className="current-price">8.990.000đ</span>
                </div>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
