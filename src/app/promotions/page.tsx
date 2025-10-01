'use client';

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  originalPrice?: number;
  salePrice?: number;
  validUntil: string;
  type: 'flash' | 'combo' | 'cashback' | 'gift';
  isActive: boolean;
}

export default function Promotions() {
  const [selectedType, setSelectedType] = useState('all');

  const promotions: Promotion[] = [
    {
      id: 1,
      title: "FLASH SALE iPhone 15 Pro",
      description: "Giảm giá sốc iPhone 15 Pro chỉ trong 24h. Số lượng có hạn!",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      discount: "-15%",
      originalPrice: 32990000,
      salePrice: 28041500,
      validUntil: "31/12/2024",
      type: 'flash',
      isActive: true
    },
    {
      id: 2,
      title: "Combo Samsung Galaxy S24 + Phụ kiện",
      description: "Mua Galaxy S24 nhận kèm tai nghe Galaxy Buds Pro và ốp lưng chính hãng",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      discount: "Combo",
      validUntil: "25/12/2024",
      type: 'combo',
      isActive: true
    },
    {
      id: 3,
      title: "Hoàn tiền 2 triệu cho đơn hàng trên 20 triệu",
      description: "Mua điện thoại trên 20 triệu được hoàn tiền 2 triệu vào tài khoản",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      discount: "2M",
      validUntil: "28/12/2024",
      type: 'cashback',
      isActive: true
    },
    {
      id: 4,
      title: "Tặng kèm ốp lưng và dán màn hình",
      description: "Mua bất kỳ điện thoại nào đều được tặng kèm ốp lưng và dán màn hình",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      discount: "Quà tặng",
      validUntil: "30/12/2024",
      type: 'gift',
      isActive: true
    },
    {
      id: 5,
      title: "FLASH SALE Xiaomi 14 Ultra",
      description: "Giảm giá 20% cho Xiaomi 14 Ultra chỉ trong ngày hôm nay",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      discount: "-20%",
      originalPrice: 22990000,
      salePrice: 18392000,
      validUntil: "20/12/2024",
      type: 'flash',
      isActive: false
    },
    {
      id: 6,
      title: "Combo OPPO Find X7 + Sạc nhanh",
      description: "Mua OPPO Find X7 nhận kèm sạc nhanh 100W và cáp USB-C",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      discount: "Combo",
      validUntil: "22/12/2024",
      type: 'combo',
      isActive: true
    }
  ];

  const promotionTypes = [
    { value: 'all', label: 'Tất cả', icon: 'fas fa-fire' },
    { value: 'flash', label: 'Flash Sale', icon: 'fas fa-bolt' },
    { value: 'combo', label: 'Combo', icon: 'fas fa-gift' },
    { value: 'cashback', label: 'Hoàn tiền', icon: 'fas fa-money-bill-wave' },
    { value: 'gift', label: 'Quà tặng', icon: 'fas fa-gift' }
  ];

  const filteredPromotions = selectedType === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.type === selectedType);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const getTypeIcon = (type: string) => {
    const promoType = promotionTypes.find(t => t.value === type);
    return promoType ? promoType.icon : 'fas fa-tag';
  };

  const getTypeLabel = (type: string) => {
    const promoType = promotionTypes.find(t => t.value === type);
    return promoType ? promoType.label : type;
  };

  return (
    <>
      <Header activePage="promotions" />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Khuyến mãi đặc biệt</h1>
          <p>Những ưu đãi hấp dẫn nhất dành cho khách hàng PhoneStore</p>
        </div>
      </section>

      {/* Type Filter */}
      <section className="promotion-filter">
        <div className="container">
          <div className="filter-buttons">
            {promotionTypes.map((type) => (
              <button
                key={type.value}
                className={`filter-btn ${selectedType === type.value ? 'active' : ''}`}
                onClick={() => setSelectedType(type.value)}
              >
                <i className={type.icon}></i>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="promotions-content">
        <div className="container">
          <div className="promotions-grid">
            {filteredPromotions.map((promotion) => (
              <div key={promotion.id} className={`promotion-card ${!promotion.isActive ? 'inactive' : ''}`}>
                <div className="promotion-image">
                  <Image 
                    src={promotion.image} 
                    alt={promotion.title} 
                    width={350}
                    height={200}
                  />
                  <div className="promotion-badge">
                    <i className={getTypeIcon(promotion.type)}></i>
                    {promotion.discount}
                  </div>
                  {!promotion.isActive && (
                    <div className="expired-overlay">
                      <span>Hết hạn</span>
                    </div>
                  )}
                </div>
                
                <div className="promotion-content">
                  <div className="promotion-type">
                    <i className={getTypeIcon(promotion.type)}></i>
                    {getTypeLabel(promotion.type)}
                  </div>
                  
                  <h3>{promotion.title}</h3>
                  <p>{promotion.description}</p>
                  
                  {promotion.originalPrice && promotion.salePrice && (
                    <div className="promotion-price">
                      <span className="original-price">{formatPrice(promotion.originalPrice)}</span>
                      <span className="sale-price">{formatPrice(promotion.salePrice)}</span>
                    </div>
                  )}
                  
                  <div className="promotion-meta">
                    <div className="valid-until">
                      <i className="fas fa-clock"></i>
                      <span>Có hiệu lực đến: {promotion.validUntil}</span>
                    </div>
                  </div>
                  
                  <button 
                    className={`btn ${promotion.isActive ? 'btn-primary' : 'btn-outline'}`}
                    disabled={!promotion.isActive}
                  >
                    {promotion.isActive ? 'Xem chi tiết' : 'Hết hạn'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="special-offers">
        <div className="container">
          <h2 className="section-title">Ưu đãi đặc biệt khác</h2>
          <div className="offers-grid">
            <div className="offer-item">
              <div className="offer-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Miễn phí vận chuyển</h3>
              <p>Đơn hàng từ 2 triệu đồng</p>
            </div>
            <div className="offer-item">
              <div className="offer-icon">
                <i className="fas fa-undo"></i>
              </div>
              <h3>Đổi trả miễn phí</h3>
              <p>Trong vòng 7 ngày</p>
            </div>
            <div className="offer-item">
              <div className="offer-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Bảo hành chính hãng</h3>
              <p>12-24 tháng</p>
            </div>
            <div className="offer-item">
              <div className="offer-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Tư vấn miễn phí</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
