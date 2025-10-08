// Các hàm tiện ích đơn giản với TypeScript

import { Product, ProductFilter } from '@/types';

// Format giá tiền VND
export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + 'đ';
};

// Format ngày tháng
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('vi-VN');
};

// Tính tổng tiền trong giỏ hàng
export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Lọc sản phẩm theo filter
export const filterProducts = (products: Product[], filter: ProductFilter): Product[] => {
  let filtered = products.filter(product => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = product.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(filter.searchTerm.toLowerCase());
    
    // Lọc theo thương hiệu
    const matchesBrand = !filter.brandFilter || product.brand === filter.brandFilter;
    
    // Lọc theo giá
    const matchesPrice = !filter.priceFilter || checkPriceRange(product.price, filter.priceFilter);
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  // Sắp xếp sản phẩm
  filtered.sort((a, b) => {
    switch (filter.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return filtered;
};

// Kiểm tra giá có trong khoảng không
const checkPriceRange = (price: number, range: string): boolean => {
  const [min, max] = range.split('-').map(Number);
  return price >= min && price <= max;
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate số điện thoại Việt Nam
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[3-9][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Tạo slug từ tiêu đề (cho URL)
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ dấu gạch ngang trùng lặp
    .trim();
};

// Lấy thời gian đọc bài viết (ước tính)
export const getReadingTime = (content: string): string => {
  const wordsPerMinute = 200; // Trung bình 200 từ/phút
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} phút`;
};

// Kiểm tra xem khuyến mãi còn hiệu lực không
export const isPromotionValid = (validUntil: string): boolean => {
  const now = new Date();
  const validDate = new Date(validUntil);
  return validDate > now;
};

// Tạo ID ngẫu nhiên
export const generateId = (): number => {
  return Math.floor(Math.random() * 1000000);
};

// Debounce function (trì hoãn thực thi)
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function (giới hạn tần suất thực thi)
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
