const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Authentication successsful", token });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
