'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatCurrency } from '@/utils';

export default function Orders() {
  const router = useRouter();
  const [currentUser] = useLocalStorage<any>('currentUser', null);
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter((order: any) => order.customer.email === currentUser.email);
    setOrders(userOrders);
    setFilteredOrders(userOrders);
  }, [currentUser, router]);

  useEffect(() => {
    setFilteredOrders(statusFilter === 'all' ? orders : orders.filter(order => order.status === statusFilter));
  }, [statusFilter, orders]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      pending: 'Chờ xử lý',
      confirmed: 'Đã xác nhận',
      preparing: 'Đang chuẩn bị',
      shipping: 'Đang giao hàng',
      delivered: 'Đã giao hàng',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return statusLabels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      preparing: 'status-preparing',
      shipping: 'status-shipping',
      delivered: 'status-delivered',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
    };
    return statusClasses[status] || 'status-pending';
  };

  const cancelOrder = (orderId: string) => {
    if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = allOrders.map((order: any) => order.id === orderId ? { ...order, status: 'cancelled' } : order);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'cancelled' } : order));
    }
  };

  if (!currentUser) return null;

  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container">
          <h1>Đơn hàng của tôi</h1>
          <p>Xem lịch sử và trạng thái các đơn hàng</p>
        </div>
      </section>

      <section className="orders-content">
        <div className="container">
          <div className="orders-filter">
            <div className="filter-buttons">
              <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>
                Tất cả ({orders.length})
              </button>
              <button className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => setStatusFilter('pending')}>
                Chờ xử lý ({orders.filter(o => o.status === 'pending').length})
              </button>
              <button className={`filter-btn ${statusFilter === 'shipping' ? 'active' : ''}`} onClick={() => setStatusFilter('shipping')}>
                Đang giao ({orders.filter(o => o.status === 'shipping').length})
              </button>
              <button className={`filter-btn ${statusFilter === 'delivered' ? 'active' : ''}`} onClick={() => setStatusFilter('delivered')}>
                Đã giao ({orders.filter(o => o.status === 'delivered').length})
              </button>
              <button className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('cancelled')}>
                Đã hủy ({orders.filter(o => o.status === 'cancelled').length})
              </button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-content">
                <i className="fas fa-shopping-bag"></i>
                <h2>Chưa có đơn hàng nào</h2>
                <p>Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!</p>
                <Link href="/products" className="btn btn-primary">Khám phá sản phẩm</Link>
              </div>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Đơn hàng #{order.id}</h3>
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      {order.status === 'pending' && (
                        <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <Image src={item.image} alt={item.name} width={60} height={60} />
                        </div>
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p>{item.variant}</p>
                          <span>Số lượng: {item.quantity}</span>
                        </div>
                        <div className="item-price">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Tổng cộng: <strong>{formatCurrency(order.total)}</strong></span>
                    </div>
                    <div className="order-actions">
                      <Link href={`/orders/${order.id}`} className="btn btn-outline">Xem chi tiết</Link>
                      {order.status === 'delivered' && (
                        <button className="btn btn-primary">Đánh giá</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

