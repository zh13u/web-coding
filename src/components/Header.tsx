'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import AuthModal from './AuthModal';
import ToastContainer from './Toast';
import DarkModeToggle from './DarkModeToggle';
import SearchSuggestions from './SearchSuggestions';
import ProductComparison from './ProductComparison';
import { AlertType } from '@/types';

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage<any>('currentUser', null);
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: AlertType;
    message: string;
    duration?: number;
  }>>([]);

  const [cartItems] = useLocalStorage<any[]>('cart', []);
  const [wishlistItems] = useLocalStorage<any[]>('wishlist', []);
  const [comparisonItems] = useLocalStorage<any[]>('comparison', []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showToast = (type: AlertType, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleLogin = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    showToast('success', `Chào mừng ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    showToast('info', 'Đã đăng xuất thành công!');
  };

  const handleSearch = (query: string) => {
    // Implement search logic
    showToast('info', `Tìm kiếm: ${query}`);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">
              <i className="fas fa-mobile-alt"></i>
              <span>PhoneStore</span>
            </Link>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${activePage === 'home' ? 'active' : ''}`}>
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className={`nav-link ${activePage === 'products' ? 'active' : ''}`}>
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/promotions" className={`nav-link ${activePage === 'promotions' ? 'active' : ''}`}>
                  Khuyến mãi
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/news" className={`nav-link ${activePage === 'news' ? 'active' : ''}`}>
                  Tin tức
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className={`nav-link ${activePage === 'about' ? 'active' : ''}`}>
                  Giới thiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="nav-actions">
            <div className="search-container">
              <SearchSuggestions onSearch={handleSearch} />
            </div>
            
            <div className="action-buttons">
              <DarkModeToggle />
              
              <div className="comparison-icon">
                <button onClick={() => setShowComparison(true)} title="So sánh sản phẩm">
                  <i className="fas fa-balance-scale"></i>
                  {comparisonItems.length > 0 && (
                    <span className="comparison-count">{comparisonItems.length}</span>
                  )}
                </button>
              </div>
              
              <div className="wishlist-icon">
                <Link href="/wishlist" title="Danh sách yêu thích">
                  <i className="fas fa-heart"></i>
                  {wishlistItems.length > 0 && (
                    <span className="wishlist-count">{wishlistItems.length}</span>
                  )}
                </Link>
              </div>
              
              <div className="cart-icon">
                <Link href="/cart" title="Giỏ hàng">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                  )}
                </Link>
              </div>
              
              <div className="user-menu">
                {currentUser ? (
                  <div className="user-dropdown">
                    <button className="user-btn">
                      <i className="fas fa-user"></i>
                      <span>{currentUser.name}</span>
                    </button>
                    <div className="dropdown-menu">
                      <Link href="/profile">Tài khoản</Link>
                      <Link href="/orders">Đơn hàng</Link>
                      <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="login-btn"
                    onClick={() => setShowAuthModal(true)}
                  >
                    <i className="fas fa-user"></i>
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>
            
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      {/* Product Comparison Modal */}
      {showComparison && (
        <ProductComparison onClose={() => setShowComparison(false)} />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </header>
  );
}
