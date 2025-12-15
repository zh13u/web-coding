'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import ChangePasswordModal from './ChangePasswordModal';
import DarkModeToggle from './DarkModeToggle';
import SearchSuggestions from './SearchSuggestions';

interface HeaderProps {
  activePage?: string;
}

interface CurrentUser {
  name: string;
  email: string;
}

export default function Header({ activePage = '' }: HeaderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem('currentUser');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.name && parsed.email) {
          setCurrentUser({ name: parsed.name, email: parsed.email });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        const totalCartItems = Array.isArray(cart)
          ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
          : 0;

        setCartCount(totalCartItems);
        setWishlistCount(Array.isArray(wishlist) ? wishlist.length : 0);
      } catch {
        setCartCount(0);
        setWishlistCount(0);
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('currentUser');
      }
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      router.push('/products');
      return;
    }
    const params = new URLSearchParams({ q: trimmed });
    router.push(`/products?${params.toString()}`);
  };

  const goToOrders = () => {
    setIsUserMenuOpen(false);
    router.push('/orders');
  };

  const goToAdmin = () => {
    setIsUserMenuOpen(false);
    router.push('/admin');
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <Link href="/">
                <i className="fas fa-mobile-alt" />
                <span>PhoneStore</span>
              </Link>
            </div>

            <ul className="nav-list">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                >
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/products"
                  className={`nav-link ${activePage === 'products' ? 'active' : ''}`}
                >
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/promotions"
                  className={`nav-link ${
                    activePage === 'promotions' ? 'active' : ''
                  }`}
                >
                  Khuyến mãi
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/news"
                  className={`nav-link ${activePage === 'news' ? 'active' : ''}`}
                >
                  Tin tức
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                >
                  Giới thiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
                >
                  Liên hệ
                </Link>
              </li>
            </ul>

            <div className="nav-actions">
              <div className="nav-search">
                <SearchSuggestions onSearch={handleSearch} />
              </div>

              <DarkModeToggle />

              <div className="cart-icon">
                <Link
                  href="/wishlist"
                  title="Yêu thích"
                  aria-label="Xem danh sách yêu thích"
                  className="wishlist-icon"
                >
                  <i className="fas fa-heart" />
                  {wishlistCount > 0 && (
                    <span className="wishlist-count">{wishlistCount}</span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  title="Giỏ hàng"
                  aria-label="Xem giỏ hàng"
                  className="wishlist-icon"
                >
                  <i className="fas fa-shopping-cart" />
                  {cartCount > 0 && (
                    <span className="wishlist-count">{cartCount}</span>
                  )}
                </Link>
              </div>

              <div className="user-dropdown">
                {currentUser ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsUserMenuOpen((open) => !open)}
                    >
                      <i className="fas fa-user" />
                      <span>{currentUser.name}</span>
                      <i className="fas fa-chevron-down" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="dropdown-menu">
                        <button type="button" onClick={goToOrders}>
                          <i className="fas fa-box" />
                          Đơn hàng của tôi
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsChangePasswordOpen(true);
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <i className="fas fa-key" />
                          Đổi mật khẩu
                        </button>
                        <button type="button" onClick={goToAdmin}>
                          <i className="fas fa-tools" />
                          Trang quản trị
                        </button>
                        <button type="button" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt" />
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setIsAuthOpen(true)}
                  >
                    <i className="fas fa-user" />
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLoginSuccess}
      />

      {isChangePasswordOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
          onSuccess={() => setIsChangePasswordOpen(false)}
        />
      )}
    </>
  );
}
