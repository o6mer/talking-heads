const { validationResult } = require("express-validator");
const { User } = require("../models/userModel");

const getUsers = async (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(err);
  }
  res.json({ user });
};

const signup = async (req, res, next) => {
  const errorFormatter = ({ msg, param }) => `${param}: ${msg}`;
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.array() });
  }

  const { userName, email, password, profilePictureUrl } = req.body;

  try {
    if (await User.exists({ email })) {
      res.status(400).json({ message: "user exists already" });
      return next();
    }
  } catch (err) {
    console.log(err);
  }

  let newUser;
  try {
    newUser = new User({
      userName,
      email,
      password,
      profilePictureUrl,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({
    userId: newUser._id,
    // userName: newUser.userName,
    // email: newUser.email,
    // password: newUser.password,
    // imageUrl: newUser.imageUrl,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "bad input",
    });
  }
  const { email, password } = req.body;

  let user;
  try {
    user = await User.find({ email, password });
  } catch (error) {
    console.log(error);
  }
  if (!user.length) {
    res.status(400).json({ message: "Invalid username or password" });
    return next();
  }

  res.status(200).json({
    user: user[0],
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
