'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PurchaseGuidePage() {
  return (
    <>
      <Header />

      <section className="policy-hero">
        <div className="container">
          <div className="policy-badge">Hướng dẫn mua hàng</div>
          <h1>Mua hàng dễ dàng</h1>
          <p>Các bước đặt mua tại cửa hàng và trên website PhoneStore. Nhanh chóng - an toàn - thuận tiện.</p>
          <div className="policy-hero-actions">
            <span><i className="fas fa-shopping-cart" /> Đặt online trong 1 phút</span>
            <span><i className="fas fa-credit-card" /> Thanh toán đa kênh</span>
            <span><i className="fas fa-truck" /> Giao nhanh toàn quốc</span>
          </div>
        </div>
      </section>

      <section className="policy-grid">
        <div className="container policy-cards">
          <div className="policy-card">
            <i className="fas fa-search"></i>
            <h3>1. Chọn sản phẩm</h3>
            <p>Tìm kiếm, lọc theo thương hiệu/giá để chọn mẫu phù hợp nhu cầu.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-shopping-basket"></i>
            <h3>2. Thêm giỏ & thông tin</h3>
            <p>Thêm vào giỏ, nhập thông tin nhận hàng và yêu cầu ghi chú (nếu có).</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-credit-card"></i>
            <h3>3. Thanh toán</h3>
            <p>Chọn COD, thẻ, chuyển khoản hoặc ví điện tử (MoMo, ZaloPay, VNPay).</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-check-circle"></i>
            <h3>4. Xác nhận & giao hàng</h3>
            <p>Nhận xác nhận qua SMS/email, giao nhanh 24-72h tùy khu vực.</p>
          </div>
        </div>
      </section>

      <section className="policy-steps">
        <div className="container">
          <h2>Quy trình 4 bước</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <div>
                <h4>Tìm kiếm & so sánh</h4>
                <p>Dùng bộ lọc thương hiệu/giá/khuyến mãi để so sánh nhanh.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div>
                <h4>Thêm vào giỏ</h4>
                <p>Chọn màu, dung lượng (nếu có), nhập địa chỉ giao và số điện thoại.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div>
                <h4>Chọn thanh toán</h4>
                <p>COD, thẻ, chuyển khoản, ví điện tử; kiểm tra lại đơn trước khi đặt.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <div>
                <h4>Nhận hàng & kiểm tra</h4>
                <p>Kiểm tra ngoại quan khi nhận; cần hỗ trợ gọi 1900 1234.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="policy-faq">
        <div className="container">
          <h2>Câu hỏi thường gặp</h2>
          <div className="faq-box">
            <div>
              <h4>Tôi có thể thanh toán khi nhận hàng?</h4>
              <p>Có, bạn chọn COD khi đặt. Ngoài ra hỗ trợ thẻ và ví điện tử.</p>
            </div>
            <div>
              <h4>Phí giao hàng thế nào?</h4>
              <p>Miễn phí nội thành với đơn từ 2 triệu; tỉnh thành khác theo bảng giá vận chuyển.</p>
            </div>
            <div>
              <h4>Có đổi trả nếu không ưng ý?</h4>
              <p>Hỗ trợ đổi trả trong 7 ngày nếu còn nguyên vẹn, đủ phụ kiện và hóa đơn.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="policy-contact">
        <div className="container policy-contact-box">
          <div>
            <h3>Cần hỗ trợ thêm?</h3>
            <p>Đội ngũ chăm sóc khách hàng sẵn sàng 24/7.</p>
          </div>
          <div className="policy-contact-actions">
            <a className="policy-btn" href="tel:19001234"><i className="fas fa-phone" /> 1900 1234</a>
            <a className="policy-btn secondary" href="mailto:support@phonestore.com"><i className="fas fa-envelope" /> support@phonestore.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
