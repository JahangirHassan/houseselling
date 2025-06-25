import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUserId, isUserLoaded } = useCart();

  const [userId, setUserId] = useState(null);


  // Fetch userId only after context is loaded
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
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/cart/${userId}`
        );
        setCart(response.data.items || []);
      } catch (err) {
        console.log("Error fetching cart items");
        // setError("Failed to fetch cart items. Please try again.");
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

      // Update the cart state by removing the item locally
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

  // Handle Remove Button Click
  const handleRemove = (id) => {
    removeFromCart(id);
  };

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

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);



  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
      <p className="text-sm text-gray-400 ml-4">User ID: {userId || "Not Found"}</p>
      {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

      {/* Conditional Rendering for Loading, Error, and Cart State */}
      {loading ? (
        <p className="text-center">Loading cart items...</p>
      ) : error ? (
        <p className="text-red-500 text-center mb-4">{error}</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4 text-left">
            <h3 className="text-xl font-bold text-gray-800">
              Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {cart?.map((item) => {
              if (!item.productId) return null;
              return (
                <div
                  key={item.productId?._id}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3"
                >
                  <img
                    className="w-32 h-32 object-cover rounded-md"
                    src={item.productId?.image?.url}
                    alt={item.productId?.title || "Product"}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
                    {item.productId?.title || "Untitled Product"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Price: ${item.productId?.price || "0.00"}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Quantity: {item.quantity || "1"}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(item.productId?._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
