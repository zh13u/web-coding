'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatCurrency } from '@/utils';

export default function AdminDashboard() {
  const [currentUser] = useLocalStorage<any>('currentUser', null);
  const [reviewsData] = useLocalStorage<any[]>('reviews', []);
  const [usersData] = useLocalStorage<any[]>('users', []);
  const [ordersData] = useLocalStorage<any[]>('orders', []);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 8, // Mock data
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0
  });

  const [revenueStats, setRevenueStats] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    const totalUsers = usersData.length;
    const totalReviews = reviewsData.length;
    const averageRating =
      reviewsData.length > 0
        ? reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length
        : 0;

    const orders = ordersData ?? [];
    const totalOrders = orders.length;

    let totalRevenue = 0;
    let todayRevenue = 0;
    let weekRevenue = 0;
    let monthRevenue = 0;

    const now = new Date();

    orders.forEach((order: any) => {
      const orderTotal = typeof order.total === 'number' ? order.total : 0;
      totalRevenue += orderTotal;

      const createdAt = new Date(order.createdAt);
      if (Number.isNaN(createdAt.getTime())) return;

      const sameDay =
        createdAt.getDate() === now.getDate() &&
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear();

      if (sameDay) {
        todayRevenue += orderTotal;
      }

      const diffTime = now.getTime() - createdAt.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays >= 0 && diffDays < 7) {
        weekRevenue += orderTotal;
      }

      if (
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear()
      ) {
        monthRevenue += orderTotal;
      }
    });

    setStats({
      totalUsers,
      totalProducts: 8,
      totalOrders,
      totalRevenue,
      averageRating,
      totalReviews
    });

    setRevenueStats({
      today: todayRevenue,
      thisWeek: weekRevenue,
      thisMonth: monthRevenue,
    });
  }, [usersData, reviewsData, ordersData]);

  const recentUsers = usersData.slice(-5).reverse();
  const recentReviews = reviewsData.slice(-5).reverse();

  // formatter an toàn cho VND
  const formatPriceSafe = (price: number) => formatCurrency(price);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (!currentUser) {
    return (
      <>
        <Header activePage="admin" />
        <section className="page-header">
          <div className="container">
            <h1>Admin Dashboard</h1>
            <p>Bạn cần đăng nhập để truy cập trang này</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activePage="admin" />
      
      <section className="page-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Chào mừng {currentUser.name}! Quản lý cửa hàng PhoneStore</p>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h3>Tổng người dùng</h3>
                <p className="stat-number">{stats.totalUsers}</p>
                <span className="stat-change positive">+12% so với tháng trước</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="stat-info">
                <h3>Sản phẩm</h3>
                <p className="stat-number">{stats.totalProducts}</p>
                <span className="stat-change positive">+3 sản phẩm mới</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="stat-info">
                <h3>Đơn hàng</h3>
                <p className="stat-number">{stats.totalOrders}</p>
                <span className="stat-change positive">+8% so với tháng trước</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-info">
                <h3>Doanh thu</h3>
                <p className="stat-number">{formatPriceSafe(stats.totalRevenue)}</p>
                <span className="stat-change positive">+15% so với tháng trước</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-info">
                <h3>Đánh giá trung bình</h3>
                <p className="stat-number">{stats.averageRating.toFixed(1)}</p>
                <span className="stat-change positive">Xuất sắc</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-comments"></i>
              </div>
              <div className="stat-info">
                <h3>Tổng đánh giá</h3>
                <p className="stat-number">{stats.totalReviews}</p>
                <span className="stat-change positive">+{Math.floor(Math.random() * 10)} tuần này</span>
              </div>
            </div>
          </div>

          <div className="revenue-summary">
            <h3>Thống kê doanh thu</h3>
            <div className="revenue-summary-grid">
              <div className="summary-item">
                <span>Hôm nay</span>
                <strong>{formatPriceSafe(revenueStats.today)}</strong>
              </div>
              <div className="summary-item">
                <span>7 ngày gần đây</span>
                <strong>{formatPriceSafe(revenueStats.thisWeek)}</strong>
              </div>
              <div className="summary-item">
                <span>Tháng này</span>
                <strong>{formatPriceSafe(revenueStats.thisMonth)}</strong>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <h3>Biểu đồ doanh thu</h3>
              <div className="mock-chart">
                <div className="chart-bars">
                  {[65, 80, 45, 90, 75, 85, 95].map((height, index) => (
                    <div key={index} className="chart-bar" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span>T7</span>
                  <span>CN</span>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <h3>Top sản phẩm bán chạy</h3>
              <div className="top-products">
                <div className="product-item">
                  <span>1. iPhone 15 Pro</span>
                  <span>45 đơn</span>
                </div>
                <div className="product-item">
                  <span>2. Samsung Galaxy S24</span>
                  <span>38 đơn</span>
                </div>
                <div className="product-item">
                  <span>3. Xiaomi 14</span>
                  <span>32 đơn</span>
                </div>
                <div className="product-item">
                  <span>4. OPPO Find X7</span>
                  <span>28 đơn</span>
                </div>
                <div className="product-item">
                  <span>5. Vivo X100</span>
                  <span>25 đơn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <div className="activity-section">
              <h3>Người dùng mới nhất</h3>
              <div className="activity-list">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <i className="fas fa-user-plus"></i>
                      </div>
                      <div className="activity-content">
                        <p><strong>{user.name}</strong> đã đăng ký tài khoản</p>
                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Chưa có người dùng nào</p>
                )}
              </div>
            </div>

            <div className="activity-section">
              <h3>Đánh giá mới nhất</h3>
              <div className="activity-list">
                {recentReviews.length > 0 ? (
                  recentReviews.map((review, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="activity-content">
                        <p><strong>{review.userName}</strong> đánh giá {review.rating} sao</p>
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Chưa có đánh giá nào</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Thao tác nhanh</h3>
            <div className="actions-grid">
              <a href="/admin/products" className="action-btn">
                <i className="fas fa-mobile-alt"></i>
                Quản lý sản phẩm
              </a>
              <a href="/admin/categories" className="action-btn">
                <i className="fas fa-th-large"></i>
                Quản lý danh mục
              </a>
              <a href="/admin/orders" className="action-btn">
                <i className="fas fa-shopping-cart"></i>
                Quản lý đơn hàng
              </a>
              <a href="/admin/customers" className="action-btn">
                <i className="fas fa-users"></i>
                Quản lý khách hàng
              </a>
              <a href="/admin/accounts" className="action-btn">
                <i className="fas fa-user-shield"></i>
                Quản lý tài khoản admin
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
