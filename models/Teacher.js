const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    role: String,
    class: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
