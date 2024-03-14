const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all products
const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (err) {
    throw err;
  }
};

// get product by id
const getProductById = async (id) => {
  try {
    return await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    throw err;
  }
};

// create new product
const createNewProduct = async (req) => {
  try {
    return await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        class: req.body.class,
      },
    });
  } catch (err) {
    throw err;
  }
};

// update product
const updateProduct = async (id, req) => {
  const { name, price, image, description } = req.body;
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name ? name : undefined,
        price: price ? price : undefined,
        image: image ? image : undefined,
        description: description ? description : undefined,
        class: req.body.class,
      },
    });
    return updateProduct;
  } catch (err) {
    throw err;
  }
};

// delete product
const deleteProduct = async (req) => {
  try {
    const Product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return;
  } catch (err) {
    throw err;
  }
};

// get reviews
const getProductReview = async (productId) => {
  try {
    return await prisma.review.findMany({
      where: {
        productId: Number(productId),
      },
    });
  } catch (err) {
    throw err;
  }
};

// get review by userId
const getUserReviews = async (userId) => {
  try {
    const userReviews = await prisma.review.findMany({
      where: {
        userId: Number(userId),
      },
    });
    return userReviews;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return null;
  }
};

// create review
const createProductReview = async (productId, userId, reviewData) => {
  try {
    const reviewDataToCreate = {
      productId: Number(productId),
      ...reviewData,
    };
    if (userId) {
      reviewDataToCreate["userId"] = userId;
    }
    const newReview = await prisma.review.create({
      data: reviewDataToCreate,
    });
    return newReview;
  } catch (err) {
    throw err;
  }
};

// update a review and fetch user reviews
const updateReview = async (reviewId, reviewData, userId) => {
  try {
    await prisma.review.update({
      where: { id: Number(reviewId) },
      data: reviewData,
    });

    const userReviews = await prisma.review.findMany({
      where: { userId: Number(userId) },
    });

    return userReviews;
  } catch (err) {
    throw err;
  }
};

// delete a review
const deleteReview = async (reviewId) => {
  return await prisma.review.delete({
    where: { id: Number(reviewId) },
  });
};

module.exports = {
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
};
