'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function AdminDashboard() {
  const [currentUser] = useLocalStorage<any>('currentUser', null);
  const [cartData] = useLocalStorage<any[]>('cart', []);
  const [wishlistData] = useLocalStorage<any[]>('wishlist', []);
  const [reviewsData] = useLocalStorage<any[]>('reviews', []);
  const [usersData] = useLocalStorage<any[]>('users', []);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 8, // Mock data
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
    totalReviews: 0
  });

  useEffect(() => {
    // Calculate stats from localStorage data
    const totalUsers = usersData.length;
    const totalReviews = reviewsData.length;
    const averageRating = reviewsData.length > 0 
      ? reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length 
      : 0;
    
    // Mock revenue calculation
    const totalRevenue = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setStats({
      totalUsers,
      totalProducts: 8,
      totalOrders: Math.floor(Math.random() * 100), // Mock data
      totalRevenue,
      averageRating,
      totalReviews
    });
  }, [usersData, reviewsData, cartData]);

  const recentUsers = usersData.slice(-5).reverse();
  const recentReviews = reviewsData.slice(-5).reverse();

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
                <p className="stat-number">{formatPrice(stats.totalRevenue)}</p>
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
              <button className="action-btn">
                <i className="fas fa-plus"></i>
                Thêm sản phẩm mới
              </button>
              <button className="action-btn">
                <i className="fas fa-edit"></i>
                Chỉnh sửa sản phẩm
              </button>
              <button className="action-btn">
                <i className="fas fa-chart-bar"></i>
                Xem báo cáo chi tiết
              </button>
              <button className="action-btn">
                <i className="fas fa-cog"></i>
                Cài đặt hệ thống
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
