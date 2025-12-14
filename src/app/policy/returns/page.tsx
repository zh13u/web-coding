'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnsPolicyPage() {
  return (
    <>
      <Header />

      <section className="policy-hero">
        <div className="container">
          <div className="policy-badge">Hỗ trợ đổi trả</div>
          <h1>Đổi trả sản phẩm</h1>
          <p>Quy định đổi trả hàng hóa tại PhoneStore. Linh hoạt, minh bạch và nhanh chóng.</p>
          <div className="policy-hero-actions">
            <span><i className="fas fa-clock" /> Xử lý trong 1-3 ngày</span>
            <span><i className="fas fa-shield-alt" /> Kiểm tra minh bạch</span>
            <span><i className="fas fa-headset" /> Hỗ trợ 24/7</span>
          </div>
        </div>
      </section>

      <section className="policy-grid">
        <div className="container policy-cards">
          <div className="policy-card">
            <i className="fas fa-undo"></i>
            <h3>1. Thời hạn đổi trả</h3>
            <p>Hỗ trợ đổi trả trong 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn và đầy đủ phụ kiện.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-check-circle"></i>
            <h3>2. Điều kiện chấp nhận</h3>
            <p>Sản phẩm chưa kích hoạt, không trầy xước, không bị tác động ngoại lực, còn hóa đơn và phụ kiện đi kèm.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-truck-loading"></i>
            <h3>3. Quy trình thực hiện</h3>
            <p>Liên hệ hotline/email, nộp lại hàng hóa và hóa đơn để được kiểm tra và xử lý.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-wallet"></i>
            <h3>4. Hoàn tiền</h3>
            <p>Hoàn tiền theo phương thức đã thanh toán sau khi xác nhận điều kiện đổi trả hợp lệ.</p>
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
                <h4>Liên hệ</h4>
                <p>Gọi 1900 1234 hoặc email support@phonestore.com để đăng ký đổi trả.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div>
                <h4>Chuẩn bị hàng</h4>
                <p>Đóng gói sản phẩm, phụ kiện, hóa đơn/phiếu mua hàng.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div>
                <h4>Gửi/đem đến cửa hàng</h4>
                <p>Gửi bưu điện/đơn vị vận chuyển hoặc mang đến chi nhánh gần nhất.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <div>
                <h4>Kiểm tra & hoàn tiền</h4>
                <p>Kiểm tra trong 1-3 ngày làm việc và hoàn tiền/đổi máy theo yêu cầu.</p>
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
              <h4>Tôi có mất phí đổi trả không?</h4>
              <p>Không thu phí nếu lỗi do nhà sản xuất. Với lý do cá nhân, phí vận chuyển hai chiều do khách hàng thanh toán.</p>
            </div>
            <div>
              <h4>Thời gian hoàn tiền bao lâu?</h4>
              <p>1-3 ngày làm việc với ví/ATM, 3-7 ngày với thẻ tín dụng (tùy ngân hàng).</p>
            </div>
            <div>
              <h4>Tôi có thể đổi sang sản phẩm khác?</h4>
              <p>Được, nếu đáp ứng điều kiện đổi trả và sản phẩm mới có giá trị tương đương hoặc cao hơn (bù phần chênh lệch).</p>
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
