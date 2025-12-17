import type { Product } from "@/types";

// la nguon du lieu san pham, page nao can thi import roi render 

const phoneArt = (
  title: string,
  subtitle: string,
  start: string,
  end: string,
): string => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${start}" />
      <stop offset="100%" stop-color="${end}" />
    </linearGradient>
  </defs>
  <rect width="640" height="420" rx="22" fill="url(#bg)" />
  <rect x="190" y="36" width="260" height="348" rx="28" fill="#0b1529" stroke="#1f2937" stroke-width="3" />
  <rect x="214" y="68" width="212" height="276" rx="22" fill="#0f172a" stroke="#111827" stroke-width="2" />
  <circle cx="320" cy="56" r="5" fill="#cbd5e1" />
  <rect x="290" y="60" width="60" height="6" rx="3" fill="#cbd5e1" />
  <circle cx="320" cy="355" r="6" fill="#cbd5e1" />
  <text x="320" y="320" fill="#e2e8f0" font-family="Inter, Arial, sans-serif" font-size="22" text-anchor="middle">${title}</text>
  <text x="320" y="355" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="18" text-anchor="middle">${subtitle}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Chip A17 Pro, khung titanium, camera 48MP",
    price: 29_990_000,
    oldPrice: 32_990_000,
    image: "/images/products/iphone-15-pro.jpg",
    brand: "iphone",
    category: "Flagship",
    inStock: true,
    badge: "Mới",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "AI tích hợp, màn hình Dynamic AMOLED 2X",
    price: 26_990_000,
    oldPrice: 28_990_000,
    image: "/images/products/samsung-s24-ultra.jpg",
    brand: "samsung",
    category: "Flagship",
    inStock: true,
    badge: "Hot",
  },
  {
    id: 3,
    name: "Xiaomi 14",
    description: "Snapdragon 8 Gen 3, camera Leica",
    price: 15_990_000,
    image: "/images/products/xiaomi-14.jpg",
    brand: "xiaomi",
    category: "Smartphone",
    inStock: true,
    badge: "Mới",
  },
  {
    id: 4,
    name: "OPPO Find X7",
    description: "Camera Hasselblad, sạc nhanh 100W",
    price: 12_990_000,
    image: "/images/products/oppo-find-x7.jpg",
    brand: "oppo",
    category: "Smartphone",
    inStock: true,
  },
  {
    id: 5,
    name: "Vivo X100",
    description: "MediaTek Dimensity 9300, camera ZEISS",
    price: 11_990_000,
    image: "/images/products/vivo-x100.jpg",
    brand: "vivo",
    category: "Smartphone",
    inStock: true,
  },
  {
    id: 6,
    name: "Pixel 8 Pro",
    description: "Tensor G3, camera AI 50MP",
    price: 23_990_000,
    image: "/images/products/pixel-8-pro.jpg",
    brand: "pixel",
    category: "Flagship",
    inStock: true,
    badge: "Mới",
  },
  {
    id: 7,
    name: "Samsung Galaxy A55",
    description: "Exynos 1480, camera 50MP",
    price: 17_990_000,
    image: "/images/products/samsung-a55.jpg",
    brand: "samsung",
    category: "Budget",
    inStock: true,
  },
  {
    id: 8,
    name: "Xiaomi Redmi Note 13",
    description: "Snapdragon 685, camera 108MP",
    price: 8_990_000,
    image: "/images/products/xiaomi-redmi-note-13.jpg",
    brand: "xiaomi",
    category: "Budget",
    inStock: true,
  },
  {
    id: 9,
    name: "Realme 12 Pro+",
    description: "Snapdragon 7s Gen 2, camera tele 64MP",
    price: 10_990_000,
    image: "/images/products/realme-12-pro-plus.jpg",
    brand: "realme",
    category: "Budget",
    inStock: true,
  },
  {
    id: 10,
    name: "ASUS ROG Phone 8",
    description: "Snapdragon 8 Gen 3, màn 165Hz dành cho game",
    price: 24_490_000,
    image: "/images/products/asus-rog-phone-8.jpg",
    brand: "asus",
    category: "Gaming",
    inStock: true,
  },
  {
    id: 11,
    name: "Nokia G50",
    description: "Pin 5000mAh, màn hình 6.8 inch",
    price: 5_990_000,
    image: "/images/products/nokia-g50.jpg",
    brand: "nokia",
    category: "Budget",
    inStock: false,
  },
  {
    id: 12,
    name: "iPhone 15",
    description: "Chip A16 Bionic, camera 48MP",
    price: 24_990_000,
    image: "/images/products/iphone-15.jpg",
    brand: "iphone",
    category: "Smartphone",
    inStock: true,
  },
];
