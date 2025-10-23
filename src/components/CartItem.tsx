import Image from "next/image";
import { formatCurrency } from "@/utils";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
  onUpdatePrice?: (id: number, newPrice: number) => void;
  className?: string;
  disabled?: boolean;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  variant,
  image,
  onQuantityChange,
  onRemove,
  onUpdatePrice,
  className = "",
  disabled = false,
}: CartItemProps) {
  const formatPrice = (value: number) => formatCurrency(value);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onQuantityChange(id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const handlePriceUpdate = (newPrice: number) => {
    if (onUpdatePrice) {
      onUpdatePrice(id, newPrice);
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className={`cart-item ${className} ${disabled ? 'disabled' : ''}`}>
      <div className="item-image">
        <Image src={image} alt={name} width={100} height={100} />
      </div>

      <div className="item-info">
        <h3>{name}</h3>
        <p className="item-variant">{variant}</p>
        <div className="item-price">
          <span className="current-price">{formatPrice(price)}</span>
        </div>
      </div>

      <div className="item-quantity">
        <button
          className="quantity-btn decrease"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={disabled || quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          max={10}
          className="quantity-input"
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          disabled={disabled}
        />
        <button
          className="quantity-btn increase"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={disabled || quantity >= 10}
        >
          +
        </button>
      </div>

      <div className="item-total">
        <span className="total-price">{formatPrice(totalPrice)}</span>
      </div>

      <div className="item-actions">
        <button
          className="remove-btn"
          onClick={handleRemove}
          disabled={disabled}
          title="Xóa sản phẩm"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

