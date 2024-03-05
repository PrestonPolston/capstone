const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrder,
  deleteOrder,
  getOrderProducts,
  addProductToOrder,
  removeProductFromOrder,
} = require("../db/orders");

// Get all orders
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// Get order by ID
router.get("/orders/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// Create a new order
router.post("/orders", async (req, res, next) => {
  try {
    const orderData = req.body;
    const order = await createNewOrder(orderData);
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

// Update an order
router.put("/orders/:id", async (req, res, next) => {
  try {
    const { body } = req;
    const order = await updateOrder(req.params.id, body);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// Delete an order
router.delete("/orders/:id", async (req, res, next) => {
  try {
    const order = await deleteOrder(req);
    res.send("Order successfully deleted");
  } catch (err) {
    next(err);
  }
});

// Get products related to an order
router.get("/orders/:id/products", async (req, res, next) => {
  try {
    const products = await getOrderProducts(req.params.id);
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// Add a product to an order
router.post("/orders/:orderId/products/:productId", async (req, res, next) => {
  try {
    const { orderId, productId } = req.params;
    const newProduct = await addProductToOrder(orderId, productId, req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Remove a product from an order
router.delete(
  "/orders/:orderId/products/:productId",
  async (req, res, next) => {
    try {
      const { orderId, productId } = req.params;
      const result = await removeProductFromOrder(orderId, productId);
      res.send({
        message: result
          ? "Product removed successfully"
          : "Product not found in the order",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
