'use client';

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { products } from "@/data/products";

// Lấy 4 sản phẩm đầu tiên để hiển thị ở trang chủ
const demoProducts = products.slice(0, 4);

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  // Ở trang chủ chỉ tăng số lượng giỏ hàng demo và hiện log,
  // phần lưu thật vào localStorage sẽ xử lý ở các trang khác nếu cần.
  const handleAddToCart = (productId: number) => {
    setCartCount((prev) => prev + 1);
    console.log(`Thêm sản phẩm ${productId} vào giỏ hàng (demo)`);
  };

  return (
    <>
      <Header activePage="home" />

      {/* Phần giới thiệu rất đơn giản */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">PhoneStore - Website bán điện thoại đơn giản</h1>
          <p className="hero-description">
            Đây là đồ án demo dùng Next.js + React. Giao diện và code được viết đơn giản để dễ hiểu cho người mới học.
          </p>
          <p>Hiện tại giỏ hàng đang có: {cartCount} sản phẩm (demo).</p>
          <div className="hero-buttons">
            <Link href="/products" className="btn btn-primary">Xem danh sách sản phẩm</Link>
          </div>
        </div>
      </section>

      {/* Danh sách sản phẩm nổi bật */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <div className="products-grid">
            {demoProducts.map((product) => (
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
      </section>

      <Footer />
    </>
  );
}
