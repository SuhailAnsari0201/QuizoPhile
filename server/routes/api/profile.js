const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");

// @route   GET api/profile/me
// @desc    GET Current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("SERVER ERROR !!!");
  }
});

// @route   POST api/profile/
// @desc    Create or Update user profile
// @access  Private
