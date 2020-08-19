const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const accountSid = config.get("twilio_accountSID");
const authToken = config.get("twilio_authToken");
const serviceID = config.get("twilio_serviceID");
const client = require("twilio")(accountSid, authToken);

const User = require("../../models/User");

//-------RESET PASSWORD USING MOBILE NUMBER--------------
// @route   POST api/forgot-password
// @desc    Send OTP to reset password
// @access  Public
// router.post(
//   "/",
//   [
//     check("mobile", "Please Enter valid Mobile Number")
//       .isMobilePhone()
//       .isLength({ min: 10, max: 10 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ error: errors.array() });
//     }
//     const mobile = req.body.mobile;
//     try {
//       // Check Mobile is Registerd or not
//       let user = await User.findOne({ mobile });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Mobile Not Registerd" }] });
//       }
//       const token = jwt.sign({ mobile }, config.get("JWT_FORGOT_PASSWORD"), {
//         expiresIn: "10m",
//       });

//       // Send OTP
//       const data = await client.verify
//         .services(serviceID)
//         .verifications.create({ to: `+91${mobile}`, channel: "sms" });

//       console.log("OTP send to " + mobile);
//       res
//         .status(200)
//         .send({ token: token, msg: `OTP send on ${mobile} mobile number` });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("SERVER ERROR !!!");
//     }
//   }
// );
// @route   POST api/forgotPassword/otpverify
// @desc    Verify send OTP
// @access  Private
// router.post(
//   "/otpverify",
//   [check("otp", "Invalid OTP").isNumeric().isLength({ min: 6, max: 6 })],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ error: errors.array() });
//     }
//     const { token, otp } = req.body;
//     if (!token) {
//       return res
//         .status(400)
//         .json({ errors: [{ msg: "Something went wrong !!!" }] });
//     }
//     try {
//       const decode = jwt.verify(token, config.get("JWT_FORGOT_PASSWORD"));
//       const { mobile } = decode;

//       // OTP verification
//       const data = await client.verify
//         .services(serviceID)
//         .verificationChecks.create({
//           to: `+91${mobile}`,
//           code: otp,
//         });
//       if (!data.valid) {
//         return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
//       }
//       const token2 = jwt.sign({ mobile }, config.get("JWT_FORGOT_PASSWORD2"), {
//         expiresIn: "10m",
//       });

//       return res.status(200).json({ token: token2, msg: "valid OTP" });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("SERVER ERROR !!!");
//     }
//   }
// );
// @route   POST api/forgotPassword/resetpassword
// @desc    Verify send OTP
// @access  Private
// router.post(
//   "/resetpassword",
//   [check("password", "Pls Enter Valid Password").isLength({ min: 6 })],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ error: errors.array() });
//     }
//     const { token, password } = req.body;

//     if (!token) {
//       return res
//         .status(400)
//         .json({ errors: [{ msg: "Something went wrong !!!" }] });
//     }
//     try {
//       const decode = jwt.verify(token, config.get("JWT_FORGOT_PASSWORD2"));
//       const { mobile } = decode;

//       const salt = await bcrypt.genSalt(10);
//       newpassword = await bcrypt.hash(password, salt);

//       let user = await User.findOneAndUpdate(
//         { mobile },
//         { $set: { password: newpassword } },
//         { new: true }
//       );
//       res.status(200).json({ msg: "password updated Successfully" });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("SERVER ERROR !!!");
//     }
//   }
// );

//-----------RESET PASSWORD USIN EMAIL--------

// @route   POST api/forgotPassword
// @desc    Reset the user Password (send resetpassword link on user email)
// @access  Public
router.post(
  "/",
  [check("email", "Please include a valid Email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpire = Date.now() + 600000;
      await user.save();

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
        subject: "Your Password !!!",
        text: `You are receiving this because you (or someonr else) have reqested the reset of the password for your account.
                Please click on the following link or past this into your browser to complete the process within 10 min of receiving it.
                http://localhost:3000/resetPassword/${token}
                If you did not request this please ignore this email`,
      };
      transporter.sendMail(mailOption, (err, response) => {
        if (err) {
          console.log("there was an error for sending mail" + err);
          res.status(400).json({
            errors: [
              {
                msg:
                  "There was an error for sending mail PLS try again later..",
              },
            ],
          });
        } else {
          console.log("here is response" + response);
          res.status(200).json({ msg: "password is send on your mailID" });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR !!!");
    }
  }
);
// @route   POST api/auth/reset
// @desc    Check resetpassword link on user email is valid.
// @access  Private
router.get("/:token", async (req, res) => {
  try {
    let user = await User.findOne({ resetPasswordToken: req.params.token });
    if (!user || user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({
        errors: [{ msg: "Password reset link is invalid or has expire" }],
      });
    } else {
      res.json({ email: user.email });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR !!!");
  }
});
// @route   POST api/auth/resetPasswordViaEmail
// @desc    Reset password via email
// @access  Private
router.put("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);
    let user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: newpassword,
          resetPasswordExpire: "",
          resetPasswordToken: "",
        },
      },
      { new: true }
    );
    res.json({ msg: "Password Updated Successfullty" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "SERVER ERROR !!!" });
  }
});
module.exports = router;
