const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get user information
const getUserInformation = async (userId) => {
  try {
    const userInformation = await prisma.userInformation.findFirst({
      where: { userId: parseInt(userId) },
    });

    return userInformation;
  } catch (error) {
    console.error("Error in fetching user information:", error);
    return null;
  }
};

//create user information
const createUserInformation = async (userId, informationData) => {
  try {
    const createdInformation = await prisma.userInformation.create({
      data: {
        userId: parseInt(userId),
        ...informationData,
      },
    });

    return createdInformation;
  } catch (error) {
    console.error("Error in creating user information:", error);
    return null;
  }
};

//update user information
const updateUserInformation = async (userId, informationData) => {
  try {
    const updatedInformation = await prisma.userInformation.update({
      where: { userId: parseInt(userId) },
      data: informationData,
    });

    return updatedInformation;
  } catch (error) {
    console.error("Error in updating user information:", error);
    return null;
  }
};

// delete user information
const deleteUserInformation = async (userId) => {
  try {
    const deletedInformation = await prisma.userInformation.delete({
      where: { userId: parseInt(userId) },
    });

    return deletedInformation;
  } catch (error) {
    console.error("Error in deleting user information:", error);
    return null;
  }
};

module.exports = {
  getUserInformation,
  createUserInformation,
  updateUserInformation,
  deleteUserInformation,
};
