# 📱 Hướng Dẫn Lấy URL Hình Ảnh Điện Thoại Thật Từ CellphoneS

## Cách 1: Lấy URL từ CellphoneS (Khuyến nghị - Hình ảnh chính xác nhất)

### Bước 1: Truy cập trang sản phẩm
1. Vào https://cellphones.com.vn/mobile/apple.html (cho iPhone)
2. Hoặc tìm kiếm sản phẩm cụ thể trên CellphoneS

### Bước 2: Mở trang chi tiết sản phẩm
1. Click vào sản phẩm bạn muốn
2. Mở Developer Tools (F12)
3. Vào tab **Network** → Filter: **Img**

### Bước 3: Lấy URL hình ảnh
1. Reload trang (F5)
2. Tìm các request hình ảnh trong Network tab
3. Click chuột phải vào hình ảnh → **Copy image address**
4. URL sẽ có dạng: `https://cdn.cellphones.com.vn/media/...`

### Bước 4: Cập nhật vào code
Dán URL vào file `src/data/products.ts`:

```typescript
{
  id: 1,
  name: "iPhone 15 Pro",
  image: "https://cdn.cellphones.com.vn/media/catalog/product/...",
  // ...
}
```

## Cách 2: Sử dụng URL từ các trang bán điện thoại khác

### Các trang uy tín:
- **CellphoneS**: https://cellphones.com.vn
- **FPT Shop**: https://fptshop.com.vn
- **Thegioididong**: https://thegioididong.com
- **Viettel Store**: https://viettelstore.vn

### Cách lấy URL:
1. Vào trang sản phẩm
2. Click chuột phải vào hình ảnh → **Copy image address**
3. Hoặc dùng Developer Tools như trên

## Cách 3: Sử dụng Unsplash với Photo ID cụ thể

### Danh sách Photo ID Unsplash cho smartphone:

```typescript
// iPhone
"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"

// Samsung
"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80"

// Xiaomi/Android
"https://images.unsplash.com/photo-1510552776732-01acc9a4c20d?auto=format&fit=crop&w=800&q=80"

// Smartphone generic
"https://images.unsplash.com/photo-1601972602237-8c79241e468b?auto=format&fit=crop&w=800&q=80"
"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
```

## Cách 4: Tìm hình ảnh trên Google Images

1. Vào Google Images
2. Tìm kiếm: "iPhone 15 Pro product image"
3. Filter: **Usage rights** → **Labeled for reuse**
4. Click vào hình → **View image**
5. Copy URL

## Cách 5: Sử dụng Pexels/Pixabay

### Pexels:
- Vào https://www.pexels.com/search/phone/
- Tìm hình ảnh phù hợp
- Click vào hình → **Download** hoặc copy URL

### Pixabay:
- Vào https://pixabay.com/images/search/phone/
- Tương tự như Pexels

## Lưu ý quan trọng:

### 1. Bản quyền
- ✅ **CellphoneS/FPT Shop**: Hình ảnh sản phẩm thường có bản quyền, chỉ dùng cho mục đích học tập/demo
- ✅ **Unsplash/Pexels/Pixabay**: Miễn phí, có thể dùng thương mại
- ⚠️ **Google Images**: Cần kiểm tra bản quyền

### 2. Kích thước hình ảnh
- Nên dùng hình ảnh có kích thước tối thiểu: **800x600px**
- Tối ưu: **1200x900px** hoặc lớn hơn
- Format: JPG hoặc WebP

### 3. Tối ưu hiệu suất
- Next.js Image component tự động optimize
- Không cần lo về kích thước quá lớn

## Ví dụ URL từ CellphoneS:

```
https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-15-pro-max-256gb-titanium-natural_1.jpg
```

## Script tự động lấy URL (Nâng cao):

Bạn có thể dùng browser extension hoặc script để tự động lấy URL:

```javascript
// Chạy trong Console của browser (F12)
const images = document.querySelectorAll('img[src*="cellphones"]');
images.forEach(img => console.log(img.src));
```

## Kết luận:

**Cho đồ án học tập**: Dùng URL từ Unsplash/Pexels (miễn phí, không lo bản quyền)

**Cho sản phẩm thật**: Lấy URL từ CellphoneS hoặc các trang bán điện thoại (hình ảnh chính xác nhất)

---

**Cần hỗ trợ thêm?** Hãy cho tôi biết sản phẩm nào bạn muốn tìm hình ảnh, tôi sẽ giúp bạn tìm URL phù hợp!



