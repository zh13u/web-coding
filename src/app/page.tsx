'use client';

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FeatureCard, { FeatureDescription, FeatureList, FeatureButton } from "@/components/FeatureCard";
import { useState } from "react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (productId: number) => {
    setCartCount(cartCount + 1);
    console.log(`Added product ${productId} to cart`);
  };

  // Dữ liệu sản phẩm demo
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Chip A17 Pro mạnh mẽ, camera 48MP',
      price: 29990000,
      oldPrice: 32990000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80',
      badge: 'Mới'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'AI tích hợp, màn hình Dynamic AMOLED 2X',
      price: 19990000,
      oldPrice: 22990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      badge: 'Hot'
    },
    {
      id: 3,
      name: 'Xiaomi 14',
      description: 'Snapdragon 8 Gen 3, camera Leica',
      price: 15990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'OPPO Find X7',
      description: 'Camera Hasselblad, sạc nhanh 100W',
      price: 12990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã đăng ký nhận tin!');
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
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80"
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
            <FeatureCard icon="fas fa-shipping-fast" title="Giao hàng nhanh">
              <FeatureDescription>
                Giao hàng miễn phí trong 24h cho đơn hàng trên 2 triệu đồng
              </FeatureDescription>
              <FeatureList items={[
                'Giao hàng miễn phí toàn quốc',
                'Đóng gói cẩn thận, an toàn',
                'Theo dõi đơn hàng real-time'
              ]} />
            </FeatureCard>

            <FeatureCard icon="fas fa-shield-alt" title="Bảo hành chính hãng" variant="highlighted">
              <FeatureDescription>
                Bảo hành 12-24 tháng tùy sản phẩm từ nhà sản xuất
              </FeatureDescription>
              <FeatureList items={[
                'Bảo hành chính hãng',
                'Hỗ trợ sửa chữa nhanh chóng',
                'Thay thế linh kiện chính hãng'
              ]} />
            </FeatureCard>

            <FeatureCard icon="fas fa-headset" title="Hỗ trợ 24/7" variant="minimal">
              <FeatureDescription>
                Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ mọi lúc
              </FeatureDescription>
              <FeatureButton text="Liên hệ ngay" onClick={() => (window.location.href = '/contact')} />
            </FeatureCard>

            <FeatureCard icon="fas fa-undo" title="Đổi trả dễ dàng">
              <FeatureDescription>
                Đổi trả trong 7 ngày nếu không hài lòng về sản phẩm
              </FeatureDescription>
              <FeatureList items={[
                'Đổi trả trong 7 ngày',
                'Hoàn tiền 100%',
                'Thủ tục đơn giản'
              ]} />
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                badge={product.badge}
                onAddToCart={handleAddToCart}
              />
            ))}
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

