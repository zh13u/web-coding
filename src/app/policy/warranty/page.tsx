'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WarrantyPolicyPage() {
  return (
    <>
      <Header />

      <section className="policy-hero">
        <div className="container">
          <div className="policy-badge">Bảo hành chính hãng</div>
          <h1>Chính sách bảo hành</h1>
          <p>Thông tin chi tiết về quy định bảo hành tại PhoneStore. Minh bạch - nhanh chóng - đúng hãng.</p>
          <div className="policy-hero-actions">
            <span><i className="fas fa-clock" /> 12-24 tháng tùy model</span>
            <span><i className="fas fa-shield-alt" /> Kiểm tra minh bạch</span>
            <span><i className="fas fa-headset" /> Hỗ trợ 24/7</span>
          </div>
        </div>
      </section>

      <section className="policy-grid">
        <div className="container policy-cards">
          <div className="policy-card">
            <i className="fas fa-calendar-check"></i>
            <h3>1. Thời gian bảo hành</h3>
            <p>Mỗi sản phẩm được bảo hành 12-24 tháng tùy model và hãng sản xuất.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-clipboard-check"></i>
            <h3>2. Điều kiện bảo hành</h3>
            <p>Tem/IMEI rõ ràng, không vào nước, không bóp méo hay sửa chữa trái phép.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-store"></i>
            <h3>3. Địa điểm tiếp nhận</h3>
            <p>Quầy bảo hành PhoneStore hoặc trung tâm bảo hành chính hãng được công bố.</p>
          </div>
          <div className="policy-card">
            <i className="fas fa-tools"></i>
            <h3>4. Thời gian xử lý</h3>
            <p>3-10 ngày làm việc tùy tình trạng và quy định của hãng/NSX.</p>
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
                <p>Gọi 1900 1234 hoặc email support@phonestore.com để đăng ký bảo hành.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div>
                <h4>Kiểm tra tình trạng</h4>
                <p>Ghi nhận lỗi, kiểm tra tem/IMEI và điều kiện bảo hành.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div>
                <h4>Gửi đến trung tâm</h4>
                <p>Gửi sản phẩm đến trung tâm bảo hành chính hãng hoặc điểm tiếp nhận của PhoneStore.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <div>
                <h4>Nhận kết quả</h4>
                <p>Xử lý 3-10 ngày; nhận máy đã bảo hành hoặc đổi máy theo chính sách hãng.</p>
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
              <h4>Bảo hành có mất phí không?</h4>
              <p>Miễn phí khi lỗi do nhà sản xuất trong thời hạn bảo hành. Ngoài phạm vi, sẽ báo giá trước.</p>
            </div>
            <div>
              <h4>Thời gian trả máy bao lâu?</h4>
              <p>Thường 3-10 ngày làm việc tùy linh kiện và quy định hãng.</p>
            </div>
            <div>
              <h4>Tôi bảo hành ở đâu?</h4>
              <p>Tại quầy bảo hành PhoneStore hoặc trung tâm chính hãng được công bố kèm địa chỉ.</p>
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
