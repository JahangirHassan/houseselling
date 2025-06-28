import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const { getUserId, isUserLoaded } = useCart();

  // Fetch userId from context
  useEffect(() => {
    if (isUserLoaded) {
      const id = getUserId();
      setUserId(id);
    }
  }, [isUserLoaded]);


  // Fetch cart items
  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/cart/${userId}`);
        setCart(response.data.items || []);
        setCheckoutSuccess(false); // reset on reload
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to fetch cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/cart/${userId}/${itemId}`);
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId && item.productId._id !== itemId)
      );
    } catch (err) {
      console.error("Error removing item from cart:", err);
      setError("Failed to remove item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  console.log("this is user id:", userId);

  // Checkout handler
  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      setCheckoutSuccess(false);

      const response = await axios.post("http://localhost:8080/checkout", {
        userId,
      });

      setCart([]);
      setCheckoutSuccess(true);
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  if (!isUserLoaded) {
    return <p className="text-center py-10">Loading user...</p>;
  }

  if (!userId) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">User ID not found. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
      <p className="text-sm text-gray-400 mb-4">User ID: {userId}</p>

      {loading ? (
        <p className="text-center">Loading cart items...</p>
      ) : error ? (
        <p className="text-red-500 text-center mb-4">{error}</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </h3>
          </div>

          {checkoutSuccess && (
            <p className="text-green-600 font-medium mb-4 text-center">
              ✅ Checkout successful! Your order has been placed.
            </p>
          )}

          <div className="flex flex-wrap gap-6 justify-center">
            {cart.map((item) => {
              const product = item.productId;
              if (!product) return null;
              return (
                <div
                  key={product._id}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3"
                >
                  <img
                    className="w-32 h-32 object-cover rounded-md"
                    src={product.image?.url || product.image}
                    alt={product.title || "Product"}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
                    {product.title || "Untitled Product"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Price: ${product.price?.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Quantity: {item.quantity}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
