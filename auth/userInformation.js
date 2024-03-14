const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getUserInformation,
  createUserInformation,
  updateUserInformation,
  deleteUserInformation,
} = require("../db/userInformation");

// get user info
router.get("/user/:userId/information", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userInformation = await getUserInformation(userId);
    res.json(userInformation);
  } catch (err) {
    next(err);
  }
});

router.post("/user/:userId/information", async (req, res) => {
  const userId = req.params.userId;
  const informationData = req.body;
  console.log(informationData);
  const newInformation = await createUserInformation(userId, informationData);
  res.status(201).json(newInformation);
});

router.put("/user/:userId/information", async (req, res) => {
  const userId = req.params.userId;
  const informationData = req.body;
  const updatedInformation = await updateUserInformation(
    userId,
    informationData
  );
  res.status(200).json(updatedInformation);
});

router.delete("/user/:userId/information", async (req, res) => {
  const userId = req.params.userId;
  await deleteUserInformation(userId);
  res.status(204).end();
});

module.exports = router;
