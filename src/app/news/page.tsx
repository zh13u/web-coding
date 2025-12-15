'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "iPhone 15 Pro Max giá mới? Đánh giá chi tiết",
      summary:
        "Khám phá những tính năng mới nhất của iPhone 15 Pro Max với chip A17 Pro và camera 48MP...",
      image: "/images/products/iphone-15-pro.jpg",
      date: "15/12/2024",
      category: "review",
      readTime: "5 phút",
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 Ultra: AI thông minh mới",
      summary:
        "Galaxy S24 Ultra trang bị AI tích hợp giúp chụp ảnh và chỉnh sửa thông minh hơn...",
      image: "/images/products/samsung-s24-ultra.jpg",
      date: "12/12/2024",
      category: "review",
      readTime: "4 phút",
    },
    {
      id: 3,
      title: "Xu hướng điện thoại 2024: Những gì cần biết",
      summary:
        "Tổng hợp những xu hướng công nghệ điện thoại nổi bật trong năm 2024...",
      image: "/images/products/oppo-find-x7.jpg",
      date: "10/12/2024",
      category: "trend",
      readTime: "6 phút",
    },
    {
      id: 4,
      title: "Cách chọn điện thoại phù hợp với ngân sách",
      summary:
        "Hướng dẫn chi tiết cách chọn điện thoại phù hợp với nhu cầu và ngân sách...",
      image: "/images/products/iphone-15.jpg",
      date: "08/12/2024",
      category: "guide",
      readTime: "8 phút",
    },
    {
      id: 5,
      title: "Xiaomi 14 Pro: Camera Leica chuyên nghiệp",
      summary:
        "Đánh giá chi tiết camera Leica trên Xiaomi 14 Pro với khả năng chụp ảnh chuyên nghiệp...",
      image: "/images/products/xiaomi-14.jpg",
      date: "05/12/2024",
      category: "review",
      readTime: "5 phút",
    },
    {
      id: 6,
      title: "Bảo vệ điện thoại: 5 cách đơn giản",
      summary:
        "Những mẹo đơn giản giúp bảo vệ điện thoại khỏi hư hỏng và tăng tuổi thọ...",
      image: "/images/products/realme-12-pro-plus.jpg",
      date: "03/12/2024",
      category: "tips",
      readTime: "3 phút",
    },
  ];

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "review", label: "Đánh giá" },
    { value: "trend", label: "Xu hướng" },
    { value: "guide", label: "Hướng dẫn" },
    { value: "tips", label: "Mẹo hay" },
  ];

  const filteredNews =
    selectedCategory === "all"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <>
      <Header activePage="news" />

      <section className="breadcrumb">
        <div className="container">
          <Link href="/">Trang chủ</Link>
          <span>›</span>
          <span>Tin tức</span>
        </div>
      </section>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Tin tức công nghệ</h1>
          <p>Cập nhật những thông tin mới nhất về điện thoại và công nghệ</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="news-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`filter-btn ${
                  selectedCategory === category.value ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-content">
        <div className="container">
          <div className="news-grid">
            {filteredNews.length === 0 && (
              <div className="no-results">Chưa có bài viết cho mục này.</div>
            )}
            {filteredNews.map((news) => (
              <article key={news.id} className="news-card">
                <div className="news-image">
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover object-center"
                    quality={90}
                    priority={news.id === 1}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="news-category">
                    {getCategoryLabel(news.category)}
                  </div>
                </div>
                <div className="news-content">
                  <h3>{news.title}</h3>
                  <p>{news.summary}</p>
                  <div className="news-meta">
                    <span className="news-date">
                      <i className="fas fa-calendar"></i>
                      {news.date}
                    </span>
                    <span className="news-read-time">
                      <i className="fas fa-clock"></i>
                      {news.readTime}
                    </span>
                  </div>
                  <Link href={`/news/${news.id}`} className="read-more-btn">
                    Đọc thêm
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="load-more-section">
            <button className="btn btn-outline">Xem thêm tin tức</button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <span className="newsletter-pill">Cập nhật mới</span>
            <h2>Đăng ký nhận tin tức</h2>
            <p>Nhận thông tin mới nhất về điện thoại và công nghệ qua email</p>
            <form className="newsletter-form">
              <label htmlFor="newsletter-email" className="sr-only">
                Email nhận tin
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Nhập email của bạn"
                aria-label="Nhập email của bạn"
                required
              />
              <button type="submit" className="btn btn-primary">
                Đăng ký
              </button>
            </form>
            <p className="newsletter-note">
              Không spam. Bạn có thể hủy nhận tin bất kỳ lúc nào.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
