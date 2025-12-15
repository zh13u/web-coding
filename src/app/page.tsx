'use client';
//  file này dùng  useState nên phai chạy ở trình duyệt -> cần "use client"
import Link from "next/link";
import Header from "@/components/Header";  // header o dau trang 
import Footer from "@/components/Footer";  // Footer o cuoi trang
import ProductCard from "@/components/ProductCard"; // danh sach san pham 
import { useState } from "react";
import { products } from "@/data/products";

// Lấy 4 sản phẩm đầu tiên để hiển thị ở trang chủ
const demoProducts = products.slice(0, 4);  // lay 4 san pham de hien thi o dau trang 



// day la compoment trang / , cartcount dem so mon trong gio hang 
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
            {demoProducts.map((product) => (  // map chạy qua 4 sản phẩm -> mỗi cái tạo ra 1 productcard
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
