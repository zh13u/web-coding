# 📚 Hướng Dẫn Học Tập Để Hoàn Thiện Đồ Án PhoneStore

Tài liệu này liệt kê tất cả những kiến thức bạn cần học để hiểu và trình bày đồ án một cách tự tin.

---

## 🎯 Mục Lục

1. [Kiến Thức Cơ Bản](#kiến-thức-cơ-bản)
2. [React & Next.js](#react--nextjs)
3. [TypeScript](#typescript)
4. [CSS & Tailwind CSS](#css--tailwind-css)
5. [State Management](#state-management)
6. [Performance Optimization](#performance-optimization)
7. [Best Practices](#best-practices)
8. [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)
9. [Roadmap Học Tập](#roadmap-học-tập)

---

## 📖 Kiến Thức Cơ Bản

### 1. HTML & CSS Cơ Bản

**Cần học:**
- ✅ HTML5 semantic elements (`<header>`, `<nav>`, `<section>`, `<article>`)
- ✅ CSS Flexbox và Grid Layout
- ✅ CSS Variables (Custom Properties)
- ✅ Responsive Design với Media Queries
- ✅ CSS Selectors (class, id, pseudo-classes)

**Tài liệu:**
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS-Tricks: https://css-tricks.com/

**Thời gian:** 1-2 tuần

---

### 2. JavaScript ES6+ Cơ Bản

**Cần học:**
- ✅ Arrow Functions
- ✅ Destructuring (`const { name, price } = product`)
- ✅ Spread Operator (`...array`, `...object`)
- ✅ Template Literals (`` `${name}` ``)
- ✅ Array Methods (`map`, `filter`, `reduce`, `find`, `some`, `every`)
- ✅ Async/Await và Promises
- ✅ Modules (import/export)

**Ví dụ trong đồ án:**
```javascript
// Destructuring
const { name, price } = product;

// Spread operator
const newCart = [...cartItems, newItem];

// Array methods
const filtered = products.filter(p => p.price < 10000000);
const total = cartItems.reduce((sum, item) => sum + item.price, 0);
```

**Tài liệu:**
- JavaScript.info: https://javascript.info/
- MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

**Thời gian:** 2-3 tuần

---

## ⚛️ React & Next.js

### 3. React Cơ Bản

**Cần học:**

#### 3.1. Components & JSX
- ✅ Function Components
- ✅ JSX Syntax
- ✅ Props (passing data từ parent xuống child)
- ✅ Conditional Rendering (`{condition && <Component />}`)
- ✅ Lists và Keys (`map()` với `key` prop)

**Ví dụ:**
```jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}
```

#### 3.2. React Hooks Cơ Bản

**useState:**
```jsx
const [count, setCount] = useState(0);
setCount(count + 1); // Cập nhật state
```

**useEffect:**
```jsx
useEffect(() => {
  // Chạy sau mỗi lần render
  console.log('Component mounted');
  
  return () => {
    // Cleanup function
    console.log('Component unmounted');
  };
}, [dependencies]); // Chỉ chạy khi dependencies thay đổi
```

**useRef:**
```jsx
const inputRef = useRef(null);
// Truy cập: inputRef.current
```

**useContext:**
```jsx
const theme = useContext(ThemeContext);
```

**Tài liệu:**
- React Official Docs: https://react.dev/
- React Hooks: https://react.dev/reference/react

**Thời gian:** 3-4 tuần

---

### 4. Next.js 15 (App Router)

**Cần học:**

#### 4.1. App Router Concepts
- ✅ File-based Routing (`app/products/page.tsx` = route `/products`)
- ✅ Dynamic Routes (`app/products/[id]/page.tsx`)
- ✅ Server Components vs Client Components (`'use client'`)
- ✅ Layout Components (`layout.tsx`)
- ✅ Metadata API

**Ví dụ trong đồ án:**
```tsx
// app/products/[id]/page.tsx
export default function ProductDetail({ params }: { params: { id: string } }) {
  return <div>Product ID: {params.id}</div>;
}
```

#### 4.2. Next.js Features
- ✅ Image Optimization (`next/image`)
- ✅ Font Optimization (`next/font`)
- ✅ Link Component (`next/link`)
- ✅ Metadata và SEO

**Tài liệu:**
- Next.js Docs: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app

**Thời gian:** 2-3 tuần

---

## 📘 TypeScript

### 5. TypeScript Cơ Bản đến Nâng Cao

**Cần học:**

#### 5.1. TypeScript Cơ Bản
- ✅ Type Annotations (`const name: string = "John"`)
- ✅ Interfaces (`interface Product { id: number; name: string }`)
- ✅ Types (`type Status = 'pending' | 'completed'`)
- ✅ Optional Properties (`name?: string`)
- ✅ Union Types (`string | number`)

**Ví dụ:**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  inStock?: boolean; // Optional
}

type Status = 'pending' | 'completed' | 'cancelled';
```

#### 5.2. TypeScript Nâng Cao (Đã dùng trong đồ án)

**Generic Types:**
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // T có thể là bất kỳ type nào
}
```

**keyof Operator:**
```typescript
type ProductKeys = keyof Product; // 'id' | 'name' | 'price'
```

**Type Assertions:**
```typescript
const value = product[key as keyof Product];
```

**Generic Constraints:**
```typescript
function debounce<T extends (...args: any[]) => any>(func: T) {
  // T phải là một function
}
```

**Tài liệu:**
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- TypeScript Deep Dive: https://basarat.gitbook.io/typescript/

**Thời gian:** 2-3 tuần

---

## 🎨 CSS & Tailwind CSS

### 6. Tailwind CSS

**Cần học:**

#### 6.1. Utility-First Approach
- ✅ Spacing (`p-4`, `m-2`, `gap-4`)
- ✅ Colors (`bg-blue-500`, `text-gray-800`)
- ✅ Typography (`text-xl`, `font-bold`)
- ✅ Flexbox & Grid (`flex`, `grid`, `grid-cols-3`)
- ✅ Responsive (`md:`, `lg:`, `xl:`)

**Ví dụ:**
```jsx
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white dark:bg-gray-800">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

#### 6.2. Dark Mode
- ✅ Dark mode classes (`dark:bg-gray-900`)
- ✅ Toggle dark mode với JavaScript

**Tài liệu:**
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Tailwind UI: https://tailwindui.com/

**Thời gian:** 1-2 tuần

---

## 🔄 State Management

### 7. React State Management Patterns

**Cần học:**

#### 7.1. useState & useEffect
- ✅ Local state management
- ✅ State updates (functional updates)
- ✅ Side effects với useEffect

#### 7.2. Custom Hooks
- ✅ Tạo custom hooks để tái sử dụng logic
- ✅ Rules of Hooks

**Ví dụ trong đồ án:**
```typescript
// Custom hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Lazy initialization
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    // Functional update support
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  
  return [storedValue, setValue] as const;
}
```

#### 7.3. Context API (Nếu cần)
- ✅ createContext
- ✅ useContext
- ✅ Provider pattern

**Tài liệu:**
- React State Management: https://react.dev/learn/managing-state

**Thời gian:** 2 tuần

---

## ⚡ Performance Optimization

### 8. Performance Optimization Techniques

**Cần học:**

#### 8.1. Debounce & Throttle
- ✅ Debounce: Trì hoãn execution
- ✅ Throttle: Giới hạn frequency
- ✅ Khi nào dùng debounce vs throttle

**Ví dụ:**
```typescript
// Debounce - Dùng cho search
const debouncedSearch = debounce((query: string) => {
  // Chỉ chạy sau khi người dùng ngừng gõ 300ms
  searchProducts(query);
}, 300);

// Throttle - Dùng cho scroll events
const throttledScroll = throttle(() => {
  // Chỉ chạy tối đa 1 lần/100ms
  handleScroll();
}, 100);
```

#### 8.2. React Performance
- ✅ useMemo (memoize expensive calculations)
- ✅ useCallback (memoize functions)
- ✅ React.memo (memoize components)
- ✅ Code splitting với Next.js

**Ví dụ:**
```tsx
// Memoize expensive calculation
const totalPrice = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}, [cartItems]);

// Memoize callback function
const handleClick = useCallback(() => {
  addToCart(product);
}, [product]);
```

**Tài liệu:**
- React Performance: https://react.dev/learn/render-and-commit
- Web.dev Performance: https://web.dev/performance/

**Thời gian:** 1-2 tuần

---

## ✨ Best Practices

### 9. Code Quality & Best Practices

**Cần học:**

#### 9.1. Code Organization
- ✅ Folder structure
- ✅ Component organization
- ✅ Separation of concerns (components, hooks, utils, types)

#### 9.2. Naming Conventions
- ✅ Components: PascalCase (`ProductCard.tsx`)
- ✅ Hooks: camelCase với prefix `use` (`useLocalStorage.ts`)
- ✅ Utilities: camelCase (`formatPrice.ts`)
- ✅ Types: PascalCase (`Product`, `CartItem`)

#### 9.3. Error Handling
- ✅ Try-catch blocks
- ✅ Error boundaries (React)
- ✅ User-friendly error messages

**Ví dụ:**
```typescript
try {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
} catch (error) {
  console.error(`Error reading localStorage:`, error);
  return initialValue; // Fallback value
}
```

#### 9.4. Accessibility (a11y)
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management

**Tài liệu:**
- Web Accessibility: https://www.w3.org/WAI/
- React A11y: https://react.dev/learn/accessibility

**Thời gian:** 1 tuần

---

## 📚 Tài Liệu Tham Khảo

### 10. Tài Liệu Chính Thức

#### React & Next.js
- 🔗 React Official Docs: https://react.dev/
- 🔗 Next.js Docs: https://nextjs.org/docs
- 🔗 React Hooks API: https://react.dev/reference/react

#### TypeScript
- 🔗 TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- 🔗 TypeScript Playground: https://www.typescriptlang.org/play

#### Tailwind CSS
- 🔗 Tailwind CSS Docs: https://tailwindcss.com/docs
- 🔗 Tailwind UI Components: https://tailwindui.com/

#### JavaScript
- 🔗 MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- 🔗 JavaScript.info: https://javascript.info/

### 11. Video Tutorials (Tiếng Việt)

- 🎥 F8 - Học React: https://fullstack.edu.vn/courses/reactjs
- 🎥 Evondev - Next.js: https://www.youtube.com/@evondev
- 🎥 Son Sang - TypeScript: https://www.youtube.com/@sonsang

### 12. Practice Platforms

- 💻 CodeSandbox: https://codesandbox.io/
- 💻 CodePen: https://codepen.io/
- 💻 LeetCode: https://leetcode.com/ (JavaScript practice)
- 💻 Frontend Mentor: https://www.frontendmentor.io/ (Projects)

---

## 🗺️ Roadmap Học Tập

### Tuần 1-2: Nền Tảng
- [ ] HTML5 & CSS3 cơ bản
- [ ] JavaScript ES6+ (Arrow functions, Destructuring, Array methods)
- [ ] Responsive Design

### Tuần 3-4: React Cơ Bản
- [ ] React Components & JSX
- [ ] Props & State
- [ ] useState & useEffect hooks
- [ ] Event Handling
- [ ] Lists & Keys

### Tuần 5-6: React Nâng Cao
- [ ] useRef, useContext
- [ ] Custom Hooks
- [ ] Performance Optimization (useMemo, useCallback)
- [ ] Error Handling

### Tuần 7-8: Next.js
- [ ] Next.js App Router
- [ ] File-based Routing
- [ ] Server vs Client Components
- [ ] Image & Font Optimization
- [ ] Metadata & SEO

### Tuần 9-10: TypeScript
- [ ] TypeScript Basics (Types, Interfaces)
- [ ] Type Annotations
- [ ] Generic Types
- [ ] Advanced Types (Union, keyof, etc.)

### Tuần 11-12: Tailwind CSS
- [ ] Utility Classes
- [ ] Responsive Design với Tailwind
- [ ] Dark Mode
- [ ] Custom Configuration

### Tuần 13-14: Advanced Topics
- [ ] Debounce & Throttle
- [ ] LocalStorage Management
- [ ] Form Validation
- [ ] Accessibility

### Tuần 15-16: Ôn Tập & Thực Hành
- [ ] Review lại toàn bộ code trong đồ án
- [ ] Practice giải thích từng phần
- [ ] Chuẩn bị câu trả lời cho câu hỏi thường gặp
- [ ] Demo và test đồ án

---

## 🎯 Checklist Kiến Thức

### Kiến Thức Cơ Bản
- [ ] Hiểu HTML5 semantic elements
- [ ] Thành thạo CSS Flexbox và Grid
- [ ] Nắm vững JavaScript ES6+ syntax
- [ ] Hiểu Array methods (map, filter, reduce)
- [ ] Biết cách dùng Destructuring và Spread operator

### React
- [ ] Hiểu Components và JSX
- [ ] Thành thạo useState và useEffect
- [ ] Biết cách dùng useRef và useContext
- [ ] Có thể tạo Custom Hooks
- [ ] Hiểu Props và State management

### Next.js
- [ ] Hiểu App Router
- [ ] Biết cách tạo routes và dynamic routes
- [ ] Hiểu Server vs Client Components
- [ ] Biết cách optimize images và fonts

### TypeScript
- [ ] Hiểu Type Annotations
- [ ] Có thể định nghĩa Interfaces và Types
- [ ] Hiểu Generic Types
- [ ] Biết cách dùng Optional Properties
- [ ] Hiểu Union Types và keyof

### Performance & Best Practices
- [ ] Hiểu Debounce và Throttle
- [ ] Biết cách optimize React components
- [ ] Hiểu Error Handling
- [ ] Biết về Accessibility

---

## 💡 Tips Học Tập Hiệu Quả

### 1. Học Bằng Cách Làm
- ✅ Đừng chỉ đọc, hãy code thử ngay
- ✅ Tạo project nhỏ để practice từng concept
- ✅ Debug và fix lỗi để hiểu sâu hơn

### 2. Đọc Code Của Người Khác
- ✅ Xem code trong đồ án của bạn
- ✅ Đọc source code của các library phổ biến
- ✅ Tham gia các open source projects

### 3. Practice Thường Xuyên
- ✅ Code mỗi ngày, dù chỉ 30 phút
- ✅ Làm các bài tập trên LeetCode hoặc Frontend Mentor
- ✅ Build các project nhỏ để áp dụng kiến thức

### 4. Ghi Chú và Tóm Tắt
- ✅ Viết lại những gì đã học bằng ngôn ngữ của bạn
- ✅ Tạo cheat sheet cho các syntax thường dùng
- ✅ Giải thích lại cho người khác (teaching is learning)

### 5. Tham Gia Community
- ✅ Tham gia các group Facebook về React/Next.js
- ✅ Hỏi trên Stack Overflow khi gặp vấn đề
- ✅ Đọc blog và xem video tutorials

---

## 🎓 Câu Hỏi Tự Kiểm Tra

Sau khi học xong, bạn nên có thể trả lời các câu hỏi sau:

### React
1. **useState và useEffect khác nhau như thế nào?**
   - useState: Quản lý state, trigger re-render khi thay đổi
   - useEffect: Chạy side effects, không quản lý state trực tiếp

2. **Tại sao không được mutate state trực tiếp?**
   - React dùng shallow comparison để detect changes
   - Mutate trực tiếp không đổi reference → React không detect → không re-render

3. **useRef khác useState như thế nào?**
   - useState: Tạo state và trigger re-render
   - useRef: Lưu giá trị mà không trigger re-render

### TypeScript
1. **Generic Types là gì?**
   - Cho phép function/interface hoạt động với nhiều types khác nhau
   - Đảm bảo type safety và code reuse

2. **Optional Properties (`?`) dùng để làm gì?**
   - Đánh dấu property không bắt buộc
   - Có thể undefined

3. **Union Types (`|`) là gì?**
   - Cho phép một giá trị có thể là một trong nhiều types
   - Ví dụ: `string | number`

### Performance
1. **Debounce và Throttle khác nhau như thế nào?**
   - Debounce: Trì hoãn execution, chỉ chạy sau khi ngừng trigger
   - Throttle: Giới hạn frequency, chạy tối đa X lần trong khoảng thời gian

2. **Khi nào dùng useMemo?**
   - Khi có expensive calculation
   - Khi muốn tránh re-calculate không cần thiết

---

## 🚀 Bước Tiếp Theo

### Ngay Bây Giờ
1. ✅ Đọc lại code trong đồ án của bạn
2. ✅ Xác định phần nào bạn chưa hiểu rõ
3. ✅ Tìm tài liệu và học phần đó
4. ✅ Practice bằng cách viết lại code hoặc tạo project nhỏ

### Trong Tuần Này
1. ✅ Hoàn thành checklist kiến thức cơ bản
2. ✅ Ôn lại React hooks
3. ✅ Đọc lại TypeScript basics

### Trong Tháng Này
1. ✅ Hoàn thành roadmap học tập
2. ✅ Practice giải thích đồ án
3. ✅ Chuẩn bị demo và presentation

---

## 📝 Ghi Chú

- **Đừng cố học hết mọi thứ một lúc**: Học từng phần một, hiểu kỹ trước khi chuyển sang phần tiếp theo
- **Practice là quan trọng nhất**: Đọc 100 trang tài liệu không bằng code 1 project nhỏ
- **Đừng sợ lỗi**: Lỗi là cách tốt nhất để học
- **Hỏi khi không hiểu**: Tham gia community và đặt câu hỏi

---

## 🎉 Chúc Bạn Học Tập Thành Công!

Nhớ rằng: **"The expert in anything was once a beginner"**

Mọi người đều bắt đầu từ con số 0. Quan trọng là bạn kiên trì và practice thường xuyên. Good luck! 🚀

---

**Cập nhật lần cuối:** Tháng 12, 2024



