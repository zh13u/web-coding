import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/utils";
import WishlistButton from "./WishlistButton";

interface ProductCardProps extends Omit<Product, 'brand' | 'category' | 'inStock'> {
  onAddToCart?: (productId: number) => void;
  className?: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  oldPrice,
  image,
  badge,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(id);
  };

  return (
    <div className={`product-card ${className}`}>
      <div className="product-image">
        <Link href={`/products/${id}`}>
          <Image src={image} alt={name} width={280} height={250} />
        </Link>
        {badge && <div className="product-badge">{badge}</div>}
        <div className="product-actions-overlay">
          <WishlistButton
            productId={id}
            productName={name}
            productPrice={price}
            productImage={image}
          />
        </div>
      </div>

      <div className="product-info">
        <h3>
          <Link href={`/products/${id}`}>{name}</Link>
        </h3>
        <p className="product-description">{description}</p>
        <div className="product-price">
          <span className="current-price">{formatCurrency(price)}</span>
          {oldPrice && <span className="old-price">{formatCurrency(oldPrice)}</span>}
        </div>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

