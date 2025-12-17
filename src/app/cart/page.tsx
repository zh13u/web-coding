'use client';

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/utils";

interface CartItemData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useLocalStorage<CartItemData[]>("cart", []);

  // Cap nhat so luong tung item, gio hang luu trong localStorage
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    if (cartItems.length === 0) return;
    if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      setCartItems([]);
    }
  };

  // Validate gio hang truoc khi di toi trang thanh toan
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng đang trống, hãy thêm sản phẩm trước.");
      return;
    }
    window.location.href = "/checkout";
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Header activePage="cart" />

      <section className="page-header">
        <div className="container">
          <h1>Giỏ hàng</h1>
          <p>Kiểm tra sản phẩm và tiến hành đặt hàng.</p>
        </div>
      </section>

      <section className="cart-content">
        <div className="container">
          <div className="cart-container">
            {/* Danh sách sản phẩm trong giỏ */}
            <div className="cart-items">
              <div className="cart-header">
                <h2>Sản phẩm trong giỏ</h2>
                <button className="btn btn-outline" onClick={clearCart}>
                  Xóa tất cả
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-content">
                    <i className="fas fa-shopping-cart" />
                    <h3>Giỏ hàng trống</h3>
                    <p>Bạn chưa có sản phẩm nào trong giỏ.</p>
                    <Link href="/products" className="btn btn-primary">
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
              ) : (
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
              )}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="cart-summary">
              <div className="summary-card">
                <h3>Tạm tính</h3>

                <div className="summary-row">
                  <span>Thành tiền:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>

                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="checkout-actions">
                  <button
                    className="btn btn-primary btn-large"
                    onClick={handleCheckout}
                  >
                    Tiến hành đặt hàng
                  </button>
                  <Link href="/products" className="btn btn-outline btn-large">
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
