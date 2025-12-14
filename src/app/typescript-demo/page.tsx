'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Trang này chỉ giải thích TypeScript bằng chữ,
 * không còn phần demo code phức tạp để tránh làm nặng đồ án.
 */
export default function TypeScriptDemoPage() {
  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container">
          <h1>TypeScript trong đồ án</h1>
          <p>
            Dự án dùng TypeScript ở mức cơ bản: định nghĩa kiểu cho dữ liệu
            (sản phẩm, giỏ hàng, đơn hàng) và props của component. Không dùng
            generic phức tạp trong luồng chính của website.
          </p>
        </div>
      </section>

      <section className="typescript-demo">
        <div className="container">
          <h2>Bạn có thể trả lời giảng viên như sau:</h2>
          <ul>
            <li>
              Em dùng TypeScript để khai báo kiểu cho sản phẩm, giỏ hàng, đơn
              hàng. Ví dụ: mỗi sản phẩm có id, name, price, description...
            </li>
            <li>
              Khi truyền dữ liệu giữa các component (ví dụ từ trang Products
              sang ProductCard), TypeScript giúp kiểm tra đúng kiểu và tránh
              lỗi.
            </li>
            <li>
              Phần TypeScript nâng cao (generic, debounce, v.v.) em chỉ dùng
              để tham khảo học thêm, không nằm trong luồng chính của đồ án.
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
