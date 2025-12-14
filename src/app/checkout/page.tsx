'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { CartItem } from '@/types';
import Alert from '@/components/Alert';
import { formatCurrency } from '@/utils';

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [currentUser] = useLocalStorage<{ name: string; email: string } | null>('currentUser', null);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod',
    notes: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!formData.fullName.trim()) newErrors.push('Họ tên là bắt buộc');
    if (!formData.email.trim()) newErrors.push('Email là bắt buộc');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.push('Email không hợp lệ');
    if (!formData.phone.trim()) newErrors.push('Số điện thoại là bắt buộc');
    else if (!/^(0|\+84)[3-9][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.push('Số điện thoại không hợp lệ');
    if (!formData.address.trim()) newErrors.push('Địa chỉ là bắt buộc');
    if (!formData.city.trim()) newErrors.push('Tỉnh/Thành phố là bắt buộc');
    if (!formData.district.trim()) newErrors.push('Quận/Huyện là bắt buộc');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const orderNumber = 'ORD' + Date.now();
    const order = {
      id: orderNumber,
      items: cartItems,
      customer: formData,
      total: calculateTotal(),
      discount: discountAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    setCartItems([]);
    setOrderNumber(orderNumber);
    setOrderSuccess(true);
    setIsSubmitting(false);
  };

  const calculateSubtotal = () => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculateShipping = (subtotal: number) => (subtotal >= 2000000 ? 0 : 50000);
  const calculateDiscount = (subtotal: number) => Math.min(discountAmount, subtotal);
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping(subtotal);
    const discount = calculateDiscount(subtotal);
    return subtotal + shipping - discount;
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const subtotal = calculateSubtotal();
    if (!code) {
      setCouponMessage('Vui lòng nhập mã giảm giá');
      setDiscountAmount(0);
      return;
    }

    if (code === 'PHONE10') {
      const discount = Math.floor(subtotal * 0.1);
      setDiscountAmount(discount);
      setCouponMessage('Đã áp dụng mã PHONE10 (giảm 10%)');
      return;
    }

    if (code === 'SALE50K') {
      const discount = Math.min(50000, subtotal);
      setDiscountAmount(discount);
      setCouponMessage('Đã áp dụng mã SALE50K (giảm 50.000đ)');
      return;
    }

    setDiscountAmount(0);
    setCouponMessage('Mã giảm giá không hợp lệ');
  };

  const subtotal = calculateSubtotal();
  const shippingFee = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal);
  const total = subtotal + shippingFee - discount;

  const formatPrice = (price: number) => formatCurrency(price);

  if (orderSuccess) {
    return (
      <>
        <Header />
        <section className="page-header">
          <div className="container">
            <h1>Đặt hàng thành công</h1>
            <p>Mã đơn hàng: {orderNumber}</p>
          </div>
        </section>
        <section className="checkout-content">
          <div className="container">
            <div className="success-box">
              <p>Cảm ơn bạn đã mua sắm tại PhoneStore!</p>
              <p>Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong thời gian sớm nhất.</p>
              <div className="checkout-actions">
                <a href="/orders" className="btn btn-primary">Xem đơn hàng của tôi</a>
                <a href="/products" className="btn btn-outline">Tiếp tục mua sắm</a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container">
          <h1>Thanh toán</h1>
          <p>Hoàn tất đơn hàng của bạn</p>
        </div>
      </section>

      <section className="checkout-content">
        <div className="container">
          <div className="checkout-container">
            {/* Checkout Form */}
            <div className="checkout-form-section">
              <h2>Thông tin giao hàng</h2>

              {errors.length > 0 && (
                <Alert type="error" message={errors.join(', ')} />
              )}

              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Họ và tên *</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Nhập họ và tên" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Nhập email" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nhập số điện thoại" required />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ *</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Nhập địa chỉ chi tiết" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Tỉnh/Thành phố *</label>
                    <select id="city" name="city" value={formData.city} onChange={handleInputChange} required>
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="danang">Đà Nẵng</option>
                      <option value="cantho">Cần Thơ</option>
                      <option value="haiphong">Hải Phòng</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">Quận/Huyện *</label>
                    <select id="district" name="district" value={formData.district} onChange={handleInputChange} required>
                      <option value="">Chọn quận/huyện</option>
                      <option value="quan1">Quận 1</option>
                      <option value="quan2">Quận 2</option>
                      <option value="quan3">Quận 3</option>
                      <option value="quan4">Quận 4</option>
                      <option value="quan5">Quận 5</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="paymentMethod">Phương thức thanh toán *</label>
                  <div className="payment-methods">
                    <label className="checkbox-label">
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} /> COD (Thanh toán khi nhận hàng)
                    </label>
                    <label className="checkbox-label">
                      <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleInputChange} /> Chuyển khoản ngân hàng
                    </label>
                    <label className="checkbox-label">
                      <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} /> Thẻ tín dụng/ghi nợ
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Ghi chú</label>
                  <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Ghi chú cho đơn hàng (không bắt buộc)"></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2>Tóm tắt đơn hàng</h2>
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
              </div>
              <div className="summary-row">
                <span>Giảm giá:</span>
                <span>-{discount > 0 ? formatPrice(discount) : formatPrice(0)}</span>
              </div>
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label htmlFor="coupon">Mã giảm giá (ví dụ: PHONE10)</label>
                <div className="form-row" style={{ gap: '0.5rem' }}>
                  <input
                    id="coupon"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-outline" onClick={applyCoupon}>
                    Áp dụng
                  </button>
                </div>
                {couponMessage && (
                  <p style={{ marginTop: '0.5rem', color: discount > 0 ? '#16a34a' : '#dc2626' }}>
                    {couponMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
