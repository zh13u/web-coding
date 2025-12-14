# 📸 Hướng Dẫn Thêm Hình Ảnh Điện Thoại Thật

## Cách 1: Sử dụng hình ảnh từ thư mục public (Khuyến nghị)

### Bước 1: Tải hình ảnh điện thoại
1. Tải hình ảnh điện thoại từ internet hoặc chụp ảnh
2. Đặt tên file theo format: `iphone-15-pro.jpg`, `samsung-s24.jpg`, v.v.

### Bước 2: Tạo thư mục và copy hình ảnh
```bash
# Tạo thư mục
mkdir -p public/images/products

# Copy các file hình ảnh vào thư mục này
# Ví dụ:
# public/images/products/iphone-15-pro.jpg
# public/images/products/samsung-s24-ultra.jpg
# public/images/products/xiaomi-14.jpg
```

### Bước 3: Cập nhật file `src/data/products.ts`

Thay đổi các URL thành đường dẫn local:

```typescript
{
  id: 1,
  name: "iPhone 15 Pro",
  image: "/images/products/iphone-15-pro.jpg", // Đường dẫn từ public folder
  // ...
}
```

## Cách 2: Sử dụng URL hình ảnh từ internet

### Nguồn hình ảnh miễn phí:
1. **Unsplash**: https://unsplash.com/s/photos/smartphone
2. **Pexels**: https://www.pexels.com/search/phone/
3. **Pixabay**: https://pixabay.com/images/search/phone/

### Cách lấy URL:
1. Vào một trong các trang trên
2. Tìm hình ảnh điện thoại phù hợp
3. Click vào hình → Copy image address
4. Dán URL vào file `src/data/products.ts`

### Ví dụ:
```typescript
{
  id: 1,
  name: "iPhone 15 Pro",
  image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
  // ...
}
```

## Cách 3: Sử dụng API Unsplash (Tự động)

Bạn có thể sử dụng Unsplash API để lấy hình ảnh tự động:

```typescript
// Ví dụ với Unsplash API
const getPhoneImage = (phoneName: string) => {
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(phoneName)}`;
};

// Sử dụng:
{
  id: 1,
  name: "iPhone 15 Pro",
  image: getPhoneImage("iPhone 15 Pro"),
  // ...
}
```

## Danh sách URL hình ảnh điện thoại gợi ý:

### iPhone
- iPhone 15 Pro: `https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80`
- iPhone 15: `https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80`

### Samsung
- Galaxy S24 Ultra: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80`
- Galaxy A55: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80`

### Xiaomi
- Xiaomi 14: `https://images.unsplash.com/photo-1510552776732-01acc9a4c20d?auto=format&fit=crop&w=800&q=80`
- Redmi Note 13: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80`

### Các hãng khác
- OPPO Find X7: `https://images.unsplash.com/photo-1601972602237-8c79241e468b?auto=format&fit=crop&w=800&q=80`
- Pixel 8 Pro: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80`

## Lưu ý quan trọng:

1. **Kích thước hình ảnh**: Nên sử dụng hình ảnh có kích thước khoảng 800x600px hoặc lớn hơn
2. **Format**: Nên dùng JPG hoặc WebP để tối ưu dung lượng
3. **Tên file**: Không dùng khoảng trắng, dùng dấu gạch ngang (-)
4. **Next.js Image**: Đã sử dụng component `<Image>` của Next.js để tự động optimize

## Kiểm tra sau khi thêm:

1. Chạy lại server: `npm run dev`
2. Mở trang `/products` để xem hình ảnh
3. Nếu hình ảnh không hiển thị, kiểm tra:
   - Console trong Developer Tools (F12)
   - Đường dẫn hình ảnh có đúng không
   - File hình ảnh có tồn tại không

## Nếu vẫn gặp vấn đề:

Hãy cho tôi biết:
1. Bạn muốn sử dụng cách nào? (Local files hay URL)
2. Bạn đã có hình ảnh chưa?
3. Có lỗi gì trong console không?

Tôi sẽ giúp bạn sửa ngay!



