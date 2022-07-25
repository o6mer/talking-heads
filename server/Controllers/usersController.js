const { validationResult } = require("express-validator");
const { User } = require("../models/userModel");

const DUMMY_USERS = [
  {
    userId: "1",
    userName: "user1",
    email: "test1@gmail.com",
    password: "12345678",
  },
  {
    userId: "2",
    userName: "user2",
    email: "test2@gmail.com",
    password: "12345678",
  },
  {
    userId: "3",
    userName: "user3",
    email: "test3@gmail.com",
    password: "12345678",
  },
  {
    userId: "4",
    userName: "user4",
    email: "test4@gmail.com",
    password: "12345678",
  },
  {
    userId: "5",
    userName: "user5",
    email: "test5@gmail.com",
    password: "12345678",
  },
];

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs passed, please check your data."));
  }
  const { userName, email, password, imageUrl } = req.body;

  try {
    if (await User.exists({ email }))
      return next(new Error("user exists already"));
  } catch (err) {
    console.log(err);
  }

  let newUser;
  try {
    newUser = new User({
      userName,
      email,
      password,
      imageUrl,
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
    user,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
