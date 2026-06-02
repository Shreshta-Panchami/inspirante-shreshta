const mongoose = require("mongoose");
require("dotenv").config();

const Registration = require("./models/Registration");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    await Registration.deleteMany();

    console.log("All registrations deleted");

    process.exit();

  })
  .catch(err => console.log(err));