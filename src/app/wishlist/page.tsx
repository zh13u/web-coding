'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Alert from "@/components/Alert";
import { formatCurrency } from "@/utils";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useLocalStorage<any[]>("wishlist", []);
  const [cartItems, setCartItems] = useLocalStorage<any[]>("cart", []);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Xoa 1 item khoi wishlist va thong bao thanh cong
  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    setAlertMessage("Đã xóa sản phẩm khỏi danh sách yêu thích!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Them vao gio hang, neu da ton tai thi tang quantity
  const addToCart = (product: any) => {
    const variantText = product.variant || "Mặc định";

    const existingItem = cartItems.find(
      (item: any) => item.id === product.id && item.variant === variantText,
    );

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item: any) =>
          item.id === product.id && item.variant === variantText
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        variant: variantText,
        image: product.image,
      };
      setCartItems((prev) => [...prev, cartItem]);
    }

    setAlertMessage("Đã thêm sản phẩm vào giỏ hàng!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <Header />

      {showAlert && (
        <Alert
          type="success"
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      <section className="page-header">
        <div className="container">
          <h1>Danh sách yêu thích</h1>
          <p>Các sản phẩm bạn đã đánh dấu yêu thích.</p>
        </div>
      </section>

      <section className="wishlist-content">
        <div className="container">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-content">
                <i className="fas fa-heart" />
                <h2>Danh sách yêu thích đang trống</h2>
                <p>Hãy thêm vài sản phẩm bạn quan tâm.</p>
                <Link href="/products" className="btn btn-primary">
                  Khám phá sản phẩm
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="wishlist-header">
                <h2>Sản phẩm yêu thích ({wishlistItems.length})</h2>
                <button
                  className="btn btn-outline"
                  onClick={() => setWishlistItems([])}
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="wishlist-grid">
                {wishlistItems.map((item: any) => (
                  <div key={item.id} className="wishlist-item">
                    <div className="item-image">
                      <Link href={`/products/${item.id}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={250}
                          height={250}
                        />
                      </Link>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Xóa khỏi yêu thích"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>

                    <div className="item-info">
                      <h3>
                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                      </h3>
                      <div className="item-price">
                        {formatCurrency(item.price)}
                      </div>
                      {item.addedAt && (
                        <div className="item-added-date">
                          Thêm vào:{" "}
                          {new Date(item.addedAt).toLocaleDateString("vi-VN")}
                        </div>
                      )}
                    </div>

                    <div className="item-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fas fa-shopping-cart" />
                        Thêm vào giỏ hàng
                      </button>
                      <Link
                        href={`/products/${item.id}`}
                        className="btn btn-outline"
                      >
                        <i className="fas fa-eye" />
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
