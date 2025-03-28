import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/cartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((c) => c.bookID === item.bookID);

      return existingItem
        ? previousCart.map((c) =>
            c.bookID === item.bookID
              ? { ...c, quantity: c.quantity + 1, price: c.price + item.price }
              : c
          )
        : [...previousCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((previousCart) => previousCart.filter((c) => c.bookID !== bookID));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
