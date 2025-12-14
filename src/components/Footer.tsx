import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PhoneStore</h3>
            <p>Cửa hàng điện thoại uy tín với hơn 10 năm kinh nghiệm.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            </div>
            <div className="footer-cta">
              <Link className="footer-btn" href="/contact">
                <i className="fas fa-headset" />
                Nhận tư vấn
              </Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Sản phẩm</h4>
            <ul>
              <li><Link href={{ pathname: "/products", query: { brand: "iphone" } }}><i className="fas fa-mobile-alt" /> iPhone</Link></li>
              <li><Link href={{ pathname: "/products", query: { brand: "samsung" } }}><i className="fas fa-bolt" /> Samsung</Link></li>
              <li><Link href={{ pathname: "/products", query: { brand: "xiaomi" } }}><i className="fas fa-star" /> Xiaomi</Link></li>
              <li><Link href={{ pathname: "/products", query: { brand: "oppo" } }}><i className="fas fa-circle-notch" /> OPPO</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><Link href="/policy/warranty"><i className="fas fa-shield-alt" /> Chính sách bảo hành</Link></li>
              <li><Link href="/policy/purchase-guide"><i className="fas fa-shopping-bag" /> Hướng dẫn mua hàng</Link></li>
              <li><Link href="/policy/shipping-payment"><i className="fas fa-truck" /> Giao hàng & thanh toán</Link></li>
              <li><Link href="/policy/returns"><i className="fas fa-undo" /> Đổi trả sản phẩm</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> 123 Đường ABC, Quận 1, TP.HCM</li>
              <li><i className="fas fa-phone"></i> 1900 1234</li>
              <li><i className="fas fa-envelope"></i> info@phonestore.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PhoneStore. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
