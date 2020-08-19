const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const isAdmin = require("../../middleware/isAdmin");

const Admin = require("../../models/Admin");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", isAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR !!!");
  }
});

// @route   POST api/auth
// @desc    Authenticate Admin & get token (Login Admin)
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Please is Required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      if (password !== admin.password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials2" }] });
      }

      const payload = {
        admin: {
          id: admin.id,
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
