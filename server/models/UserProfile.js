const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  dob: {
    type: Date,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = UserProfile = mongoose.model("userProfile", UserProfileSchema);
