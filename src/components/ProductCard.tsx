import Image from "next/image";
import Link from "next/link";

// Interface cho props của ProductCard
interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
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
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

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
