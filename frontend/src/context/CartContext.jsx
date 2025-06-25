import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState("");
  const [isUserLoaded, setIsUserLoaded] = useState(false);


  // ✅ Load userId from localStorage on mount
  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("userId"));
    if (storedId) {
      setOwnerId(storedId);
    }
    setIsUserLoaded(true); // <-- mark loading complete
  }, []);


  // Add item to cart
  const addToCart = async (item) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8080/cart`, {
        productId: item.productId,
        quantity: item.quantity,
        userId: item.userId,
      });
      setCart(response.data.cart.items);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  // Manage User ID
  const setUserId = (id) => {
    setOwnerId(id);
    localStorage.setItem("userId", JSON.stringify(id)); // Optional if needed elsewhere
  };


  const getUserId = () => ownerId;

  // ✅ Check if a product is already in the cart
  const isInCart = (productId) => {
    return cart.some((item) => item.productId === productId);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        setUserId,
        getUserId,
        isUserLoaded,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
