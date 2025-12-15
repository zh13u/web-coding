'use client';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max giá mới? Đánh giá chi tiết",
    summary:
      "Khám phá những tính năng mới nhất của iPhone 15 Pro Max với chip A17 Pro và camera 48MP...",
    image: "/images/products/iphone-15-pro.jpg",
    date: "15/12/2024",
    category: "Đánh giá",
    readTime: "5 phút",
    content: [
      "Thiết kế titan nhẹ và mát tay hơn thép, viền mỏng giúp màn hình tràn hơn. Cảm giác cầm nắm chắc chắn nhưng không nặng tay.",
      "Chip A17 Pro hỗ trợ ray tracing phần cứng: chơi game mượt, hình ảnh đổ bóng chân thực hơn. App nặng mở nhanh hơn rõ rệt so với thế hệ trước.",
      "Camera chính 48MP cho chi tiết tốt trong thiếu sáng; Tele 5x đủ cho chụp chân dung và cảnh xa. Màu ảnh ít ám vàng, da người tự nhiên.",
      "Pin dùng được trọn ngày với 6–7h onscreen; sạc USB-C thuận tiện, hỗ trợ chuyển dữ liệu và dùng chung cáp nhiều thiết bị.",
      "Hợp với người cần hiệu năng cao, thích chụp ảnh và muốn thiết bị bền, cao cấp; nếu cần giá mềm hơn có thể cân nhắc 15/15 Plus.",
    ],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra: AI thông minh mới",
    summary:
      "Galaxy S24 Ultra trang bị AI tích hợp giúp chụp ảnh và chỉnh sửa thông minh hơn...",
    image: "/images/products/samsung-s24-ultra.jpg",
    date: "12/12/2024",
    category: "Đánh giá",
    readTime: "4 phút",
    content: [
      "Galaxy AI hỗ trợ gợi ý khung hình, xóa vật thể và tạo caption ngay trên máy, không cần app ngoài.",
      "Màn hình LTPO 120Hz rất sáng, đọc ngoài trời tốt; S Pen vẫn là lợi thế lớn cho ghi chú và ký nhanh.",
      "Camera tele 10x sắc nét, cân bằng màu tự nhiên hơn; ảnh thiếu sáng bớt noise nhờ ISP và AI xử lý mới.",
      "Pin 5000mAh đủ 1 ngày; sạc nhanh 45W ổn, nhưng nên dùng củ sạc PD chuẩn để đạt tốc độ cao.",
      "Phù hợp người thích bút, cần màn hình lớn và camera đa dụng; nếu muốn gọn hơn, cân nhắc S24/S24+.",
    ],
  },
  {
    id: 3,
    title: "Xu hướng điện thoại 2024: Những gì cần biết",
    summary:
      "Tổng hợp những xu hướng công nghệ điện thoại nổi bật trong năm 2024...",
    image: "/images/products/vivo-x100.jpg",
    date: "10/12/2024",
    category: "Xu hướng",
    readTime: "6 phút",
    content: [
      "Camera AI với xử lý siêu phân giải và chân dung tốt hơn sẽ thành chuẩn mới, đặc biệt ở máy tầm trung cao.",
      "Màn hình 1.5K/120Hz phổ biến hơn, cạnh cong nhẹ giảm phản chiếu; kính cường lực thế hệ mới tăng độ bền.",
      "Sạc nhanh 80–120W xuất hiện nhiều hơn, nhưng hãng cũng tối ưu sạc chậm/đêm để bảo vệ pin.",
      "Thiết kế mỏng, viền siêu mỏng và màu pastel được ưa chuộng; chất liệu giả da/kim loại nhẹ quay lại.",
      "Kết nối vệ tinh và AI on-device sẽ dần phổ biến, hỗ trợ dịch, tóm tắt và tìm kiếm thông minh trên máy.",
    ],
  },
  {
    id: 4,
    title: "Cách chọn điện thoại phù hợp với ngân sách",
    summary:
      "Hướng dẫn chi tiết cách chọn điện thoại phù hợp với nhu cầu và ngân sách...",
    image: "/images/products/samsung-a55.jpg",
    date: "08/12/2024",
    category: "Hướng dẫn",
    readTime: "8 phút",
    content: [
      "Xác định nhu cầu chính: chụp ảnh, chơi game hay làm việc. Mỗi nhu cầu ưu tiên khác nhau về chip, camera, màn và pin.",
      "Tầm giá 5–8 triệu: ưu tiên chip ổn định, màn 90/120Hz, pin ≥5000mAh; camera chính OIS nếu có càng tốt.",
      "Tầm 10–15 triệu: chọn máy có camera chính tốt, ống góc rộng hữu dụng, sạc nhanh 67–80W; màn 1.5K sẽ sắc nét hơn.",
      "Flagship cũ (1–2 năm) vẫn đáng cân nhắc nếu bạn cần chip mạnh, camera tốt nhưng chấp nhận pin/sạc không mới nhất.",
      "Luôn kiểm tra chế độ bảo hành, cập nhật phần mềm (ít nhất 3 năm) và phụ kiện đi kèm trước khi mua.",
    ],
  },
  {
    id: 5,
    title: "Xiaomi 14 Pro: Camera Leica chuyên nghiệp",
    summary:
      "Đánh giá chi tiết camera Leica trên Xiaomi 14 Pro với khả năng chụp ảnh chuyên nghiệp...",
    image: "/images/products/xiaomi-14.jpg",
    date: "05/12/2024",
    category: "Đánh giá",
    readTime: "5 phút",
    content: [
      "Ống kính Leica cho màu tự nhiên, độ tương phản cân bằng; Portrait tách nền mượt và ít viền halo.",
      "Snapdragon 8 Gen 3 đảm bảo hiệu năng mạnh, tản nhiệt ổn; game nặng vẫn giữ FPS ổn định.",
      "Pin đủ 1 ngày, sạc nhanh 120W đầy trong ~20 phút; sạc không dây 50W tiện cho bàn làm việc.",
      "Màn hình 1.5K sáng, hiển thị ngoài trời rõ; loa kép cân bằng, bass khá tốt trong tầm giá.",
      "Phù hợp người thích chụp ảnh màu sắc trung tính và cần máy hiệu năng cao cho công việc/làm nội dung.",
    ],
  },
  {
    id: 6,
    title: "Bảo vệ điện thoại: 5 cách đơn giản",
    summary:
      "Những mẹo đơn giản giúp bảo vệ điện thoại khỏi hư hỏng và tăng tuổi thọ...",
    image: "/images/products/realme-12-pro-plus.jpg",
    date: "03/12/2024",
    category: "Mẹo hay",
    readTime: "3 phút",
    content: [
      "Dùng ốp và dán màn hình tốt để tránh trầy xước, va đập nhẹ; kiểm tra keo dán không ảnh hưởng cảm ứng.",
      "Hạn chế sạc qua đêm liên tục; khi có thời gian, dùng sạc chậm để giảm nhiệt và bảo vệ pin.",
      "Vệ sinh cổng sạc/loa bằng tăm bông khô, tránh vật nhọn; giữ máy khô ráo, không để gần nguồn nhiệt.",
      "Bật tìm thiết bị và sao lưu định kỳ để tránh mất dữ liệu khi hư hỏng hoặc thất lạc.",
    ],
  },
];

export default function NewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const newsId = Number(params.id);
  const news = newsData.find((item) => item.id === newsId);
  const related = newsData.filter((item) => item.id !== newsId).slice(0, 3);

  if (!news) {
    notFound();
  }

  return (
    <div className="news-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/news">Tin tức</Link>
          <span>›</span>
          <span>{news!.title}</span>
        </nav>

        <section className="news-hero">
          <div className="news-hero__content">
            <div className="news-hero__meta">
              <span className="news-category-pill">{news!.category}</span>
              <div className="news-hero__meta-items">
                <span>
                  <i className="fas fa-calendar" /> {news!.date}
                </span>
                <span>
                  <i className="fas fa-clock" /> {news!.readTime}
                </span>
              </div>
            </div>
            <h1 className="news-hero__title">{news!.title}</h1>
            <p className="news-hero__summary">{news!.summary}</p>
            <div className="news-hero__cta">
              <Link href="/news" className="btn btn-outline">
                ← Quay lại danh sách
              </Link>
              <Link href="/products" className="btn btn-primary">
                Xem sản phẩm nổi bật
              </Link>
            </div>
          </div>
          <div className="news-hero__image">
            <Image
              src={news!.image}
              alt={news!.title}
              width={900}
              height={560}
              className="w-full h-full object-cover"
              priority
              quality={95}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>

        <article className="news-detail-content">
          {news!.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </article>

        <section className="related-news">
          <div className="related-header">
            <h3>Bài viết liên quan</h3>
            <Link href="/news" className="link-muted">
              Xem tất cả →
            </Link>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="related-card"
              >
                <div className="related-thumb">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                  <span className="related-pill">{item.category}</span>
                </div>
                <div className="related-body">
                  <p className="related-date">
                    <i className="fas fa-calendar" /> {item.date} • {item.readTime}
                  </p>
                  <h4>{item.title}</h4>
                  <p className="related-summary">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
