# 📚 Các Tính Năng Code Nâng Cao Trong Đồ Án PhoneStore

Tài liệu này giải thích các phần code nâng cao trong đồ án để bạn có thể trình bày với giáo viên.

---

## 🎯 1. Custom Hook với Generic Types (TypeScript Nâng Cao)

### File: `src/hooks/useLocalStorage.ts`

**Đây là phần code nâng cao nhất trong đồ án!**

### Giải thích:

```6:47:src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State để lưu giá trị hiện tại
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lấy giá trị từ localStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON nếu có, không thì dùng giá trị mặc định
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Nếu có lỗi, trả về giá trị mặc định
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function để cập nhật giá trị
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép value là function hoặc giá trị trực tiếp
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Cập nhật state
      setStoredValue(valueToStore);
      
      // Lưu vào localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function để xóa giá trị
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}
```

### Điểm nâng cao:

1. **Generic Type `<T>`**: 
   - Cho phép hook hoạt động với bất kỳ kiểu dữ liệu nào (string, number, object, array...)
   - Đảm bảo type safety - TypeScript sẽ kiểm tra kiểu dữ liệu tự động

2. **Lazy Initialization với Function**:
   - `useState(() => {...})` - Chỉ chạy 1 lần khi component mount
   - Tối ưu performance vì không parse JSON mỗi lần render

3. **Function Overload**:
   - `setValue` có thể nhận giá trị trực tiếp HOẶC function: `setValue(x => x + 1)`
   - Giống như `setState` của React

4. **Error Handling**:
   - Try-catch để xử lý lỗi khi localStorage bị disable hoặc hết dung lượng

5. **`as const`**:
   - Đảm bảo return type chính xác cho TypeScript

### Cách trình bày với giáo viên:

> "Em đã tạo một custom hook `useLocalStorage` sử dụng Generic Types của TypeScript. Hook này có thể tái sử dụng với bất kỳ kiểu dữ liệu nào, đảm bảo type safety và tự động đồng bộ với localStorage. Đây là một pattern nâng cao trong React và TypeScript."

---

## 🚀 2. Debounce và Throttle Functions (Performance Optimization)

### File: `src/utils/index.ts`

### Giải thích:

```104:131:src/utils/index.ts
// Debounce function (trì hoãn thực thi)
export const debounce = <T extends (...args: unknown[]) => unknown>(
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
export const throttle = <T extends (...args: unknown[]) => unknown>(
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
```

### Điểm nâng cao:

1. **Debounce**:
   - Trì hoãn việc thực thi function cho đến khi người dùng ngừng nhập
   - Ví dụ: Khi search, không gọi API mỗi lần gõ phím, mà đợi 300ms sau khi ngừng gõ
   - Giảm số lần gọi API từ 10 lần xuống còn 1 lần

2. **Throttle**:
   - Giới hạn số lần function được gọi trong một khoảng thời gian
   - Ví dụ: Scroll event chỉ được xử lý tối đa 1 lần/100ms

3. **Generic Types với Constraints**:
   - `<T extends (...args: unknown[]) => unknown>` - Chỉ chấp nhận function
   - `Parameters<T>` - Lấy type của tham số từ function type

### Ứng dụng trong đồ án:

```39:49:src/components/SearchSuggestions.tsx
  // Debounced search function
  const debouncedSearch = debounce((searchQuery: string) => {
    if (searchQuery.trim()) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, 300);
```

### Cách trình bày với giáo viên:

> "Em đã implement Debounce và Throttle functions để tối ưu performance. Khi người dùng tìm kiếm, thay vì filter mỗi lần gõ phím, em sử dụng debounce để đợi 300ms sau khi ngừng gõ mới thực hiện filter. Điều này giảm đáng kể số lần xử lý không cần thiết và cải thiện trải nghiệm người dùng."

---

## ⌨️ 3. Keyboard Navigation trong Search Suggestions

### File: `src/components/SearchSuggestions.tsx`

### Giải thích:

```70:96:src/components/SearchSuggestions.tsx
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) handleSuggestionClick(suggestions[selectedIndex]);
        else {
          onSearch(query);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };
```

### Điểm nâng cao:

1. **Keyboard Accessibility**:
   - Hỗ trợ điều hướng bằng phím mũi tên (Arrow keys)
   - Enter để chọn, Escape để đóng
   - Tuân thủ chuẩn accessibility (WCAG)

2. **useRef để quản lý DOM**:
   ```20:21:src/components/SearchSuggestions.tsx
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
   ```
   - Truy cập DOM element trực tiếp mà không re-render

3. **Blur Handling với setTimeout**:
   ```106:113:src/components/SearchSuggestions.tsx
  const handleBlur = () => {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };
   ```
   - Delay 150ms để cho phép click vào suggestion trước khi đóng dropdown

### Cách trình bày với giáo viên:

> "Em đã implement keyboard navigation cho search suggestions, cho phép người dùng điều hướng bằng phím mũi tên và chọn bằng Enter. Đây là một tính năng UX nâng cao giúp website dễ sử dụng hơn và tuân thủ các chuẩn accessibility."

---

## 🔄 4. Product Comparison Component (Dynamic Rendering)

### File: `src/components/ProductComparison.tsx`

### Giải thích:

```76:91:src/components/ProductComparison.tsx
        <div className="comparison-table">
          <div className="comparison-specs">
            {comparisonSpecs.map((spec) => (
              <div key={spec.key} className="spec-row">
                <div className="spec-label">{spec.label}</div>
                {comparisonItems.map((product) => (
                  <div key={`${spec.key}-${product.id}`} className="spec-value">
                    {spec.key === 'price' ? formatPrice(product.price) :
                     spec.key === 'badge' ? (product.badge ? <Badge text={product.badge} type="success" /> : '-') :
                     spec.key === 'inStock' ? (product.inStock ? 'Còn hàng' : 'Hết hàng') :
                     product[spec.key as keyof Product] || '-'}
                  </div>
                ))}
              </div>
            ))}
          </div>
```

### Điểm nâng cao:

1. **Nested Mapping**:
   - Map qua specs, trong mỗi spec lại map qua products
   - Tạo bảng so sánh động

2. **Conditional Rendering phức tạp**:
   - Sử dụng ternary operator để render khác nhau cho từng loại dữ liệu
   - Type assertion: `product[spec.key as keyof Product]`

3. **Type Safety với `keyof`**:
   - `keyof Product` đảm bảo chỉ truy cập các key hợp lệ của Product

### Cách trình bày với giáo viên:

> "Component ProductComparison sử dụng nested mapping và conditional rendering để tạo bảng so sánh động. Em sử dụng `keyof` operator của TypeScript để đảm bảo type safety khi truy cập properties của object."

---

## 🌙 5. Dark Mode với Persistent State

### File: `src/components/DarkModeToggle.tsx`

### Giải thích:

```6:20:src/components/DarkModeToggle.tsx
export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('darkMode', false);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
```

### Điểm nâng cao:

1. **Kết hợp Custom Hook**:
   - Sử dụng `useLocalStorage` để lưu preference của người dùng
   - Dark mode được lưu và tự động restore khi reload trang

2. **DOM Manipulation với useEffect**:
   - Thêm/xóa class `dark` vào `<html>` element
   - Tailwind CSS sẽ tự động áp dụng dark mode styles

3. **Side Effect Management**:
   - useEffect chỉ chạy khi `isDarkMode` thay đổi
   - Cleanup không cần thiết vì chỉ thêm/xóa class

### Cách trình bày với giáo viên:

> "Em đã implement Dark Mode với persistent state sử dụng localStorage. Khi người dùng chuyển đổi dark mode, preference được lưu và tự động restore khi họ quay lại website. Em sử dụng useEffect để quản lý side effect khi thay đổi theme."

---

## 🛒 6. Advanced Cart Logic với Immutable Updates

### File: `src/hooks/useLocalStorage.ts` (useCart hook)

### Giải thích:

```62:86:src/hooks/useLocalStorage.ts
  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    variant: string;
    image: string;
  }) => {
    setCartItems(prevItems => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.variant === product.variant
      );

      if (existingItem) {
        // Nếu đã có, tăng số lượng
        return prevItems.map(item =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
```

### Điểm nâng cao:

1. **Immutable Updates**:
   - Không mutate state trực tiếp
   - Luôn tạo array/object mới: `[...prevItems, newItem]` hoặc `prevItems.map(...)`

2. **Functional Update Pattern**:
   - `setCartItems(prevItems => ...)` - Nhận previous state làm tham số
   - Đảm bảo luôn có state mới nhất

3. **Complex Logic với find và map**:
   - Tìm item đã tồn tại
   - Nếu có thì update, không thì thêm mới

4. **Computed Values**:
   ```114:117:src/hooks/useLocalStorage.ts
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
   ```
   - Tính toán tổng từ array, không lưu riêng

### Cách trình bày với giáo viên:

> "Em đã implement cart logic với immutable updates pattern. Khi thêm sản phẩm vào giỏ, em kiểm tra xem sản phẩm đã có chưa. Nếu có thì tăng số lượng, không thì thêm mới. Tất cả đều sử dụng immutable updates để đảm bảo React có thể detect changes và re-render đúng cách."

---

## 📝 7. TypeScript Type System Nâng Cao

### File: `src/types/index.ts`

### Giải thích:

```4:15:src/types/index.ts
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
```

### Điểm nâng cao:

1. **Optional Properties (`?`)**:
   - `oldPrice?` - Property không bắt buộc
   - TypeScript sẽ kiểm tra khi truy cập: `product.oldPrice?.toFixed()`

2. **Union Types**:
   ```36:36:src/types/index.ts
  category: 'review' | 'trend' | 'guide' | 'tips';
   ```
   - Chỉ cho phép một trong các giá trị được liệt kê

3. **Generic Interface**:
   ```107:112:src/types/index.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
   ```
   - Interface có thể tái sử dụng với nhiều kiểu dữ liệu

### Cách trình bày với giáo viên:

> "Em đã sử dụng TypeScript type system một cách toàn diện. Em định nghĩa interfaces cho tất cả các entities, sử dụng optional properties, union types, và generic interfaces. Điều này giúp code an toàn hơn, IDE có autocomplete tốt hơn, và dễ maintain hơn."

---

## 🎨 8. Advanced Filtering và Sorting Logic

### File: `src/utils/index.ts` và `src/app/products/page.tsx`

### Giải thích:

```22:54:src/utils/index.ts
export const filterProducts = (products: Product[], filter: ProductFilter): Product[] => {
  const filtered = products.filter(product => {
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
```

### Điểm nâng cao:

1. **Multiple Filter Conditions**:
   - Kết hợp nhiều điều kiện với `&&`
   - Mỗi filter độc lập, có thể bật/tắt

2. **Case-insensitive Search**:
   - `.toLowerCase()` để tìm kiếm không phân biệt hoa thường

3. **Dynamic Sorting**:
   - Switch case để sắp xếp theo nhiều tiêu chí
   - `localeCompare()` để sắp xếp chuỗi theo locale (hỗ trợ tiếng Việt)

4. **Functional Programming**:
   - Pure function - không mutate input
   - Dễ test và debug

### Cách trình bày với giáo viên:

> "Em đã implement filtering và sorting logic phức tạp. Function `filterProducts` có thể lọc theo nhiều tiêu chí đồng thời (tên, thương hiệu, giá) và sắp xếp theo nhiều cách khác nhau. Em sử dụng functional programming pattern để code dễ đọc và maintain."

---

## 📊 Tổng Kết Các Điểm Nâng Cao

### 1. **TypeScript Advanced Features**:
- ✅ Generic Types
- ✅ Union Types
- ✅ Optional Properties
- ✅ Type Assertions (`as`, `keyof`)
- ✅ Generic Constraints

### 2. **React Advanced Patterns**:
- ✅ Custom Hooks
- ✅ useRef cho DOM manipulation
- ✅ useEffect với dependencies
- ✅ Functional Updates
- ✅ Immutable State Updates

### 3. **Performance Optimization**:
- ✅ Debounce
- ✅ Throttle
- ✅ Lazy Initialization
- ✅ Memoization (implicit với React)

### 4. **UX/UI Advanced Features**:
- ✅ Keyboard Navigation
- ✅ Accessibility (ARIA)
- ✅ Dark Mode với persistence
- ✅ Search Suggestions với debounce

### 5. **Code Quality**:
- ✅ Error Handling
- ✅ Type Safety
- ✅ Reusable Components
- ✅ Separation of Concerns

---

## 💡 Câu Hỏi Giáo Viên Có Thể Hỏi và Cách Trả Lời

### Q1: "Tại sao em sử dụng Generic Types trong useLocalStorage?"

**Trả lời:**
> "Generic Types cho phép hook tái sử dụng với bất kỳ kiểu dữ liệu nào. Ví dụ, em có thể dùng `useLocalStorage<string>('name', '')` hoặc `useLocalStorage<Product[]>('cart', [])`. TypeScript sẽ tự động kiểm tra type, giúp code an toàn hơn và IDE có autocomplete tốt hơn."

### Q2: "Debounce hoạt động như thế nào?"

**Trả lời:**
> "Debounce trì hoãn việc thực thi function cho đến khi người dùng ngừng trigger event trong một khoảng thời gian. Ví dụ, khi search với debounce 300ms, nếu người dùng gõ 10 ký tự trong 1 giây, function chỉ được gọi 1 lần sau khi họ ngừng gõ 300ms, thay vì 10 lần. Điều này giảm đáng kể số lần xử lý không cần thiết."

### Q3: "Tại sao em không mutate state trực tiếp?"

**Trả lời:**
> "React sử dụng shallow comparison để detect state changes. Nếu em mutate state trực tiếp (ví dụ: `cartItems.push(item)`), React sẽ không phát hiện thay đổi vì reference của array không đổi. Em phải tạo array mới (`[...cartItems, item]`) để React biết state đã thay đổi và re-render component."

### Q4: "useRef khác useState như thế nào?"

**Trả lời:**
> "useState tạo state và trigger re-render khi thay đổi. useRef lưu giá trị mà không trigger re-render. Em dùng useRef để lưu reference đến DOM elements (như inputRef) hoặc lưu giá trị cần persist qua các lần render nhưng không cần hiển thị trên UI."

### Q5: "Tại sao em sử dụng TypeScript thay vì JavaScript thuần?"

**Trả lời:**
> "TypeScript giúp em phát hiện lỗi ngay khi code, không phải đợi đến khi chạy. Nó cung cấp autocomplete tốt hơn, giúp code dễ đọc và maintain hơn. Trong đồ án, em sử dụng interfaces để định nghĩa structure của data, giúp đảm bảo type safety và giảm bugs."

---

## 🎓 Kết Luận

Đồ án của bạn có nhiều phần code nâng cao thể hiện:
- ✅ Hiểu biết về TypeScript và type system
- ✅ Nắm vững React patterns và best practices
- ✅ Quan tâm đến performance optimization
- ✅ Chú ý đến UX/UI và accessibility
- ✅ Code quality và maintainability

Chúc bạn bảo vệ đồ án thành công! 🎉


