'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import CartItem from '@/components/CartItem';
import ContactForm from '@/components/ContactForm';
import FeatureCard, { FeatureDescription, FeatureList, FeatureButton } from '@/components/FeatureCard';

export default function ComponentsDemo() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 29990000,
      quantity: 1,
      variant: 'Titanium Natural | 128GB',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 19990000,
      quantity: 2,
      variant: 'Titanium Black | 256GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Chip A17 Pro mạnh mẽ, camera 48MP',
      price: 29990000,
      oldPrice: 32990000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      badge: 'Mới'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'AI tích hợp, màn hình Dynamic AMOLED 2X',
      price: 19990000,
      oldPrice: 22990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      badge: 'Hot'
    }
  ];

  const productDetailData = {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'Trải nghiệm sức mạnh vượt trội với chip A17 Bionic, camera chuyên nghiệp và thiết kế Titanium sang trọng.',
    basePrice: 29990000,
    oldPrice: 32990000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    badge: 'Mới',
    variants: [
      { color: 'Titanium Natural', storage: '128GB', price: 29990000 },
      { color: 'Titanium Blue', storage: '256GB', price: 32990000 },
      { color: 'Titanium White', storage: '512GB', price: 37990000 },
      { color: 'Titanium Black', storage: '1TB', price: 42990000 }
    ],
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A17 Bionic',
      camera: '48MP Main + 12MP Ultra Wide',
      battery: 'Up to 23 hours video playback',
      os: 'iOS 17'
    },
    features: [
      'Chip A17 Bionic mạnh mẽ',
      'Hệ thống camera Pro tiên tiến',
      'Màn hình Super Retina XDR với ProMotion',
      'Thiết kế Titanium bền bỉ',
      'Cổng USB-C'
    ]
  };

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };

  const handleProductDetailAddToCart = (productId: number, variant: any, quantity: number) => {
    console.log(`Added ${quantity} x product ${productId} with variant ${variant.color} ${variant.storage} to cart`);
  };

  const handleCartQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCartRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleContactSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    alert('Cảm ơn bạn đã liên hệ!');
  };

  return (
    <>
      <Header activePage="products" />
      
      <section className="page-header">
        <div className="container">
          <h1>Demo Components</h1>
          <p>Trang demo các components với các loại props khác nhau</p>
        </div>
      </section>

      <section className="components-demo">
        <div className="container">
          {/* ProductCard Demo */}
          <div className="demo-section">
            <h2>1. ProductCard Component (Props cơ bản)</h2>
            <div className="products-grid">
              {products.map(product => (
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
          </div>

          {/* FeatureCard Demo */}
          <div className="demo-section">
            <h2>2. FeatureCard Component (Children props)</h2>
            <div className="features-grid">
              <FeatureCard 
                icon="fas fa-shipping-fast" 
                title="Giao hàng nhanh"
                variant="default"
                onClick={() => console.log('Clicked shipping')}
              >
                <FeatureDescription>
                  Giao hàng miễn phí trong 24h cho đơn hàng trên 2 triệu đồng
                </FeatureDescription>
                <FeatureList items={[
                  "Giao hàng miễn phí toàn quốc",
                  "Đóng gói cẩn thận, an toàn",
                  "Theo dõi đơn hàng real-time"
                ]} />
              </FeatureCard>

              <FeatureCard 
                icon="fas fa-shield-alt" 
                title="Bảo hành chính hãng"
                variant="highlighted"
              >
                <FeatureDescription>
                  Bảo hành 12-24 tháng tùy sản phẩm từ nhà sản xuất
                </FeatureDescription>
                <FeatureButton 
                  text="Tìm hiểu thêm" 
                  onClick={() => console.log('Learn more about warranty')}
                />
              </FeatureCard>

              <FeatureCard 
                icon="fas fa-headset" 
                title="Hỗ trợ 24/7"
                variant="minimal"
              >
                <FeatureDescription>
                  Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ mọi lúc
                </FeatureDescription>
                <FeatureList items={[
                  "Hotline 24/7",
                  "Chat trực tuyến",
                  "Email hỗ trợ"
                ]} />
              </FeatureCard>
            </div>
          </div>

          {/* CartItem Demo */}
          <div className="demo-section">
            <h2>3. CartItem Component (Props và callbacks)</h2>
            <div className="cart-list">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  variant={item.variant}
                  image={item.image}
                  onQuantityChange={handleCartQuantityChange}
                  onRemove={handleCartRemove}
                />
              ))}
            </div>
          </div>

          {/* ProductDetail Demo */}
          <div className="demo-section">
            <h2>4. ProductDetail Component (Props phức tạp)</h2>
            <ProductDetail
              id={productDetailData.id}
              name={productDetailData.name}
              description={productDetailData.description}
              basePrice={productDetailData.basePrice}
              oldPrice={productDetailData.oldPrice}
              image={productDetailData.image}
              badge={productDetailData.badge}
              variants={productDetailData.variants}
              specs={productDetailData.specs}
              features={productDetailData.features}
              onAddToCart={handleProductDetailAddToCart}
            />
          </div>

          {/* ContactForm Demo */}
          <div className="demo-section">
            <h2>5. ContactForm Component (Form props)</h2>
            <div className="contact-form-demo">
              <ContactForm
                onSubmit={handleContactSubmit}
                onReset={() => console.log('Form reset')}
                loading={false}
                showNewsletter={true}
                requiredFields={['name', 'email', 'subject', 'message']}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
