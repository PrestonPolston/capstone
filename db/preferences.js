const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserPreferences = async (userId) => {
  return await prisma.userPreferences.findFirst({
    where: { userId: Number(userId) },
  });
};

const createUserPreferences = async (userId, preferencesData) => {
  return await prisma.userPreferences.create({
    data: {
      userId: Number(userId),
      ...preferencesData,
    },
  });
};

const updateUserPreferences = async (userId, preferencesData) => {
  return await prisma.userPreferences.update({
    where: { userId: Number(userId) },
    data: preferencesData,
  });
};

const deleteUserPreferences = async (userId) => {
  return await prisma.userPreferences.delete({
    where: { userId: Number(userId) },
  });
};

module.exports = {
  getUserPreferences,
  createUserPreferences,
  updateUserPreferences,
  deleteUserPreferences,
};
