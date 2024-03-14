const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductReview,
  getUserReviews,
  createProductReview,
  updateReview,
  deleteReview,
} = require("../db/products");

// get all products
router.get("/products", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// get product by id
router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    console.log(product);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// post product
router.post("/products", async (req, res, next) => {
  try {
    const product = await createNewProduct(req);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

// update product
router.put("/products/:id", async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// delete product
router.delete("/products/:id", async (req, res, next) => {
  try {
    const product = await deleteProduct(req);

    res.send("successfully deleted");
  } catch (err) {
    next(err);
  }
});

// get review related to product
router.get("/products/:id/reviews", async (req, res, next) => {
  try {
    const { id } = req.params;
    const productReviews = await getProductReview(id);
    res.send(productReviews);
  } catch (err) {
    next(err);
  }
});

// Get reviews by userId
router.get("/reviews/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userReviews = await getUserReviews(userId);
    res.send(userReviews);
  } catch (err) {
    next(err);
  }
});

// Create a new review for a product
router.post("/products/:productId/reviews", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const reviewData = req.body;
    const newReview = await createProductReview(productId, userId, reviewData);
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

// Update a review for a product
router.put("/products/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body;
    const updatedReviews = await updateReview(reviewId, req.body, userId);
    res.status(200).json(updatedReviews);
  } catch (err) {
    next(err);
  }
});

// Delete a review for a product
router.delete(
  "/products/:productId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const deletedReview = await deleteReview(reviewId);
      res.status(200).json({ message: "Review successfully deleted." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
