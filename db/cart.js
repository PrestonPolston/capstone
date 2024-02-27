const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get cart
const getCart = async (userId) => {
  const cartItems = await prisma.cart.findMany({
    where: { userId: parseInt(userId) },
    include: { product: true },
  });
  return cartItems;
};

// add to cart
const addToCart = async (userId, productId, quantity) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return { error: "Product not found" };
    }

    const cartItem = await prisma.cart.create({
      data: {
        user: { connect: { id: Number(userId) } },
        product: { connect: { id: Number(productId) } },
        quantity: quantity,
      },
    });

    return cartItem;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { error: "Internal server error" };
  }
};

// remove from cart
const removeFromCart = async (userId, cartItemId) => {
  try {
    const cartItem = await prisma.cart.findUnique({
      where: {
        id: parseInt(cartItemId),
        userId: parseInt(userId),
      },
    });

    if (!cartItem) {
      return { success: false, error: "Cart item not found" };
    }

    await prisma.cart.delete({
      where: { id: parseInt(cartItemId) },
    });

    return { success: true };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return {
      success: false,
      error: "An error occurred while removing item from cart",
    };
  }
};

module.exports = { getCart, addToCart, removeFromCart };
