'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                <Link href="/contact" className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="nav-actions">
            <div className="search-box">
              <input type="text" placeholder="Tìm kiếm điện thoại..." />
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="cart-icon">
              <Link href="/cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">0</span>
              </Link>
            </div>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
