const mongoose = require("mongoose");

const UserExamResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  exams: [
    {
      exam_name: {
        type: String,
        required: true,
      },
      exam_code: {
        type: Number,
        required: true,
        maxlength: 6,
        unique: true,
      },
      exam_date: {
        type: Date,
        required: true,
        default: Date.now(),
      },

      total_marks: {
        type: String,
      },
      obtain_marks: {
        type: String,
      },
    },
  ],
});
module.exports = UserResult = mongoose.model(
  "user-result",
  UserExamResultSchema
);
