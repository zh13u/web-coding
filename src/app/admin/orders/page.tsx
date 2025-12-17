'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import Alert from '@/components/Alert';

export default function AdminOrders() {
  const { currentAdmin } = useAdminGuard();
  const [orders, setOrders] = useLocalStorage<any[]>('orders', []);
  const [filteredOrders, setFilteredOrders] = useState<any[]>(orders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.accountEmail || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    const statusLabels: { [key: string]: string } = {
      pending: 'Chờ xử lý',
      confirmed: 'Đã xác nhận',
      preparing: 'Đang chuẩn bị',
      shipping: 'Đang giao hàng',
      delivered: 'Đã giao hàng',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy'
    };
    return statusLabels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const statusClasses: { [key: string]: string } = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      preparing: 'status-preparing',
      shipping: 'status-shipping',
      delivered: 'status-delivered',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return statusClasses[status] || 'status-pending';
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Update local state
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));

    setAlertMessage(`Đã cập nhật trạng thái đơn hàng ${orderId} thành ${getStatusLabel(newStatus)}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getNextStatus = (currentStatus: string) => {
    const statusFlow: { [key: string]: string } = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'shipping',
      shipping: 'delivered',
      delivered: 'completed'
    };
    return statusFlow[currentStatus];
  };

  if (!currentAdmin) {
    return (
      <>
        <Header />
        <section className="page-header">
          <div className="container">
            <h1>Admin - Quản lý đơn hàng</h1>
            <p>Bạn cần đăng nhập để truy cập trang này</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <section className="page-header">
        <div className="container">
          <h1>Quản lý đơn hàng</h1>
          <p>Quản lý và theo dõi trạng thái các đơn hàng</p>
        </div>
      </section>

      <section className="admin-orders">
        <div className="container">
          {/* Filters */}
          <div className="orders-header">
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="preparing">Đang chuẩn bị</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            
            <div className="orders-summary">
              <div className="summary-item">
                <span>Tổng đơn hàng:</span>
                <strong>{orders.length}</strong>
              </div>
              <div className="summary-item">
                <span>Chờ xử lý:</span>
                <strong>{orders.filter(o => o.status === 'pending').length}</strong>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="orders-list">
            {filteredOrders.length === 0 ? (
              <div className="no-orders">
                <i className="fas fa-shopping-bag"></i>
                <h3>Không có đơn hàng nào</h3>
                <p>Chưa có đơn hàng nào phù hợp với bộ lọc</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
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
                      {getNextStatus(order.status) && (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                        >
                          <i className="fas fa-arrow-right"></i>
                          {getStatusLabel(getNextStatus(order.status)!)}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="customer-info">
                    <h4>Thông tin khách hàng:</h4>
                    <div className="customer-details">
                      <div>
                        <strong>Tên:</strong> {order.customer.fullName}
                      </div>
                      <div>
                        <strong>Email:</strong> {order.accountEmail || order.customer.email}
                      </div>
                      <div>
                        <strong>SĐT:</strong> {order.customer.phone}
                      </div>
                      <div>
                        <strong>Địa chỉ:</strong> {order.customer.address}, {order.customer.district}, {order.customer.city}
                      </div>
                    </div>
                  </div>

                  <div className="order-items">
                    <h4>Sản phẩm:</h4>
                    {order.items.map((item: any) => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="item-info">
                          <h5>{item.name}</h5>
                          <p>{item.variant}</p>
                          <span>Số lượng: {item.quantity}</span>
                        </div>
                        <div className="item-price">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Tổng cộng: <strong>{formatPrice(order.total)}</strong></span>
                    </div>
                    <div className="order-actions">
                      <button className="btn btn-outline btn-sm">
                        <i className="fas fa-eye"></i>
                        Xem chi tiết
                      </button>
                      {order.status === 'pending' && (
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        >
                          <i className="fas fa-times"></i>
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
