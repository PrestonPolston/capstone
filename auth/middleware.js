const { findUserByToken } = require("../db/user");

const isLoggedIn = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token is missing");
    }

    const tokenFound = await findUserByToken(token);

    if (!tokenFound) {
      throw new Error("Token not found or invalid");
    }

    req.userId = tokenFound;

    next();
  } catch (error) {
    console.error("Error in isLoggedIn middleware:", error);
    res.status(401).send("Unauthorized access");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    const error = new Error("Unauthorized: Admin access required");
    error.status = 401;
    next(error);
  }
};

module.exports = { isLoggedIn, isAdmin };
