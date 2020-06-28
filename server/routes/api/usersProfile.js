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
router.post("/", auth, async (req, res) => {
  const {
    website,
    location,
    skills,
    bio,
    dob,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build Profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (dob) profileFields.dob = dob;
  if (skills)
    profileFields.skills = skills.split(",").map((skills) => skills.trim());

  // Build Social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    // Profile exists then update profile
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Profile not exists then Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
