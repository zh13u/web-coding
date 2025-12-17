'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { products as DEFAULT_PRODUCTS } from "@/data/products";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Product } from "@/types";

interface PageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const productId = parseInt(params.id, 10);
  const [products] = useLocalStorage<Product[]>("products", DEFAULT_PRODUCTS);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <>
        <Header activePage="products" />
        <section className="page-header">
          <div className="container">
            <h1>Không tìm thấy sản phẩm</h1>
            <p>Sản phẩm bạn chọn không tồn tại.</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Biến thể màu & dung lượng đơn giản
  const variants = [
    { color: 'Đen', storage: '128GB', price: product.price },
    { color: 'Trắng', storage: '256GB', price: product.price + 2000000 },
    { color: 'Xanh', storage: '512GB', price: product.price + 4000000 },
  ];

  const specs = {
    display: '6.1" OLED, 120Hz',
    processor: 'Chip xử lý mạnh mẽ',
    camera: 'Camera chính 50MP',
    battery: 'Pin đủ dùng cả ngày',
    os: 'Hệ điều hành hiện đại',
  };

  const features = [
    'Hiệu năng mượt mà cho mọi tác vụ',
    'Camera chụp đẹp trong nhiều điều kiện ánh sáng',
    'Màn hình sắc nét, tần số quét cao',
    'Hỗ trợ sạc nhanh',
  ];

  // Them san pham theo phien ban mau/bo nho vao localStorage
  const handleAddToCart = (
    productId: number,
    variant: { color: string; storage: string; price: number },
    quantity: number,
  ) => {
    if (product.inStock === false) {
      alert("San pham dang het hang.");
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const variantText = `Màu: ${variant.color} | Dung lượng: ${variant.storage}`;

    const existingItem = cart.find(
      (item: any) => item.id === productId && item.variant === variantText,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: variant.price,
        quantity,
        variant: variantText,
        image: product.image,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  // Mua ngay = them vao gio + dieu huong checkout
  const handleBuyNow = (
    productId: number,
    variant: { color: string; storage: string; price: number },
    quantity: number,
  ) => {
    handleAddToCart(productId, variant, quantity);
    router.push('/checkout');
  };

  return (
    <>
      <Header activePage="products" />

      <section className="page-header">
        <div className="container">
          <h1>Chi tiết sản phẩm</h1>
          <p>Xem thông tin chi tiết và thêm vào giỏ hàng.</p>
        </div>
      </section>

      <section className="product-detail-page">
        <div className="container">
          <ProductDetail
            id={product.id}
            name={product.name}
            description={product.description}
            basePrice={product.price}
            oldPrice={product.oldPrice}
            image={product.image}
            badge={product.badge}
            variants={variants}
            specs={specs}
            features={features}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
