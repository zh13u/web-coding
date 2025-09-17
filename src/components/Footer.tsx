import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PhoneStore</h3>
            <p>Cửa hàng điện thoại uy tín với hơn 10 năm kinh nghiệm</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Sản phẩm</h4>
            <ul>
              <li><a href="#">iPhone</a></li>
              <li><a href="#">Samsung</a></li>
              <li><a href="#">Xiaomi</a></li>
              <li><a href="#">OPPO</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Giao hàng & thanh toán</a></li>
              <li><a href="#">Đổi trả sản phẩm</a></li>
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
          <p>&copy; 2024 PhoneStore. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
