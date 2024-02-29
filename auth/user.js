const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserPreferences,
  createUserPreferences,
  updateUserPreferences,
  deleteUserPreferences,
} = require("../db/user");

const { isLoggedIn } = require("./middleware");

// get all users
router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// get user by id
router.get("/user/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    res.send(user);
  } catch (err) {
    next(err);
  }
});

// user login
router.post("/user/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await loginUser(username, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
// user logout
router.delete("/user/logout", async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const loggedOut = await logoutUser(userId);

    if (loggedOut) {
      res.status(200).json({ message: "User successfully logged out" });
    } else {
      res.status(500).json({ error: "An error occurred during logout" });
    }
  } catch (error) {
    console.error("Error in user logout:", error);
    res.status(500).json({ error: "An error occurred during logout" });
  }
});

// register new user
router.post("/user/register", async (req, res, next) => {
  try {
    const user = await createNewUser(req);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

// edit user
router.put("/user/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete("/user/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req);

    res.send("successfully deleted");
  } catch (err) {
    next(err);
  }
});

// Get user preferences by user ID
router.get("/user/:userId/preferences", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userPreferences = await getUserPreferences(userId);
    res.json(userPreferences);
  } catch (err) {
    next(err);
  }
});

// Create user preferences
router.post("/user/:userId/preferences", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const preferencesData = req.body;
    const newPreferences = await createUserPreferences(userId, preferencesData);
    res.status(201).json(newPreferences);
  } catch (err) {
    next(err);
  }
});

// Update user preferences
router.put("/user/:userId/preferences", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const preferencesData = req.body;
    const updatedPreferences = await updateUserPreferences(
      userId,
      preferencesData
    );
    res.status(200).json(updatedPreferences);
  } catch (err) {
    next(err);
  }
});

// Delete user preferences
router.delete("/user/:userId/preferences", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedPreferences = await deleteUserPreferences(userId);
    res.status(200).json({ message: "preferences successfully deleted." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
