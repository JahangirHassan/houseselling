const Sales = require('../models/sales'); // Adjust path if needed
const Cart = require("../models/cart");
const Listing = require("../models/listing");

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const {
      productId,
      name,
      price,
      quantity,
      image,
      userId
    } = req.body;

    const sale = new Sales({
      productId,
      name,
      price,
      quantity,
      image,
      userId
    });

    await sale.save();
    res.status(201).json({ message: 'Sale recorded successfully', sale });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sale', details: error.message });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales', details: error.message });
  }
};

// Get total products sold summary
exports.getSalesSummary = async (req, res) => {
  try {
    const summary = await Sales.aggregate([
      {
        $group: {
          _id: '$productId',
          totalSold: { $sum: '$quantity' },
          name: { $first: '$name' },
          image: { $first: '$image' },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { totalSold: -1 } }
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get sales summary', details: error.message });
  }
};

// Get sales by user ID
exports.getUserSales = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userSales = await Sales.find({ userId }).sort({ createdAt: -1 });
    res.json(userSales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user sales', details: error.message });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await Sales.findByIdAndDelete(id);
    res.json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale', details: error.message });
  }
};
// Update a sale by ID
exports.updateSale = async (req, res) => {
          try {
          const { id } = req.params;
          const updateData = req.body;
          
          const updatedSale = await Sales.findByIdAndUpdate(id, updateData, { new: true });
          if (!updatedSale) {
              return res.status(404).json({ error: 'Sale not found' });
          } else {
              res.json({ message: 'Sale updated successfully', sale: updatedSale });
          }         
          } catch (error) {
              res.status(500).json({ error: 'Failed to update sale', details: error.message });
          }         
}

// Checkout cart and record sales Controller

exports.checkoutCart = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    const sales = cart.items.map((item) => {
      const product = item.productId;
      return {
        productId: product._id,
        name: product.title || product.name,
        price: product.price,
        quantity: item.quantity,
        totalPrice: product.price * item.quantity,
        image: product.image?.url || product.image,
        userId: userId,
      };
    });

    await Sales.insertMany(sales);

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Checkout successful", sales });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed", details: err.message });
  }
};