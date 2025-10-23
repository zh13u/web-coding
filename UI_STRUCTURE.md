# Cấu trúc Giao diện PhoneStore

## Tổng quan
Dự án PhoneStore được xây dựng với Next.js, TypeScript và Tailwind CSS, có giao diện responsive và user-friendly.

## Cấu trúc File và Giao diện

### 1. **Layout và Navigation**
**File:** `src/app/layout.tsx`
- **Chức năng:** Layout chính của ứng dụng
- **Giao diện:** Thiết lập metadata, fonts, và global CSS
- **Đặc điểm:** Import Font Awesome, Inter font, và globals.css

**File:** `src/components/Header.tsx`
- **Chức năng:** Header navigation với logo, menu, search, user dropdown
- **Giao diện:** 
  - Logo PhoneStore bên trái
  - Navigation menu (Trang chủ, Sản phẩm, Tin tức, Khuyến mãi, Liên hệ)
  - Search bar với suggestions
  - User dropdown (Tài khoản, Đơn hàng, Đổi mật khẩu, Đăng xuất)
  - Icons: Giỏ hàng, Yêu thích, So sánh, Dark mode
- **CSS:** `.header`, `.navbar`, `.user-dropdown`, `.dropdown-menu`

**File:** `src/components/Footer.tsx`
- **Chức năng:** Footer với thông tin cửa hàng, links, social media
- **Giao diện:** 4 cột: Thông tin, Danh mục, Hỗ trợ, Liên hệ

### 2. **Trang chủ (Homepage)**
**File:** `src/app/page.tsx`
- **Giao diện:** 
  - Hero section với banner và CTA button
  - Feature cards (3 cột): Giao hàng nhanh, Bảo hành, Hỗ trợ 24/7
  - Products grid với ProductCard components
  - Newsletter signup section
- **CSS:** `.hero-section`, `.features-grid`, `.products-grid`, `.newsletter`

### 3. **Sản phẩm**
**File:** `src/app/products/page.tsx`
- **Giao diện:**
  - Page header với breadcrumb
  - Filters sidebar: Thương hiệu, Khoảng giá, Sắp xếp
  - Products grid responsive
  - Pagination
- **CSS:** `.page-header`, `.filters-sidebar`, `.products-grid`, `.pagination`

**File:** `src/app/products/[id]/page.tsx`
- **Giao diện:**
  - Product images gallery
  - Product info: tên, giá, mô tả, variants
  - Quantity selector
  - Add to cart/Buy now buttons
  - Product specifications table
  - Reviews section
- **CSS:** `.product-detail`, `.product-gallery`, `.product-info`, `.specs-table`

### 4. **Giỏ hàng và Checkout**
**File:** `src/app/cart/page.tsx`
- **Giao diện:**
  - Cart items list với CartItem components
  - Quantity controls và remove buttons
  - Order summary: subtotal, discount, total
  - Coupon input
  - Checkout button
- **CSS:** `.cart-content`, `.cart-item`, `.order-summary`

**File:** `src/app/checkout/page.tsx`
- **Giao diện:**
  - Customer information form
  - Order summary
  - Payment method selection
  - Place order button
- **CSS:** `.checkout-form`, `.form-group`, `.form-row`

### 5. **Tài khoản và Đơn hàng**
**File:** `src/app/orders/page.tsx`
- **Giao diện:**
  - Order status filters (Tất cả, Chờ xử lý, Đang giao, etc.)
  - Orders list với order cards
  - Order details: items, status, total
  - Cancel order button
- **CSS:** `.orders-content`, `.order-card`, `.status-badge`

**File:** `src/app/wishlist/page.tsx`
- **Giao diện:**
  - Wishlist items grid
  - Add to cart buttons
  - Remove from wishlist
  - Recommended products section
- **CSS:** `.wishlist-grid`, `.wishlist-item`

### 6. **Admin Dashboard**
**File:** `src/app/admin/page.tsx`
- **Giao diện:**
  - Stats cards: Users, Products, Orders, Revenue, Ratings, Reviews
  - Charts section: Revenue chart, Top products
  - Recent activity: New users, Recent reviews
  - Quick actions: Links to management pages
- **CSS:** `.admin-content`, `.stats-grid`, `.stat-card`, `.charts-section`

**File:** `src/app/admin/products/page.tsx`
- **Giao diện:**
  - Search and filter controls
  - Products table với actions (Edit, Delete)
  - Add product button
  - Product form modal
- **CSS:** `.admin-products`, `.products-table`, `.table-header`, `.table-row`

**File:** `src/app/admin/categories/page.tsx`
- **Giao diện:**
  - Categories grid layout
  - Category cards với image, name, description, stats
  - Add/Edit/Delete actions
  - Category form modal
- **CSS:** `.admin-categories`, `.categories-grid`, `.category-card`

**File:** `src/app/admin/customers/page.tsx`
- **Giao diện:**
  - Customers table với customer info, stats, actions
  - Search and status filters
  - Customer summary stats
  - Enable/Disable và Delete actions
- **CSS:** `.admin-customers`, `.customers-table`, `.customer-info`

**File:** `src/app/admin/orders/page.tsx`
- **Giao diện:**
  - Orders table với order details
  - Status update buttons
  - Customer information
  - Order items list
- **CSS:** `.admin-orders`, `.order-card`, `.order-items`

**File:** `src/app/admin/accounts/page.tsx`
- **Giao diện:**
  - Admin accounts table
  - Role badges (Super Admin, Product Manager, etc.)
  - Add/Edit/Delete admin accounts
  - Status management
- **CSS:** `.admin-accounts`, `.admins-table`, `.role-badge`

### 7. **Components**
**File:** `src/components/ProductCard.tsx`
- **Giao diện:** Card hiển thị sản phẩm với image, name, price, add to cart button
- **CSS:** `.product-card`, `.product-image`, `.product-info`

**File:** `src/components/AuthModal.tsx`
- **Giao diện:** Modal đăng nhập/đăng ký với form validation
- **CSS:** `.modal-overlay`, `.modal-content`, `.auth-form`

**File:** `src/components/ChangePasswordModal.tsx`
- **Giao diện:** Modal đổi mật khẩu với form validation
- **CSS:** `.change-password-form`

**File:** `src/components/CartItem.tsx`
- **Giao diện:** Item trong giỏ hàng với quantity controls
- **CSS:** `.cart-item`, `.item-image`, `.item-info`, `.quantity-controls`

**File:** `src/components/ProductDetail.tsx`
- **Giao diện:** Chi tiết sản phẩm với variants, specs, features
- **CSS:** `.product-detail`, `.variants`, `.specs-table`

### 8. **Styling và CSS**
**File:** `src/app/globals.css`
- **Chức năng:** Global styles, component styles, responsive design
- **Cấu trúc:**
  - Tailwind CSS imports
  - Reset styles
  - Component styles (Header, Footer, Products, Admin, etc.)
  - Responsive media queries
  - Dark mode support
  - Form styles
  - Button styles
  - Modal styles
  - Table styles

## Responsive Design

### Breakpoints:
- **Desktop:** > 768px - Grid layouts, sidebars
- **Tablet:** 768px - Stacked layouts, adjusted spacing
- **Mobile:** < 480px - Single column, full-width buttons

### Key Features:
- Mobile-first approach
- Flexible grid systems
- Responsive typography
- Touch-friendly buttons
- Optimized images
- Collapsible navigation

## Color Scheme
- **Primary:** #2563eb (Blue)
- **Secondary:** #6b7280 (Gray)
- **Success:** #10b981 (Green)
- **Warning:** #f59e0b (Orange)
- **Error:** #ef4444 (Red)
- **Background:** #f8fafc (Light Gray)

## Typography
- **Font Family:** Inter, system fonts
- **Headings:** 1.5rem - 3rem, font-weight 600-700
- **Body:** 1rem, line-height 1.6
- **Small:** 0.875rem for captions

## Icons
- **Font Awesome 6.0.0** cho tất cả icons
- **Categories:** User, Shopping, Navigation, Actions, Status

