'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Alert from '@/components/Alert';
import { formatCurrency } from '@/utils';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useLocalStorage<any[]>('wishlist', []);
  const [cartItems, setCartItems] = useLocalStorage<any[]>('cart', []);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setAlertMessage('Đã xóa sản phẩm khỏi danh sách yêu thích!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const addToCart = (product: any) => {
    const existingItem = cartItems.find((item: any) => item.productId === product.id && item.variant === product.variant);
    if (existingItem) {
      setCartItems(prev => prev.map((item: any) => item.productId === product.id && item.variant === product.variant
        ? { ...item, quantity: item.quantity + 1 }
        : item
      ));
    } else {
      const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        variant: product.variant || 'Mặc định',
        image: product.image,
      };
      setCartItems(prev => [...prev, cartItem]);
    }
    setAlertMessage('Đã thêm sản phẩm vào giỏ hàng!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <Header />

      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <section className="page-header">
        <div className="container">
          <h1>Danh sách yêu thích</h1>
          <p>Sản phẩm bạn đã thêm vào yêu thích</p>
        </div>
      </section>

      <section className="wishlist-content">
        <div className="container">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-content">
                <i className="fas fa-heart"></i>
                <h2>Danh sách yêu thích trống</h2>
                <p>Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
                <Link href="/products" className="btn btn-primary">
                  Khám phá sản phẩm
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="wishlist-header">
                <h2>Sản phẩm yêu thích ({wishlistItems.length})</h2>
                <button className="btn btn-outline" onClick={() => setWishlistItems([])}>
                  Xóa tất cả
                </button>
              </div>

              <div className="wishlist-grid">
                {wishlistItems.map((item: any) => (
                  <div key={item.id} className="wishlist-item">
                    <div className="item-image">
                      <Link href={`/products/${item.id}`}>
                        <Image src={item.image} alt={item.name} width={250} height={250} />
                      </Link>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Xóa khỏi yêu thích"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    <div className="item-info">
                      <h3>
                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                      </h3>
                      <div className="item-price">{formatCurrency(item.price)}</div>
                      {item.addedAt && (
                        <div className="item-added-date">Thêm vào: {new Date(item.addedAt).toLocaleDateString('vi-VN')}</div>
                      )}
                    </div>

                    <div className="item-actions">
                      <button className="btn btn-primary" onClick={() => addToCart(item)}>
                        <i className="fas fa-shopping-cart"></i>
                        Thêm vào giỏ hàng
                      </button>
                      <Link href={`/products/${item.id}`} className="btn btn-outline">
                        <i className="fas fa-eye"></i>
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Products */}
              <section className="recommended-section">
                <h2>Sản phẩm gợi ý</h2>
                <div className="recommended-grid">
                  <div className="product-card">
                    <div className="product-image">
                      <Image
                        src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
                        alt="Samsung Galaxy S24"
                        width={280}
                        height={250}
                      />
                    </div>
                    <div className="product-info">
                      <h3>Samsung Galaxy S24</h3>
                      <p className="product-description">AI tích hợp, màn hình Dynamic AMOLED 2X</p>
                      <div className="product-price">
                        <span className="current-price">{formatCurrency(19990000)}</span>
                      </div>
                      <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                    </div>
                  </div>

                  <div className="product-card">
                    <div className="product-image">
                      <Image
                        src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
                        alt="Xiaomi 14"
                        width={280}
                        height={250}
                      />
                    </div>
                    <div className="product-info">
                      <h3>Xiaomi 14</h3>
                      <p className="product-description">Snapdragon 8 Gen 3, camera Leica</p>
                      <div className="product-price">
                        <span className="current-price">{formatCurrency(15990000)}</span>
                      </div>
                      <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                    </div>
                  </div>

                  <div className="product-card">
                    <div className="product-image">
                      <Image
                        src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
                        alt="OPPO Find X7"
                        width={280}
                        height={250}
                      />
                    </div>
                    <div className="product-info">
                      <h3>OPPO Find X7</h3>
                      <p className="product-description">Camera Hasselblad, sạc nhanh 100W</p>
                      <div className="product-price">
                        <span className="current-price">{formatCurrency(12990000)}</span>
                      </div>
                      <button className="btn btn-primary">Thêm vào giỏ hàng</button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

