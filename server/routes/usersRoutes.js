const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/:userId", usersController.getUserById);

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.login
);

router.post("/forgotPassword", usersController.forgotPassword);

module.exports = router;
