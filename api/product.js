const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
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

module.exports = router;
