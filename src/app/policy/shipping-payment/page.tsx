'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPaymentPage() {
  return (
    <>
      <Header />

      <section className="policy-hero">
        <div className="container">
          <div className="policy-badge">Giao hàng & thanh toán</div>
          <h1>Giao nhanh, thanh toán linh hoạt</h1>
          <p>Chính sách giao hàng toàn quốc và các hình thức thanh toán được chấp nhận tại PhoneStore.</p>
          <div className="policy-hero-actions">
            <span><i className="fas fa-truck" /> Giao 24h nội thành</span>
            <span><i className="fas fa-credit-card" /> Nhiều phương thức thanh toán</span>
            <span><i className="fas fa-map-marker-alt" /> Theo dõi trạng thái đơn</span>
          </div>
        </div>
      </section>

      <section className="policy-grid">
        <div className="container policy-cards">
          <div className="policy-card">
            <i className="fas fa-map"></i>
            <h3>1. Phạm vi giao hàng</h3>
            <p>Giao toàn quốc; nội thành giao nhanh trong 24h (đơn từ 2 triệu).</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-dollar-sign"></i>
            <h3>2. Phí giao hàng</h3>
            <p>Miễn phí nội thành cho đơn từ 2 triệu; tỉnh thành khác theo phí hãng vận chuyển.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-wallet"></i>
            <h3>3. Phương thức thanh toán</h3>
            <p>COD, thẻ tín dụng/ghi nợ, chuyển khoản, ví điện tử (MoMo, ZaloPay, VNPay).</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-box-open"></i>
            <h3>4. Kiểm tra hàng</h3>
            <p>Kiểm tra ngoại quan khi nhận; có vấn đề liên hệ hotline 1900 1234.</p>
          </div>
        </div>
      </section>

      <section className="policy-steps">
        <div className="container">
          <h2>Quy trình giao hàng</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <div>
                <h4>Đặt đơn</h4>
                <p>Hoàn tất đơn trên website hoặc tại cửa hàng.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div>
                <h4>Xác nhận & chuẩn bị</h4>
                <p>Xác nhận qua SMS/email, đóng gói sản phẩm an toàn.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div>
                <h4>Vận chuyển</h4>
                <p>Giao nhanh nội thành; 2-3 ngày làm việc với các tỉnh.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <div>
                <h4>Nhận hàng & thanh toán</h4>
                <p>Kiểm tra ngoại quan, thanh toán COD hoặc theo phương thức đã chọn.</p>
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
              <p>Có, chọn COD khi đặt. Ngoài ra hỗ trợ thẻ và ví điện tử.</p>
            </div>
            <div>
              <h4>Thời gian giao bao lâu?</h4>
              <p>Nội thành 24h cho đơn từ 2 triệu; tỉnh thành khác 2-3 ngày làm việc.</p>
            </div>
            <div>
              <h4>Có được kiểm tra hàng không?</h4>
              <p>Được kiểm tra ngoại quan khi nhận. Nếu có vấn đề gọi hotline 1900 1234.</p>
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
