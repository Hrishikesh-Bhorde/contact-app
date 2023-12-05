const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // to HASH password as we cannot save raw password in the DB.
const jwt = require("jsonwebtoken"); // web token to verify the user.
const User = require("../models/userModel");

// @desc Register a User
// @ route POST /users/register
//@acess Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // to check if a user exists with same username or email
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Registred");
  }

  //HashPassword

  const hashedPassword = await bcrypt.hash(password, 10); // 10 specifies the no of hashing the raw password.
  console.log(hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("user created", user);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Data Not Valid");
  }
});

// @desc Login User
// @ route POST /users/login
//@acess Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // To check if the user is present in DB.
  const user = await User.findOne({ email });

  // Compare password with Hashed Password.
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Login User
// @ route POST /users/current
//@acess Private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
