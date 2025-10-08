import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/utils";

// Interface cho props của ProductCard - sử dụng type từ types/index.ts
interface ProductCardProps extends Omit<Product, 'brand' | 'category' | 'inStock'> {
  onAddToCart?: (productId: number) => void;
  className?: string;
}

// Component ProductCard với props cơ bản
export default function ProductCard({
  id,
  name,
  description,
  price,
  oldPrice,
  image,
  badge,
  onAddToCart,
  className = ""
}: ProductCardProps) {
  // Sử dụng utility function từ utils/index.ts

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <div className={`product-card ${className}`}>
      <div className="product-image">
        <Image 
          src={image} 
          alt={name} 
          width={280}
          height={250}
        />
        {badge && (
          <div className="product-badge">{badge}</div>
        )}
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-price">
          <span className="current-price">{formatPrice(price)}</span>
          {oldPrice && (
            <span className="old-price">{formatPrice(oldPrice)}</span>
          )}
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
