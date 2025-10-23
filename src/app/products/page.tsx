'use client';

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatCurrency } from "@/utils";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  brand: string;
  badge?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const initialProducts: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Chip A17 Pro mạnh mẽ, camera 48MP',
      price: 29990000,
      oldPrice: 32990000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80',
      brand: 'iphone',
      badge: 'Mới',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'AI tích hợp, màn hình Dynamic AMOLED 2X',
      price: 19990000,
      oldPrice: 22990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'samsung',
      badge: 'Hot',
    },
    {
      id: 3,
      name: 'Xiaomi 14',
      description: 'Snapdragon 8 Gen 3, camera Leica',
      price: 15990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'xiaomi',
    },
    {
      id: 4,
      name: 'OPPO Find X7',
      description: 'Camera Hasselblad, sạc nhanh 100W',
      price: 12990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'oppo',
    },
    {
      id: 5,
      name: 'iPhone 15',
      description: 'Chip A16 Bionic, camera 48MP',
      price: 24990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'iphone',
    },
    {
      id: 6,
      name: 'Samsung Galaxy A55',
      description: 'Exynos 1480, camera 50MP',
      price: 17990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'samsung',
    },
    {
      id: 7,
      name: 'Xiaomi Redmi Note 13',
      description: 'Snapdragon 685, camera 108MP',
      price: 8990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'xiaomi',
    },
    {
      id: 8,
      name: 'Vivo X100',
      description: 'MediaTek Dimensity 9300, camera ZEISS',
      price: 11990000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      brand: 'vivo',
    },
  ];

  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !brandFilter || product.brand === brandFilter;
      const matchesPrice = !priceFilter || checkPriceRange(product.price, priceFilter);
      return matchesSearch && matchesBrand && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
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

    setFilteredProducts(filtered);
  }, [products, searchTerm, brandFilter, priceFilter, sortBy]);

  const checkPriceRange = (price: number, range: string) => {
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setBrandFilter('');
    setPriceFilter('');
    setSortBy('name');
  };

  const formatPriceSafe = (price: number) => formatCurrency(price);

  return (
    <>
      <Header activePage="products" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Sản phẩm</h1>
          <p>Khám phá bộ sưu tập điện thoại đa dạng từ các thương hiệu hàng đầu</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="brand-filter">Thương hiệu:</label>
              <select id="brand-filter" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="iphone">iPhone</option>
                <option value="samsung">Samsung</option>
                <option value="xiaomi">Xiaomi</option>
                <option value="oppo">OPPO</option>
                <option value="vivo">Vivo</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="price-filter">Giá:</label>
              <select id="price-filter" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="0-5000000">Dưới 5 triệu</option>
                <option value="5000000-10000000">5-10 triệu</option>
                <option value="10000000-20000000">10-20 triệu</option>
                <option value="20000000-999999999">Trên 20 triệu</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="sort-filter">Sắp xếp:</label>
              <select id="sort-filter" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>
            <button className="btn btn-outline" onClick={clearFilters}>Xóa bộ lọc</button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <Image src={product.image} alt={product.name} width={280} height={250} />
                    {product.badge && <div className="product-badge">{product.badge}</div>}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">
                      <span className="current-price">{formatPriceSafe(product.price)}</span>
                      {product.oldPrice && <span className="old-price">{formatPriceSafe(product.oldPrice)}</span>}
                    </div>
                    <button className="btn btn-primary">Thêm vào giỏ</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>Không tìm thấy sản phẩm nào</h3>
                <p>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

