// Custom hook đơn giản để lưu dữ liệu vào localStorage

import { useState, useEffect } from 'react';

// Generic type cho hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State để lưu giá trị hiện tại
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lấy giá trị từ localStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON nếu có, không thì dùng giá trị mặc định
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Nếu có lỗi, trả về giá trị mặc định
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function để cập nhật giá trị
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép value là function hoặc giá trị trực tiếp
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Cập nhật state
      setStoredValue(valueToStore);
      
      // Lưu vào localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function để xóa giá trị
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

// Hook đơn giản để quản lý giỏ hàng
export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    variant: string;
    image: string;
  }>>('cart', []);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    variant: string;
    image: string;
  }) => {
    setCartItems(prevItems => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.variant === product.variant
      );

      if (existingItem) {
        // Nếu đã có, tăng số lượng
        return prevItems.map(item =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Xóa tất cả
  const clearCart = () => {
    setCartItems([]);
  };

  // Tính tổng số lượng
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
}

