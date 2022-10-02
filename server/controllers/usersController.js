const { validationResult } = require("express-validator");
const { User } = require("../models/userModel");
const sgMail = require("@sendgrid/mail");
const passGenerator = require("generate-password");

const SENDGRID_API_KEY =
  "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";

sgMail.setApiKey(SENDGRID_API_KEY);

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

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.find({ email });
    console.log(user[0]);

    if (user.length) {
      const newPassword = passGenerator.generate({
        length: 8,
        numbers: true,
      });

      user[0].password = newPassword;

      const emailMessage = {
        to: email,
        from: {
          name: "Music Chat App",
          email: "namemusicchatapp@gmail.com",
        },
        templateId: "d-8ab61f4847ae4e798f644d794c7ed151",
        dynamicTemplateData: {
          name: `${user[0].userName}`,
          newPassword,
        },
      };
      try {
        const res = await sgMail.send(emailMessage);
        const resUser = await user[0].save();
        console.log(res, resUser);
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
