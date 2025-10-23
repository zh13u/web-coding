'use client';

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Header activePage="about" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Giới thiệu về PhoneStore</h1>
          <p>Chúng tôi là đối tác tin cậy cho mọi nhu cầu điện thoại của bạn</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          {/* Company Story */}
          <div className="about-section">
            <div className="about-text">
              <h2>Câu chuyện của chúng tôi</h2>
              <p>
                PhoneStore được thành lập vào năm 2010 với sứ mệnh mang đến những sản phẩm điện thoại
                chất lượng tốt nhất cho người dùng Việt Nam. Với hơn 10 năm kinh nghiệm trong lĩnh vực
                công nghệ di động, chúng tôi tự hào là địa chỉ tin cậy của hàng ngàn khách hàng.
              </p>
              <p>
                Chúng tôi không chỉ bán điện thoại, mà còn cung cấp dịch vụ chăm sóc khách hàng tận tình,
                bảo hành chính hãng và hỗ trợ kỹ thuật chuyên nghiệp.
              </p>
            </div>
            <div className="about-image">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1000&q=80"
                alt="Cửa hàng PhoneStore"
                width={500}
                height={350}
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mission-vision">
            <div className="mission">
              <h2>Sứ mệnh</h2>
              <p>
                Mang đến cho khách hàng những sản phẩm điện thoại chính hãng, chất lượng cao
                với giá cả hợp lý và dịch vụ chăm sóc khách hàng tốt nhất.
              </p>
            </div>
            <div className="vision">
              <h2>Tầm nhìn</h2>
              <p>
                Trở thành cửa hàng điện thoại hàng đầu Việt Nam, được khách hàng tin tưởng
                và lựa chọn khi mua sắm các sản phẩm công nghệ.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="values-section">
            <h2>Giá trị cốt lõi</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon"><i className="fas fa-heart"></i></div>
                <h3>Uy tín</h3>
                <p>Cam kết bán hàng chính hãng, minh bạch về giá cả</p>
              </div>
              <div className="value-item">
                <div className="value-icon"><i className="fas fa-users"></i></div>
                <h3>Khách hàng</h3>
                <p>Đặt lợi ích khách hàng lên hàng đầu</p>
              </div>
              <div className="value-item">
                <div className="value-icon"><i className="fas fa-star"></i></div>
                <h3>Chất lượng</h3>
                <p>Chỉ cung cấp sản phẩm chất lượng cao</p>
              </div>
              <div className="value-item">
                <div className="value-icon"><i className="fas fa-handshake"></i></div>
                <h3>Dịch vụ</h3>
                <p>Hỗ trợ khách hàng tận tình, chuyên nghiệp</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-section">
            <div className="container">
              <h2>Thành tích của chúng tôi</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">50,000+</div>
                  <div className="stat-label">Khách hàng hài lòng</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Năm kinh nghiệm</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Sản phẩm đa dạng</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Hỗ trợ khách hàng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

