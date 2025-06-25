// src/utils/api.js

const API_URL = 'http://localhost:8080/cart'; // Replace with your actual backend URL

// Add item to cart
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (userId, productId) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Get cart items
export const getCartItems = async () => {
  try {
    const response = await fetch(`${API_URL}/"60c72b2f9b1d8c0017fc6e01"`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Update item quantity in cart
export const updateQuantity = async (userId, itemId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId, quantity }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating quantity:', error);
    throw error;
  }
};
