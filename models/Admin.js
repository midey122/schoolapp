const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
