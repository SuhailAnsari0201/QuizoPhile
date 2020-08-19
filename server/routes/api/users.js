const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Send OTP to verify user Using Email ID
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),

    check("password", "Please enter a valid Password").isLength({ min: 6 }),
    check("mobile", "Please Enter valid Mobile Number")
      .isMobilePhone()
      .isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, password } = req.body;

    try {
      // Check Unique Mobile Number and Email
      let user = await User.findOne({ $or: [{ email }, { mobile }] });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already Exists" }] });
      }
      const otp = await Math.floor(Math.random() * 100000);
      const token = jwt.sign(
        { name, mobile, email, password, otp },
        config.get("JWT_ACCOUNT_ACTIVATE"),
        { expiresIn: "10m" }
      );

      // Send OTP via Email
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: config.get("emailID"),
          pass: config.get("emailPassword"),
        },
      });
      const mailOption = {
        from: config.get("emailID"),
        to: email,
        subject: "QuizoPhile OTP",
        text: `Your OTP is ${otp}`,
      };
      transporter.sendMail(mailOption, (err, response) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({
            errors: [{ msg: "Error for sending mail PLS try again later.." }],
          });
        } else {
          console.log("Mail Send");
          res
            .status(200)
            .json({ token: token, msg: "OTP is send on your mailID" });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/users/signup
// @desc    Verify OTP then Register User
// @access  Public
router.post(
  "/activateAccount",
  [check("userotp", "OTP is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { token, userotp } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Something went wrong !!!" }] });
    }

    try {
      const decode = jwt.verify(token, config.get("JWT_ACCOUNT_ACTIVATE"));
      const { name, mobile, email, password, otp } = decode;
      // OTP verification (userotp with otp )
      if (userotp != otp)
        return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });

      let user = new User({ name, email, mobile, password });

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

module.exports = router;
