const mongoose = require("mongoose");

const UserExamSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  exam_name: {
    type: String,
    required: true,
  },
  exam_code: {
    type: String,
    required: true,
    maxlength: 6,
    unique: true,
  },
  exam_passkey: {
    type: String,
    maxlength: 6,
  },
  exam_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expire_time: {
    type: Date,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
      },
      opt1: {
        type: String,
        required: true,
      },
      opt2: {
        type: String,
        required: true,
      },
      opt3: {
        type: String,
        required: true,
      },
      opt4: {
        type: String,
        required: true,
      },

      correct_option: {
        type: Number,
        default: 1,
      },
    },
  ],
});
module.exports = Exam = mongoose.model("exam", UserExamSchema);
