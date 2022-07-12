const express = require("express");
const { check } = require("express-validator");

const usersController = require("../Controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

module.exports = router;
