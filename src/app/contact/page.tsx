'use client';

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useState } from "react";

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
    console.log('Form submitted:', data);
    
    setIsSubmitting(false);
  };

  const handleFormReset = () => {
    console.log('Form reset');
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Làm thế nào để đặt hàng online?",
      answer: "Bạn có thể đặt hàng online bằng cách: 1) Chọn sản phẩm yêu thích, 2) Thêm vào giỏ hàng, 3) Kiểm tra thông tin đơn hàng, 4) Chọn phương thức thanh toán và hoàn tất đặt hàng."
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Chúng tôi giao hàng miễn phí trong vòng 24h cho các đơn hàng trên 2 triệu đồng tại TP.HCM. Các tỉnh thành khác sẽ được giao trong 2-3 ngày làm việc."
    },
    {
      question: "Chính sách bảo hành như thế nào?",
      answer: "Tất cả sản phẩm đều được bảo hành chính hãng từ 12-24 tháng tùy theo từng sản phẩm. Chúng tôi hỗ trợ bảo hành tại các trung tâm bảo hành chính thức của hãng."
    },
    {
      question: "Có thể đổi trả sản phẩm không?",
      answer: "Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn, đầy đủ phụ kiện và có hóa đơn mua hàng."
    },
    {
      question: "Phương thức thanh toán nào được chấp nhận?",
      answer: "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay) và thanh toán khi nhận hàng (COD)."
    }
  ];

  return (
    <>
      <Header activePage="contact" />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Liên hệ với chúng tôi</h1>
          <p>Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-container">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Thông tin liên hệ</h2>
              <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh sau:</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-info">
                    <h3>Địa chỉ</h3>
                    <p>123 Đường ABC, Phường 1, Quận 1<br />Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-info">
                    <h3>Điện thoại</h3>
                    <p>Hotline: <a href="tel:19001234">1900 1234</a><br />Mobile: <a href="tel:0123456789">0123 456 789</a></p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-info">
                    <h3>Email</h3>
                    <p>Hỗ trợ: <a href="mailto:support@phonestore.com">support@phonestore.com</a><br />Bán hàng: <a href="mailto:sales@phonestore.com">sales@phonestore.com</a></p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-info">
                    <h3>Giờ làm việc</h3>
                    <p>Thứ 2 - Thứ 6: 8:00 - 22:00<br />Thứ 7 - Chủ nhật: 9:00 - 21:00</p>
                  </div>
                </div>
              </div>

              <div className="social-media">
                <h3>Theo dõi chúng tôi</h3>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link instagram">
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link youtube">
                    <i className="fab fa-youtube"></i>
                    <span>YouTube</span>
                  </a>
                  <a href="#" className="social-link tiktok">
                    <i className="fab fa-tiktok"></i>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Gửi tin nhắn cho chúng tôi</h2>
              <p>Điền thông tin vào form bên dưới và chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
              
              <ContactForm
                onSubmit={handleFormSubmit}
                onReset={handleFormReset}
                loading={isSubmitting}
                showNewsletter={true}
                requiredFields={['name', 'email', 'subject', 'message']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Vị trí cửa hàng</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <i className="fas fa-map-marked-alt"></i>
              <h3>Bản đồ Google Maps</h3>
              <p>123 Đường ABC, Phường 1, Quận 1, TP.HCM</p>
              <button className="btn btn-outline">Xem trên Google Maps</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Câu hỏi thường gặp</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <i className={`fas fa-chevron-down ${activeFaq === index ? 'rotated' : ''}`}></i>
                </div>
                <div className="faq-answer" style={{ maxHeight: activeFaq === index ? '200px' : '0' }}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
