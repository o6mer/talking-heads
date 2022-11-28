const { validationResult } = require("express-validator");
const { User } = require("../models/userModel");
const sgMail = require("@sendgrid/mail");
const passGenerator = require("generate-password");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getUsers = async (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate("rooms");
    if (!user) return next();
    const { _id, userName, email, profilePictureUrl, rooms } = user;
    res.json({ _id, userName, email, profilePictureUrl, rooms });
  } catch (err) {
    return next(err);
  }
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
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json({ message: "Could not create user" });
    return next();
  }
  try {
    newUser = new User({
      userName,
      email,
      password: hashedPassword,
      profilePictureUrl,
      rooms: [],
    });
    newUser = await newUser.save();
  } catch (err) {
    console.log(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRECT,
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).json({ message: "Could not create user: " + err });
    return next();
  }

  res.status(201).json({
    user: {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      profilePictureUrl: newUser.profilePictureUrl,
      rooms: newUser.rooms,
      token,
    },
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
    user = await User.findOne({ email }).populate("rooms");
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    res.status(400).json({ message: "Invalid username or password" });
    return next();
  }
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    res.status(400).json({ message: "Invalid username or password" });
    return next();
  }

  if (!isValidPassword) {
    res.status(400).json({ message: "Invalid username or password" });
    return next();
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRECT,
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).json({ message: "Could not login: " + err });
    return next();
  }
  user.token = token;

  res.status(200).json({
    user: {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
      rooms: user.rooms,
      token,
    },
  });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.find({ email });

    if (user.length) {
      const newPassword = passGenerator.generate({
        length: 8,
        numbers: true,
      });

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(newPassword, 12);
      } catch (err) {
        res.status(500).json({ message: "Could not create user" });
        return next();
      }

      user[0].password = hashedPassword;

      const emailMessage = {
        to: email,
        from: {
          name: "Music Chat App",
          email: "namemusicchatapp@gmail.com",
        },
        templateId: "d-ece3601d1b8248369d1f3e75e816a972",

        dynamicTemplateData: {
          name: `${user[0].userName}`,
          newPassword,
        },
      };
      try {
        const res = await sgMail.send(emailMessage);
        const resUser = await user[0].save();
      } catch (err) {
        console.log(err);
      }

      return res.status(200).json({ message: "user exists and email sent" });
    } else {
      console.log(email + "doesnt exists");
      return res.status(400).json({ message: "user doesnt exists" });
    }
  } catch (err) {
    console.log(err + "error");
    return res.status(400).json({ message: "user doesnt exists" });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
exports.forgotPassword = forgotPassword;
