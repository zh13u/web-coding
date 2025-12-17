# BÁO CÁO ĐỒ ÁN: PHONESTORE (FRONTEND DEMO)

## 1. Giới thiệu
PhoneStore là website mô phỏng bán điện thoại, xây dựng trên Next.js (App Router) + React. Hệ thống không có backend, tất cả dữ liệu (giỏ hàng, wishlist, user, đơn hàng) được lưu tạm bằng localStorage. Mục tiêu là tập trung vào luồng UI/UX và nghiệp vụ thương mại cơ bản.

## 2. Mục tiêu và phạm vi
- Mục tiêu: rèn luyện kỹ năng Next.js App Router, component React, routing động, xử lý state, và mô phỏng nghiệp vụ thương mại điện tử.
- Phạm vi: frontend-only; không có API thật, không có database thật, không có auth thật; tất cả xử lý dữ liệu là giả lập trên localStorage.

## 3. Công nghệ sử dụng
- Next.js (App Router), React (tsx)
- localStorage để lưu trạng thái
- Component UI tái sử dụng (Header, Footer, ProductCard, CartItem, ...)

## 4. Kiến trúc tổng quan
- Dữ liệu sản phẩm đọc từ `src/data/products.ts`.
- Các trang chính:
  - `/` (home)
  - `/products` (danh sách sản phẩm)
  - `/products/[id]` (chi tiết sản phẩm)
  - `/wishlist`
  - `/cart`
  - `/checkout`
  - `/orders`
  - `/policy/*` (trang nội dung tĩnh)

## 5. Mô hình dữ liệu và localStorage
- Product: `id`, `name`, `description`, `price`, `oldPrice?`, `image`, `brand`, `badge`.
- localStorage:
  - `cart`: `{id, name, price, quantity, variant, image}`
  - `wishlist`: `{id, name, price, image, addedAt}`
  - `users`: danh sách user đã đăng ký
  - `currentUser`: user đang đăng nhập
  - `orders`: danh sách đơn đã đặt (giả lập)

## 6. Mô tả chức năng theo trang
- Home `/`: hiển thị 4 sản phẩm demo; “Thêm vào giỏ” chỉ tăng state demo (không ghi localStorage).
- Products `/products`: đọc PRODUCTS, lọc theo search/brand/khoảng giá, sắp xếp; “Thêm vào giỏ” ghi localStorage với variant mặc định.
- Product detail `/products/[id]`: tìm sản phẩm theo id; nếu không có thì thông báo; variants được tạo ngay trong file; “Mua ngay” = thêm giỏ + chuyển sang `/checkout`.
- Wishlist `/wishlist`: đọc/ghi wishlist; xóa item; chuyển sang giỏ hàng (nếu trùng thì tăng quantity).
- Cart `/cart`: đọc/ghi cart qua hook `useLocalStorage`; cập nhật quantity (1-10), xóa item, clear cart; chỉ cho thanh toán khi giỏ hàng có sản phẩm.
- Checkout `/checkout`: nếu giỏ rỗng -> redirect về `/cart`; validate form cơ bản; submit giả lập tạo `orderNumber`, lưu `orders`, clear cart, hiển thị success.
- Orders `/orders`: bắt đăng nhập (đọc `currentUser`); lọc đơn theo email; lọc theo status; hủy đơn bằng cách cập nhật localStorage.
- Policy `/policy/*`: trang tĩnh, chỉ render nội dung chính sách.

## 7. Luồng nghiệp vụ chính
- Tìm kiếm/lọc/sắp xếp: xử lý trên mảng PRODUCTS trước khi render.
- Giỏ hàng: thêm sản phẩm (có variant), tăng/giảm quantity, xóa item, clear cart.
- Checkout: tính subtotal, discount (PHONE10 = 10%, SALE50K tối đa 50k), shipping free nếu >=2tr; lưu order vào localStorage.
- Đơn hàng: hiển thị danh sách theo user, cho phép hủy đơn.

## 8. Component và hook chính
- `Header`: đọc `currentUser`, hiển thị badge giỏ/wishlist, search đẩy URL `/products?q=...`, mở AuthModal.
- `AuthModal`: login/register giả lập với localStorage `users` và `currentUser`.
- `ProductCard`, `ProductDetail`, `CartItem`, `WishlistButton`, `Alert/Loading`: phục vụ UI.
- `useLocalStorage`: đồng bộ state React với localStorage.

## 9. Kịch bản kiểm thử thủ công (để xác nhận logic)
- Thêm sản phẩm vào giỏ từ `/products` và kiểm tra localStorage.
- Cập nhật quantity trong `/cart` (1-10) và tính tổng tiền.
- Mua ngay trong `/products/[id]` và kiểm tra redirect `/checkout`.
- Áp mã PHONE10 và SALE50K, đối chiếu công thức tính discount.
- Tạo order và kiểm tra `orders` được lưu, cart bị clear.
- Đăng nhập, mở `/orders` và lọc theo status.

## 10. Hạn chế
- Không có backend, auth thật, payment thật.
- localStorage có thể mất dữ liệu khi clear browser.
- Kiểm soát bảo mật và đồng bộ đa thiết bị chưa có.

## 11. Hướng phát triển
- Tích hợp API + database thật.
- Auth thật (JWT/OAuth), phân quyền user/admin.
- Thanh toán (VNPay/MoMo/Stripe).
- Dashboard quản lý sản phẩm và đơn hàng.
- Lưu log, thống kê, báo cáo doanh thu.

## 12. Lộ trình học 1 tuần (học từ code)
| Ngày | Mục tiêu | File cần đọc | Sản phẩm |
|------|---------|--------------|---------|
| 1 | Tổng quan route và luồng trang | `web-coding/LOGIC.md`, các page chính | Sơ đồ luồng người dùng |
| 2 | Dữ liệu sản phẩm + render list | `src/data/products.ts`, ProductCard | Mô tả Product + UI list |
| 3 | Search/Filter/Sort | `src/app/products/page.tsx` | Tóm tắt pipeline lọc |
| 4 | Routing động + variants | `src/app/products/[id]/page.tsx` | Mô tả xử lý id + variants |
| 5 | localStorage + Cart | `src/hooks/useLocalStorage.ts`, `src/app/cart/page.tsx` | Mô hình cart + update |
| 6 | Checkout + Orders | `src/app/checkout/page.tsx`, `src/app/orders/page.tsx` | Luồng tạo đơn |
| 7 | Auth giả lập + Header | `src/components/Header.tsx`, `src/components/AuthModal.tsx` | Mô tả auth giả |

## 13. Kết luận
Đồ án hoàn thành được các luồng cơ bản của website thương mại điện tử ở cấp độ frontend demo. Người dùng có thể duyệt sản phẩm, thêm vào giỏ, thanh toán giả lập, và quản lý đơn hàng thông qua localStorage. Hệ thống là nền tảng tốt để mở rộng sang backend và auth thật trong giai đoạn tiếp theo.
