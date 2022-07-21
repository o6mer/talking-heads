const { validationResult } = require("express-validator");

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

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs passed, please check your data."));
  }
  const { userName, email, password } = req.body;

  if (
    DUMMY_USERS.map((user) => user.email).find(
      (existingEmail) => existingEmail === email
    )
  ) {
    return next(new Error("user exists already"));
  }

  const createdUser = {
    userId: new Date().getTime(),
    userName,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({
    userId: createdUser.userId,
    email: createdUser.email,
    password: createdUser.password,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "bad input",
    });
  }

  console.log(req.body);
  const { email, password } = req.body;

  const user = DUMMY_USERS.find(
    (user) => user.email === email && user.password === password
  );
  // if (!user) return next(new Error("Email or password are incorrect"));
  if (!user) {
    res.status(400).json({ message: "Invalid username or password" });
    return next("text");
  }

  res.status(200).json({
    ...user,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
