const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Registration = require("../models/Registration");

// Create Event
router.post("/", async (req, res) => {

  try {

    const { name, date, venue, capacity } = req.body;

    const event = new Event({
      name,
      date,
      venue,
      capacity
    });

    await event.save();

    res.json({
      message: "Event created successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// Get All Events
router.get("/", async (req, res) => {

  try {

    const events = await Event.find().sort({ date: 1 });

    const result = [];

    for (const event of events) {

      const registrations =
        await Registration.countDocuments({
          eventId: event._id
        });

      result.push({
        ...event.toObject(),
        registrations
      });

    }

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;