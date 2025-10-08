'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface WishlistButtonProps {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  className?: string;
}

export default function WishlistButton({ 
  productId, 
  productName, 
  productPrice, 
  productImage,
  className = "" 
}: WishlistButtonProps) {
  const [wishlistItems, setWishlistItems] = useLocalStorage<Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    addedAt: string;
  }>>('wishlist', []);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistItems.some(item => item.id === productId));
  }, [wishlistItems, productId]);

  const toggleWishlist = () => {
    if (isInWishlist) {
      // Remove from wishlist
      setWishlistItems(prevItems => 
        prevItems.filter(item => item.id !== productId)
      );
    } else {
      // Add to wishlist
      const newItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        addedAt: new Date().toISOString()
      };
      
      setWishlistItems(prevItems => [...prevItems, newItem]);
    }
  };

  return (
    <button
      className={`wishlist-btn ${isInWishlist ? 'active' : ''} ${className}`}
      onClick={toggleWishlist}
      title={isInWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
    >
      <i className={`fas ${isInWishlist ? 'fa-heart' : 'fa-heart-o'}`}></i>
    </button>
  );
}
