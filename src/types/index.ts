// Định nghĩa các kiểu dữ liệu cơ bản cho PhoneStore

// Kiểu dữ liệu cho sản phẩm
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number; // Giá cũ (không bắt buộc)
  image: string;
  brand: string;
  badge?: string; // Nhãn "Mới", "Hot" (không bắt buộc)
  category?: string;
  inStock: boolean;
}

// Kiểu dữ liệu cho giỏ hàng
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
}

// Kiểu dữ liệu cho tin tức
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content?: string;
  image: string;
  date: string;
  category: 'review' | 'trend' | 'guide' | 'tips';
  readTime: string;
  author?: string;
}

// Kiểu dữ liệu cho khuyến mãi
export interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  originalPrice?: number;
  salePrice?: number;
  validUntil: string;
  type: 'flash' | 'combo' | 'cashback' | 'gift';
  isActive: boolean;
}

// Kiểu dữ liệu cho liên hệ
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  subscribeNewsletter?: boolean;
}

// Kiểu dữ liệu cho người dùng
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// Kiểu dữ liệu cho đơn hàng
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
}

// Kiểu dữ liệu cho API response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Kiểu dữ liệu cho filter
export interface ProductFilter {
  searchTerm: string;
  brandFilter: string;
  priceFilter: string;
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest';
}

// Kiểu dữ liệu cho thống kê
export interface Stats {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
}

// Kiểu dữ liệu cho menu navigation
export type MenuItem = {
  label: string;
  href: string;
  active?: boolean;
};

// Kiểu dữ liệu cho button
export type ButtonType = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

// Kiểu dữ liệu cho alert
export type AlertType = 'success' | 'error' | 'warning' | 'info';

// Kiểu dữ liệu cho badge
export type BadgeType = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';
