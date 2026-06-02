const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const User = require("../models/User");
const Event = require("../models/Event");

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

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const registrationCount =
      await Registration.countDocuments({
        eventId: eventId
      });

    if (registrationCount >= event.capacity) {
      return res.status(400).json({
        message: "Event is Full"
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


/* VIEW STUDENTS FOR AN EVENT */

router.get("/event/:eventId", async (req, res) => {

  try {

    const registrations =
      await Registration.find({
        eventId: req.params.eventId
      }).populate("studentId");

    const students = registrations.map(r => ({
      name: r.studentId.name,
      username: r.studentId.username
    }));

    res.json(students);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* MY REGISTRATIONS */

router.get("/student/:username", async (req, res) => {

  try {

    const student = await User.findOne({
      username: req.params.username
    });

    if (!student) {
      return res.status(404).json([]);
    }

    const registrations =
      await Registration.find({
        studentId: student._id
      }).populate("eventId");

    const events = registrations.map(r => ({
      name: r.eventId.name,
      date: r.eventId.date,
      venue: r.eventId.venue
    }));

    res.json(events);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;