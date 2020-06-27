const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   POST api/users/signup
// @desc    Register User
// @access  Public
router.post(
  "/signup",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("password", "Please enter a valid Password").isLength({ min: 6 }),
    check("mobile", "Please Enter valid Mobile Number").isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, mobile, password } = req.body;
    try {
      let user = await User.findOne({ mobile });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already Exists" }] });
      }
      user = new User({ name, mobile, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json({ msg: "User Registerd Successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token (Login User)
// @access  Public
router.post(
  "/login",
  [
    check("mobile", "Please include a valid Mobile").isMobilePhone(),
    check("password", "Please is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { mobile, password } = req.body;
    try {
      let user = await User.findOne({ mobile });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials2" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR !!!");
    }
  }
);

module.exports = router;
