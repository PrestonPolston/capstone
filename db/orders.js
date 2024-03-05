const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all orders
const getAllOrders = async () => {
  return await prisma.order.findMany();
};

// Get order by ID
const getOrderById = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: Number(orderId) },
  });
};

const createNewOrder = async (orderData) => {
  console.log("Received products:", orderData.input);

  if (!orderData.input.products || orderData.input.products.length === 0) {
    throw new Error("Products data is missing in the order");
  }

  const productConnectInputs = orderData.input.products.map((product) => ({
    id: product.productId,
  }));

  const userData = orderData.input.user
    ? { connect: { id: Number(orderData.input.user) } }
    : null;

  const createOrderPromise = prisma.order.create({
    data: {
      userId: Number(userData),
      products: {
        connect: productConnectInputs,
      },
      quantities: { set: orderData.input.quantities },
      totalPrice: orderData.input.totalPrice,
      orderNumber: orderData.input.orderNumber,
    },
  });

  const updateProductPromises = orderData.input.products.map((product) =>
    prisma.product.update({
      where: { id: product.productId },
      data: {
        quantity: {
          decrement: product.quantity,
        },
      },
    })
  );

  const transaction = await prisma.$transaction([
    createOrderPromise,
    ...updateProductPromises,
  ]);

  return transaction;
};

// Update an order by ID with the provided data
const updateOrder = async (orderId, updatedOrderData) => {
  return await prisma.order.update({
    where: { id: Number(orderId) },
    data: {
      user: { connect: { id: updatedOrderData.user } },
      products: {
        updateMany: updatedOrderData.products.map((product) => ({
          where: { id: Number(product.productId) },
          data: {
            quantity: product.quantity,
          },
        })),
      },
      quantities: { set: updatedOrderData.quantities },
      totalPrice: updatedOrderData.totalPrice,
      orderNumber: updatedOrderData.orderNumber,
    },
  });
};

// Delete an order
const deleteOrder = async (orderId) => {
  return await prisma.order.delete({
    where: { id: parseInt(orderId) },
  });
};

// Get products related to an order
const getOrderProducts = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: {
      products: true,
    },
  });
};

// Add a product to an order
const addProductToOrder = async (orderId, productId, productData) => {
  return await prisma.order.update({
    where: { id: parseInt(orderId) },
    data: {
      products: {
        create: {
          ...productData,
          productId: parseInt(productId),
        },
      },
    },
    include: {
      products: true,
    },
  });
};

// Remove a product from an order
const removeProductFromOrder = async (orderId, productId) => {
  return await prisma.order.update({
    where: { id: parseInt(orderId) },
    data: {
      products: {
        delete: {
          productId_orderId: {
            productId: parseInt(productId),
            orderId: parseInt(orderId),
          },
        },
      },
    },
    include: {
      products: true,
    },
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrder,
  deleteOrder,
  getOrderProducts,
  addProductToOrder,
  removeProductFromOrder,
};
