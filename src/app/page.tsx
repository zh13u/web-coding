'use client';

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã đăng ký nhận tin tức!');
  };

  return (
    <>
      <Header activePage="home" />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Điện thoại thông minh tốt nhất</h1>
            <p className="hero-description">Khám phá bộ sưu tập điện thoại mới nhất với công nghệ tiên tiến và giá cả hợp lý</p>
            <div className="hero-buttons">
              <Link href="/products" className="btn btn-primary">Mua ngay</Link>
              <a href="#features" className="btn btn-secondary">Tìm hiểu thêm</a>
            </div>
          </div>
          <div className="hero-image">
        <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Điện thoại thông minh" 
              width={500}
              height={400}
          priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Tại sao chọn PhoneStore?</h2> 
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Giao hàng nhanh</h3>
              <p>Giao hàng miễn phí trong 24h cho đơn hàng trên 2 triệu đồng</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Bảo hành chính hãng</h3>
              <p>Bảo hành 12-24 tháng tùy sản phẩm từ nhà sản xuất</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ mọi lúc</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-undo"></i>
              </div>
              <h3>Đổi trả dễ dàng</h3>
              <p>Đổi trả trong 7 ngày nếu không hài lòng về sản phẩm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <Image 
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="iPhone 15 Pro" 
                  width={280}
                  height={250}
                />
                <div className="product-badge">Mới</div>
              </div>
              <div className="product-info">
                <h3>iPhone 15 Pro</h3>
                <p className="product-description">Chip A17 Pro mạnh mẽ, camera 48MP</p>
                <div className="product-price">
                  <span className="current-price">29.990.000đ</span>
                  <span className="old-price">32.990.000đ</span>
                </div>
                <button className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
          <Image
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Samsung Galaxy S24" 
                  width={280}
                  height={250}
                />
                <div className="product-badge">Hot</div>
              </div>
              <div className="product-info">
                <h3>Samsung Galaxy S24</h3>
                <p className="product-description">AI tích hợp, màn hình Dynamic AMOLED 2X</p>
                <div className="product-price">
                  <span className="current-price">19.990.000đ</span>
                  <span className="old-price">22.990.000đ</span>
                </div>
                <button className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
          <Image
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Xiaomi 14" 
                  width={280}
                  height={250}
                />
              </div>
              <div className="product-info">
                <h3>Xiaomi 14</h3>
                <p className="product-description">Snapdragon 8 Gen 3, camera Leica</p>
                <div className="product-price">
                  <span className="current-price">15.990.000đ</span>
                </div>
                <button className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ</button>
              </div>
            </div>

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
                <button className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ</button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/products" className="btn btn-outline">Xem tất cả sản phẩm</Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Đăng ký nhận tin tức</h2>
            <p>Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Nhập email của bạn" required />
              <button type="submit" className="btn btn-primary">Đăng ký</button>
            </form>
          </div>
    </div>
      </section>

      <Footer />
    </>
  );
}
