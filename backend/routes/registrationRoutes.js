const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const User = require("../models/User");

router.post("/", async (req, res) => {

  try {

    const { username, eventId } = req.body;

    const student = await User.findOne({
      username: username,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const existing = await Registration.findOne({
      studentId: student._id,
      eventId: eventId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already registered for this event"
      });
    }

    await Registration.create({
      studentId: student._id,
      eventId: eventId
    });

    res.json({
      message: "Registration successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;