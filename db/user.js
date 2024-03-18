const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { log } = require("console");

// get all users
const getAllUsers = async () => {
  try {
    return await prisma.users.findMany();
  } catch (err) {
    throw err;
  }
};

// get user by id
const getUserById = async (id) => {
  try {
    return await prisma.users.findFirst({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    throw err;
  }
};

// get all user information by userId
const getUserInfoById = async (userId) => {
  const userData = await prisma.users.findUnique({
    where: { id: Number(userId) },
    include: {
      preferences: true,
      userInformation: true,
      wishlists: true,
      Review: {
        select: {
          id: true,
          content: true,
          rating: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      Order: {
        include: {
          products: {
            select: {
              id: true,
              name: true,
              price: true,
              quantity: true,
            },
          },
        },
      },
    },
  });

  const {
    preferences,
    userInformation,
    wishlists,
    Review,
    Order,
    ...userDetails
  } = userData;
  return {
    userDetails,
    preferences,
    userInformation,
    wishlists,
    reviews: Review,
    orders: Order,
  };
};

// create new user
const createNewUser = async (req) => {
  const { username, password, firstName, lastName, email, admin } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    return await prisma.users.create({
      data: {
        username: username,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        email: email,
        admin: admin,
      },
    });
  } catch (err) {
    throw err;
  }
};

//Create Token
const createToken = async (userId, token, expirationDate, currentDate) => {
  const tokenExpirationMinutes = 30;

  const updatedExpirationDate = new Date(currentDate);
  updatedExpirationDate.setMinutes(
    updatedExpirationDate.getMinutes() + tokenExpirationMinutes
  );

  console.log("token: ", token);
  console.log("id: ", userId);
  console.log("created at: ", currentDate);
  console.log("expiration: ", updatedExpirationDate);

  try {
    await prisma.token.create({
      data: {
        createdAt: currentDate,
        updatedAt: currentDate,
        valid: true,
        expiration: updatedExpirationDate,
        userId: userId,
        token: token,
      },
    });

    console.log("Token created and stored successfully in the database.");
  } catch (error) {
    console.error("Error storing token in the database:", error);
    throw error;
  }
};

// cleanup excess tokens
async function cleanupTokensForUser(userId) {
  await prisma.token.deleteMany({
    where: {
      userId: userId,
    },
  });
}

// login user
async function loginUser(username, password) {
  const user = await prisma.users.findUnique({
    where: { username: username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid e-mail or password");
  }

  try {
    await cleanupTokensForUser(user.id);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.WEB_TOKEN,
      { expiresIn: "1w" }
    );

    const currentDate = new Date();
    const expirationDate = new Date();

    await createToken(user.id, token, expirationDate, currentDate);

    return {
      user: {
        id: user.id,
        username: user.username,
        admin: user.admin,
      },
      token,
    };
  } catch (error) {
    console.error("Error during login and token cleanup:", error);
    throw error;
  }
}

// logout user
const logoutUser = async (userId) => {
  try {
    await prisma.token.deleteMany({
      where: {
        userId: userId,
      },
    });

    console.log("Tokens associated with user deleted successfully");

    return true;
  } catch (error) {
    console.error("Error in logoutUser function:", error);
    return false;
  }
};

// update user
const updateUser = async (id, req) => {
  const { username, password, firstName, lastName, email, admin } = req.body;
  if ((password, username)) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const updateUser = await prisma.users.update({
        where: {
          id: Number(id),
        },
        data: {
          username: username,
          password: hashPassword,
          firstName: firstName,
          lastName: lastName,
          email: email,
          admin: admin,
        },
      });
      return updateUser;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("Password is empty");
  }
};

// delete user and associated tokens
const deleteUser = async (req) => {
  const userId = Number(req.params.id);

  try {
    await prisma.token.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    console.log("User and associated tokens deleted successfully.");
  } catch (err) {
    throw err;
  }
};

// Find user by token and check for token expiration
const findUserByToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token is missing");
    }

    const tokenEntry = await prisma.token.findFirst({
      where: {
        token: token,
        expiration: {
          gte: new Date(),
        },
      },
      select: { id: true },
    });

    if (!tokenEntry) {
      throw new Error("Token not found in database or has expired");
    }

    console.log("Token found and validated in the database");
    return true;
  } catch (error) {
    console.error("Error validating token in the database:", error);
    throw error;
  }
};

// get user preferences
const getUserPreferences = async (userId) => {
  return await prisma.userPreferences.findFirst({
    where: { userId: parseInt(userId) },
  });
};

// create user preferences
const createUserPreferences = async (userId, preferencesData) => {
  return await prisma.userPreferences.create({
    data: {
      userId: parseInt(userId),
      ...preferencesData,
    },
  });
};

// update user preferences
const updateUserPreferences = async (userId, preferencesData) => {
  return await prisma.userPreferences.update({
    where: { userId: parseInt(userId) },
    data: preferencesData,
  });
};

// delete user preferences
const deleteUserPreferences = async (userId) => {
  return await prisma.userPreferences.delete({
    where: { userId: parseInt(userId) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserInfoById,
  createNewUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  findUserByToken,
  getUserPreferences,
  createUserPreferences,
  updateUserPreferences,
  deleteUserPreferences,
};
