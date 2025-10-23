# 🛒 PhoneStore - Website Bán Điện Thoại

Một website bán điện thoại hiện đại được xây dựng với **Next.js 15**, **React 19**, **TypeScript** và **Tailwind CSS**.

## 🚀 Tính năng chính

### 👥 Chức năng dành cho khách hàng

#### ✅ Tìm kiếm & Lọc sản phẩm
- **Tìm kiếm theo tên sản phẩm** với gợi ý real-time
- **Lọc theo khoảng giá** (thấp đến cao, cao đến thấp)
- **Phân loại theo thương hiệu** (Apple, Samsung, Xiaomi, OPPO...)
- **Sắp xếp** theo tên, giá, mới nhất

#### ✅ Hiển thị sản phẩm
- **Danh sách sản phẩm** với hình ảnh, tên, giá, giá khuyến mãi
- **Trang chi tiết sản phẩm** với đầy đủ thông tin
- **Thông số kỹ thuật** chi tiết
- **Đánh giá và nhận xét** của khách hàng

#### ✅ Giỏ hàng & Thanh toán
- **Thêm/xóa sản phẩm** vào giỏ hàng
- **Cập nhật số lượng** sản phẩm
- **Tính tổng tiền** tự động
- **Quy trình checkout** hoàn chỉnh
- **Đặt hàng nhanh** không cần tài khoản

#### ✅ Tài khoản người dùng
- **Đăng ký/Đăng nhập** tài khoản
- **Danh sách yêu thích** (Wishlist)
- **Lịch sử đơn hàng** và trạng thái
- **So sánh sản phẩm** side-by-side
- **Đánh giá sản phẩm** với hệ thống sao

#### ✅ Tính năng nâng cao
- **Dark Mode** toggle
- **Toast notifications** 
- **Responsive design** cho mobile
- **Search suggestions** với debouncing

### 🔧 Chức năng dành cho Admin

#### ✅ Dashboard
- **Thống kê tổng quan** (người dùng, sản phẩm, đơn hàng, doanh thu)
- **Biểu đồ doanh thu** theo thời gian
- **Top sản phẩm bán chạy**
- **Hoạt động gần đây**

#### ✅ Quản lý sản phẩm (CRUD)
- **Thêm sản phẩm mới** với form validation
- **Chỉnh sửa thông tin** sản phẩm
- **Xóa sản phẩm** với xác nhận
- **Tìm kiếm & lọc** sản phẩm
- **Upload hình ảnh** sản phẩm

#### ✅ Quản lý đơn hàng
- **Xem danh sách đơn hàng** với bộ lọc
- **Cập nhật trạng thái** đơn hàng
- **Xem thông tin chi tiết** đơn hàng
- **Quản lý khách hàng**

## 🛠 Công nghệ sử dụng

### Frontend
- **Next.js 15** - React framework với App Router
- **React 19** - UI library với hooks mới nhất
- **TypeScript 5** - Type safety và IntelliSense
- **Tailwind CSS 4** - Utility-first CSS framework
- **Font Awesome** - Icon library

### State Management
- **useState/useEffect** - React hooks cơ bản
- **useLocalStorage** - Custom hook cho localStorage
- **Context API** - State management đơn giản

### Utilities
- **Custom Hooks** - Tái sử dụng logic
- **Type Definitions** - TypeScript interfaces
- **Utility Functions** - Format price, date, debounce
- **Responsive Design** - Mobile-first approach

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── page.tsx           # Trang chủ
│   ├── products/          # Trang sản phẩm
│   │   ├── page.tsx       # Danh sách sản phẩm
│   │   └── [id]/page.tsx  # Chi tiết sản phẩm
│   ├── cart/page.tsx      # Giỏ hàng
│   ├── checkout/page.tsx  # Thanh toán
│   ├── wishlist/page.tsx  # Danh sách yêu thích
│   ├── orders/page.tsx    # Lịch sử đơn hàng
│   ├── admin/             # Admin dashboard
│   │   ├── page.tsx       # Dashboard chính
│   │   ├── products/page.tsx  # Quản lý sản phẩm
│   │   └── orders/page.tsx    # Quản lý đơn hàng
│   └── globals.css        # CSS toàn cục
├── components/            # React components
│   ├── Header.tsx         # Header với navigation
│   ├── Footer.tsx         # Footer
│   ├── ProductCard.tsx    # Card sản phẩm
│   ├── CartItem.tsx       # Item trong giỏ hàng
│   ├── AuthModal.tsx      # Modal đăng nhập/đăng ký
│   ├── WishlistButton.tsx # Nút yêu thích
│   ├── ProductReviews.tsx # Đánh giá sản phẩm
│   └── ...               # Các components khác
├── hooks/                 # Custom hooks
│   └── useLocalStorage.ts # Hook cho localStorage
├── types/                 # TypeScript definitions
│   └── index.ts          # Interfaces và types
└── utils/                 # Utility functions
    └── index.ts          # Helper functions
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- **Node.js** 18+ 
- **npm** hoặc **yarn**

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd web-coding

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt tại http://localhost:3000
```

### Build cho production

```bash
# Build ứng dụng
npm run build

# Chạy production server
npm start
```

## 📱 Responsive Design

Website được thiết kế **mobile-first** và tương thích với:
- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+) 
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1440px+)

## 🎨 UI/UX Features

### Design System
- **Color Palette** - Consistent colors
- **Typography** - Font hierarchy
- **Spacing** - Consistent margins/padding
- **Components** - Reusable UI components

### User Experience
- **Loading states** - Skeleton loaders
- **Error handling** - User-friendly error messages
- **Form validation** - Real-time validation
- **Accessibility** - ARIA labels, keyboard navigation

## 🔐 Authentication

### User Features
- **Registration** - Đăng ký tài khoản mới
- **Login** - Đăng nhập với email/password
- **Profile** - Thông tin cá nhân
- **Order History** - Lịch sử mua hàng

### Admin Features
- **Admin Dashboard** - Chỉ admin mới truy cập được
- **Product Management** - CRUD operations
- **Order Management** - Quản lý đơn hàng
- **User Management** - Quản lý người dùng

## 💾 Data Storage

### LocalStorage
- **Cart items** - Giỏ hàng
- **Wishlist** - Danh sách yêu thích
- **User data** - Thông tin người dùng
- **Orders** - Lịch sử đơn hàng
- **Reviews** - Đánh giá sản phẩm

### Mock Data
- **Products** - 8 sản phẩm điện thoại
- **Reviews** - Đánh giá mẫu
- **Orders** - Đơn hàng mẫu

## 🧪 Testing

### Manual Testing
- ✅ **Navigation** - Tất cả links hoạt động
- ✅ **Forms** - Validation và submission
- ✅ **Responsive** - Test trên các device
- ✅ **Browser compatibility** - Chrome, Firefox, Safari

### Features Testing
- ✅ **Search & Filter** - Tìm kiếm và lọc sản phẩm
- ✅ **Cart** - Thêm/xóa/cập nhật sản phẩm
- ✅ **Checkout** - Quy trình thanh toán
- ✅ **Authentication** - Đăng ký/đăng nhập
- ✅ **Admin** - CRUD operations

## 📈 Performance

### Optimization
- **Image optimization** - Next.js Image component
- **Code splitting** - Automatic với Next.js
- **Lazy loading** - Components và images
- **Caching** - LocalStorage caching

### Metrics
- **First Contentful Paint** - < 1.5s
- **Largest Contentful Paint** - < 2.5s
- **Time to Interactive** - < 3.5s

## 🔮 Tính năng tương lai

### Phase 2
- [ ] **Payment Gateway** - Tích hợp VNPay, MoMo
- [ ] **Email Notifications** - Thông báo đơn hàng
- [ ] **Inventory Management** - Quản lý tồn kho
- [ ] **Advanced Analytics** - Google Analytics

### Phase 3
- [ ] **Mobile App** - React Native
- [ ] **API Backend** - Node.js/Express
- [ ] **Database** - PostgreSQL/MongoDB
- [ ] **Real-time Chat** - Customer support

## 🤝 Đóng góp

### Code Style
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Component-based** - Reusable components

### Git Workflow
```bash
# Tạo feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "feat: add new feature"

# Push và tạo PR
git push origin feature/new-feature
```

## 📞 Hỗ trợ

### Liên hệ
- **Email**: support@phonestore.com
- **Phone**: 1900-1234
- **Address**: 123 Đường ABC, Quận 1, TP.HCM

### FAQ
- **Q**: Làm sao để reset password?
- **A**: Click "Quên mật khẩu" trên trang đăng nhập

- **Q**: Có thể đổi trả hàng không?
- **A**: Có, trong vòng 7 ngày với điều kiện hàng còn nguyên vẹn

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

**PhoneStore** - Nơi tìm kiếm điện thoại tốt nhất! 📱✨