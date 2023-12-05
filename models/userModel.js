const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Pls add the user name"],
    },

    email: {
      type: String,
      required: [true, "Pls add the user email"],
      unique: [true, "Email address already exists"],
    },

    password: {
      type: String,
      required: [true, "Pls add the user password"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
