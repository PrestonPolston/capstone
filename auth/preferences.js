const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getUserPreferences,
  createUserPreferences,
  updateUserPreferences,
  deleteUserPreferences,
} = require("../db/preferences");

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

module.exports = router