const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Auth failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRECT);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    res.status(401);
    return next(new Error("Authintication failed"));
  }
};
