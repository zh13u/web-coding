# Cấu trúc Giao diện PhoneStore

## Tổng quan
Dự án PhoneStore được xây dựng với Next.js, TypeScript và Tailwind CSS; giao diện hướng responsive và thân thiện với người mới học.

## Cấu trúc File và Giao diện

### 1. Layout & Navigation
**File:** `src/app/layout.tsx`
- **Chức năng:** Layout chính của ứng dụng
- **Giao diện:** Thiết lập metadata, fonts, global CSS
- **Điểm chính:** Import Font Awesome, font Inter và `globals.css`

**File:** `src/components/Header.tsx`
- **Chức năng:** Header navigation với logo, menu, search, user dropdown
- **Giao diện:** Logo PhoneStore bên trái; menu (Trang chủ, Sản phẩm, Tin tức, Khuyến mãi, Liên hệ); ô search có gợi ý; user dropdown (Tài khoản, Đơn hàng, Đổi mật khẩu, Đăng xuất); icon Giỏ hàng, Yêu thích, So sánh, Dark mode

**File:** `src/components/Footer.tsx`
- **Chức năng:** Footer với thông tin cửa hàng, links, social media
- **Giao diện:** 4 cột: Thông tin, Danh mục, Hỗ trợ, Liên hệ

### 2. Trang chủ (Homepage)
**File:** `src/app/page.tsx`
- **Giao diện:** Hero section với banner và CTA; feature cards (3 cột: Giao hàng nhanh, Bảo hành, Hỗ trợ 24/7); products grid với `ProductCard`; newsletter signup

### 3. Sản phẩm
**File:** `src/app/products/page.tsx`
- **Giao diện:** Page header với breadcrumb; filters sidebar (Thương hiệu, Khoảng giá, Sắp xếp); products grid responsive; pagination

**File:** `src/app/products/[id]/page.tsx`
- **Giao diện:** Product images gallery; thông tin sản phẩm (tên, giá, mô tả, phiên bản); quantity selector; nút Add to cart / Buy now; bảng thông số; reviews

### 4. Giỏ hàng & Checkout
**File:** `src/app/cart/page.tsx`
- **Giao diện:** Danh sách item với `CartItem`; điều chỉnh số lượng, nút xóa; order summary (subtotal, discount, total); coupon input; nút Checkout

**File:** `src/app/checkout/page.tsx`
- **Giao diện:** Form thông tin khách hàng; order summary; chọn phương thức thanh toán; nút Place order

### 5. Tài khoản & Đơn hàng
**File:** `src/app/orders/page.tsx`
- **Giao diện:** Bộ lọc trạng thái (Tất cả, Chờ xử lý, Đang giao, ...); danh sách đơn hàng; chi tiết đơn: items, trạng thái, tổng tiền; nút hủy đơn

**File:** `src/app/wishlist/page.tsx`
- **Giao diện:** Wishlist items grid; nút Add to cart; Remove; mục gợi ý sản phẩm

### 6. Admin Dashboard
**File:** `src/app/admin/page.tsx`
- **Giao diện:** Stats cards (Users, Products, Orders, Revenue, Ratings, Reviews); charts (Revenue, Top products); recent activity; quick actions

**File:** `src/app/admin/products/page.tsx**
- **Giao diện:** Tìm kiếm, lọc; bảng sản phẩm với Edit/Delete; nút Add product; modal form sản phẩm

**File:** `src/app/admin/categories/page.tsx`
- **Giao diện:** Categories grid; thẻ danh mục với ảnh, tên, mô tả, stats; Add/Edit/Delete; modal form danh mục

**File:** `src/app/admin/customers/page.tsx**
- **Giao diện:** Bảng khách hàng với thông tin, stats, actions; bộ lọc tìm kiếm/trạng thái; số liệu tóm tắt; Enable/Disable và Delete

**File:** `src/app/admin/orders/page.tsx**
- **Giao diện:** Bảng đơn hàng với chi tiết; nút cập nhật trạng thái; thông tin khách; danh sách item

**File:** `src/app/admin/accounts/page.tsx**
- **Giao diện:** Bảng tài khoản admin; role badges (Super Admin, Product Manager, ...); Add/Edit/Delete; quản lý trạng thái

### 7. Components
**File:** `src/components/ProductCard.tsx`
- **Giao diện:** Card hiển thị sản phẩm với image, tên, giá, nút Add to cart

**File:** `src/components/AuthModal.tsx`
- **Giao diện:** Modal đăng nhập/đăng ký với form validation

**File:** `src/components/ChangePasswordModal.tsx`
- **Giao diện:** Modal đổi mật khẩu với form validation

**File:** `src/components/CartItem.tsx`
- **Giao diện:** Item trong giỏ với điều chỉnh số lượng

**File:** `src/components/ProductDetail.tsx`
- **Giao diện:** Chi tiết sản phẩm với variants, specs, features

### 8. Styling & CSS
**File:** `src/app/globals.css`
- **Chức năng:** Global styles, component styles, responsive design
- **Cấu trúc:** Tailwind imports, reset, component styles (Header, Footer, Products, Admin, ...), media queries, dark mode, form styles, button styles, modal styles, table styles
- **Lưu ý:** Ưu tiên Tailwind utilities; chỉ tạo class riêng khi lặp nhiều lần

## Responsive Design
- **Breakpoints:** Desktop > 768px; Tablet 768px; Mobile < 480px
- **Key:** Mobile-first; grid linh hoạt; typography responsive; nút đủ lớn; hình ảnh tối ưu; navigation có thể thu gọn

## Design tokens (đơn giản, dễ áp dụng)
- **Màu:** `primary #2563eb`, `gray #6b7280`, `success #10b981`, `background #f8fafc`, `text #0f172a`; tùy chọn `warning #f59e0b`, `error #ef4444` khi cần.
- **Spacing:** 4px / 8px / 12px / 16px / 24px (Tailwind: `p-1/2/3/4/6`, `gap-2/3/4/6`). Dùng nhất quán cho padding/margin.
- **Radius:** 8px (`rounded-lg`), full cho avatar/icon (`rounded-full`).
- **Shadow:** Nhẹ (`shadow-sm`, `shadow`) cho card/button chính; tránh dùng quá nhiều.
- **Typography:** Font Inter; heading `text-3xl font-bold` cho hero, `text-2xl` cho tiêu đề section; body `text-base leading-relaxed`; phụ `text-sm text-gray-600`.
- **Components mẫu:** 
  - Button chính: `btn-primary = bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition`.
  - Card: `card = rounded-lg bg-white shadow-sm border border-slate-200 p-4`.

## Checklist nhanh (giữ mức cơ bản)
- Responsive: thử ở ≤480px, 768px, desktop; grid chuyển 1 cột trên mobile; padding đủ.
- A11y nhẹ: `aria-label` cho icon-only buttons, giữ focus ring mặc định; form có label rõ.
- Hiệu năng cơ bản: dùng `next/image` cho ảnh lớn, gallery lazy-load; icon tạm thời dùng Font Awesome mặc định.
- Hover/active: thêm state đơn giản cho button/link (đậm màu hơn, underline cho link).
- Kiểm thử thủ công: lướt qua các trang chính (home, products, product detail, cart, checkout) xem spacing, font, nút có dễ bấm không.

## Tính năng cơ bản nên thêm (nhẹ, phù hợp người mới)
- Wishlist/share: nút share/copy link trong trang chi tiết; wishlist đã có, chỉ gắn nút nhanh.
- Rating/review: hiện số sao trung bình + 3-5 review; form gửi review ngắn.
- Lọc giá & sắp xếp: slider/step input cho khoảng giá; sort theo giá/mới nhất.
- Badge khuyến mãi: “Sale/New” trên `ProductCard`; banner promo đơn giản trên homepage.
- Trạng thái đơn hàng: hiển mã đơn + 4 bước (Đặt hàng → Xử lý → Giao → Hoàn tất).
- Checkout cơ bản: validate required; chọn thanh toán (COD + 1 tùy chọn demo); checkbox “Giao tới địa chỉ khác”.
- Loading skeleton: cho grid sản phẩm & gallery chi tiết (bg-gray-200 + animate-pulse).
- Toast đơn giản: thông báo Add to cart, apply coupon, lỗi form.
