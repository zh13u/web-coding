'use client';

import { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatCurrency } from "@/utils";
import { products as PRODUCTS_DATA, Product } from "@/data/products";

const PRODUCTS: Product[] = PRODUCTS_DATA;

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 240' role='img' aria-label='Placeholder'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230ea5e9'/%3E%3Cstop offset='100%25' stop-color='%236366f1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='240' rx='18' fill='url(%23g)'/%3E%3Crect x='98' y='24' width='124' height='192' rx='16' fill='%23111' stroke='%23222' stroke-width='3'/%3E%3Crect x='112' y='52' width='96' height='136' rx='12' fill='%23182'/%3E%3Ccircle cx='160' cy='38' r='4' fill='%23cbd5e1'/%3E%3Crect x='136' y='40' width='48' height='5' rx='2.5' fill='%23cbd5e1'/%3E%3Ccircle cx='160' cy='206' r='5' fill='%23cbd5e1'/%3E%3Ctext x='160' y='192' fill='%23e2e8f0' font-family='Arial, sans-serif' font-size='14' text-anchor='middle'%3EPhoneStore%3C/text%3E%3C/svg%3E";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") ?? "";
  const initialBrand = searchParams.get("brand") ?? "";

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [brandFilter, setBrandFilter] = useState(initialBrand);
  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "newest">(
    "name",
  );

  useEffect(() => {
    const fromUrl = searchParams.get("q") ?? "";
    const brandFromUrl = searchParams.get("brand") ?? "";
    setSearchTerm(fromUrl);
    setBrandFilter(brandFromUrl);
  }, [searchParams]);

  useEffect(() => {
    let result = [...PRODUCTS];

    // Lọc theo tên sản phẩm
    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(keyword));
    }

    // Lọc theo hãng
    if (brandFilter) {
      result = result.filter((p) => p.brand === brandFilter);
    }

    // Lọc theo khoảng giá
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Sắp xếp
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [searchTerm, brandFilter, priceFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setBrandFilter("");
    setPriceFilter("");
    setSortBy("name");
  };

  const handleAddToCart = (product: Product) => {
    const raw = localStorage.getItem("cart");
    const cart: any[] = raw ? JSON.parse(raw) : [];

    const variantText = "Mặc định";
    const existing = cart.find(
      (item) => item.id === product.id && item.variant === variantText,
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        variant: variantText,
        image: product.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src !== FALLBACK_IMAGE) {
      img.src = FALLBACK_IMAGE;
      img.srcset = FALLBACK_IMAGE;
    }
  };

  return (
    <>
      <Header activePage="products" />

      <section className="page-header">
        <div className="container">
          <h1>Sản phẩm</h1>
          <p>Tìm kiếm và lọc các mẫu điện thoại theo nhu cầu của bạn.</p>
        </div>
      </section>

      {/* Bộ lọc đơn giản */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="search">Tìm kiếm:</label>
              <input
                id="search"
                type="text"
                placeholder="Nhập tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="brand-filter">Thương hiệu:</label>
              <select
                id="brand-filter"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="iphone">iPhone</option>
                <option value="samsung">Samsung</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="oppo">OPPO</option>
                <option value="vivo">Vivo</option>
                <option value="pixel">Pixel</option>
                <option value="realme">Realme</option>
                <option value="asus">ASUS</option>
                <option value="nokia">Nokia</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="price-filter">Khoảng giá:</label>
              <select
                id="price-filter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="0-5000000">Dưới 5 triệu</option>
                <option value="5000000-10000000">5 - 10 triệu</option>
                <option value="10000000-20000000">10 - 20 triệu</option>
                <option value="20000000-999999999">Trên 20 triệu</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-by">Sắp xếp:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>

            <button className="btn btn-outline" onClick={clearFilters}>
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </section>

      {/* Danh sách sản phẩm */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.length === 0 && (
              <div className="no-results">
                <h3>Không tìm thấy sản phẩm phù hợp</h3>
                <p>Hãy thử đổi từ khóa hoặc bộ lọc khác.</p>
              </div>
            )}

            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={280}
                      height={250}
                      onError={handleImageError}
                    />
                  </Link>
                  {product.badge && (
                    <div className="product-badge">{product.badge}</div>
                  )}
                </div>

                <div className="product-info">
                  <h3>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-price">
                    <span className="current-price">
                      {formatCurrency(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="old-price">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
