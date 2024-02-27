const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require("../db/cart");

// get cart
router.get("/users/:userId/cart", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await getCart(userId);
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving cart items" });
  }
});

// add to cart
router.post("/users/:userId/cart", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    console.log("Incoming Request Data:", req.body);
    const result = await addToCart(userId, productId, quantity);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding item to cart" });
  }
});

// remove to cart
router.delete("/users/:userId/cart/:cartItemId", async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    const result = await removeFromCart(userId, cartItemId);

    if (result.success) {
      res.status(200).json({ message: "Cart item removed successfully" });
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing item from cart" });
  }
});

module.exports = router;
