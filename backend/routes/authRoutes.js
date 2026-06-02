const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        message: "Invalid role selected"
      });
    }

    res.json({
      message: "Login successful",
      role: user.role,
      name: user.name
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;