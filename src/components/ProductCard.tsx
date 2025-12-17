import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";
import { Product } from "@/types";
import { formatCurrency } from "@/utils";
import WishlistButton from "./WishlistButton";

//Productcard can nhan du lieu sp : id , name .. nhung khong dung brand category nen phai dung Omit
interface ProductCardProps extends Omit<Product, 'brand' | 'category' | 'inStock'> {
  onAddToCart?: (productId: number) => void;
  className?: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 240' role='img' aria-label='Placeholder'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230ea5e9'/%3E%3Cstop offset='100%25' stop-color='%236366f1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='240' rx='18' fill='url(%23g)'/%3E%3Crect x='98' y='24' width='124' height='192' rx='16' fill='%23111' stroke='%23222' stroke-width='3'/%3E%3Crect x='112' y='52' width='96' height='136' rx='12' fill='%23182'/%3E%3Ccircle cx='160' cy='38' r='4' fill='%23cbd5e1'/%3E%3Crect x='136' y='40' width='48' height='5' rx='2.5' fill='%23cbd5e1'/%3E%3Ccircle cx='160' cy='206' r='5' fill='%23cbd5e1'/%3E%3Ctext x='160' y='192' fill='%23e2e8f0' font-family='Arial, sans-serif' font-size='14' text-anchor='middle'%3EPhoneStore%3C/text%3E%3C/svg%3E";

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

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src !== FALLBACK_IMAGE) {
      img.src = FALLBACK_IMAGE;
      img.srcset = FALLBACK_IMAGE;
    }
  };

  return (
    <div className={`product-card ${className}`}>
      <div className="product-image">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            width={280}
            height={250}
            onError={handleImageError}
          />
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
