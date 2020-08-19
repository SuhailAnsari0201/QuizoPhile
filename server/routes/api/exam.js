const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const isAdmin = require("../../middleware/isAdmin");

const Exam = require("../../models/Exam");
const UserResult = require("../../models/UserResult");

// @route   POST api/exam
// @desc    Create exam by admin
// @access  Private
router.post(
  "/",
  [
    isAdmin,
    [
      check("exam_name", "Test Name is Required").not().isEmpty(),
      check("exam_code", "Test Code is Required").not().isEmpty(),
      check("exam_passkey", "Test Passkey is Required").not().isEmpty(),
      // check("expire_time", "Test Expire Date is Required").not().isEmpty(),
      check("questions", "Question is not array").isArray(),
      check("questions.*.title", "Title is Required").not().isEmpty(),
      check("questions.*.content", "Content is Required").not().isEmpty(),
      check("questions.*.opt1", "All 4 options is Required").not().isEmpty(),
      check("questions.*.opt2", "All 4 options is Required").not().isEmpty(),
      check("questions.*.opt3", "All 4 options is Required").not().isEmpty(),
      check("questions.*.opt4", "All 4 options is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      exam_name,
      exam_code,
      exam_passkey,
      expire_time,
      questions,
    } = req.body;
    const testFields = {};
    testFields.user = req.user.id;
    testFields.exam_name = exam_name;
    testFields.exam_code = exam_code;
    testFields.exam_passkey = exam_passkey;
    testFields.expire_time = expire_time;
    testFields.questions = questions;

    try {
      // Test exists then update test
      let test = await Exam.findOne({ user: req.user.id });
      if (test) {
        let result = await Exam.findOneAndUpdate(
          { exam_code: exam_code },
          { $set: testFields },
          { new: true }
        );
        if (result) {
          return res.json({ msg: "Exam Updated", test: result });
        }
      }

      // Create New Test By Admin
      test = new Exam(testFields);
      await test.save();
      res.json({ msg: "New Exam Created", test: test });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("SERVER ERROR !!!");
    }
  }
);
// @route   POST api/exam
// @desc    Create exam by admin
// @access  Private
router.get(
  "/:exam_code/:passkey",
  [
    auth,
    [
      check("passkey", "Passkey is Required").not().isEmpty(),
      check("exam_code", "Test Code is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      let exam = await Exam.findOne({ exam_code: req.params.exam_code });
      if (!exam) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      if (exam.exam_passkey != req.params.passkey) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials2" }] });
      }

      res.json({ msg: "Exam Started", exam: exam });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("SERVER ERROR !!!");
    }
  }
);

// @route   PUT api/exam
// @desc    Create exam by admin
// @access  Private

router.put("/result", auth, async (req, res) => {
  const { exam_name, exam_code, numberOfQuestions, score } = req.body;
  const result = {
    exam_name,
    exam_code,
    total_marks: numberOfQuestions,
    obtain_marks: score,
  };

  try {
    let userResult = await UserResult.findOne({ user: req.user.id });
    if (!userResult) {
      userResult = new UserResult({ user: req.user.id, exams: [result] });
      await userResult.save();
      return res.json({ msg: "Exam Started", userResult: userResult });
    }
    // Result not exists then Create new user Result

    userResult.exams.unshift(result);
    await userResult.save();
    res.json({ msg: "Exam Started", userResult: userResult });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("SERVER ERROR !!!");
  }
});

module.exports = router;
