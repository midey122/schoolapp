const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin.js");

router.get("/", () => {
  console.log("welcome admin");
});
router.post("/register", async (req, res) => {
  try {
    let { name, username, role, password } = req.body;

    if (!name || !username || !password || !role) {
      return res.status(400).send("Please include all fields");
    }
    let admin = await Admin.findOne({ username: username });
    if (admin) {
      res.json("username is already used");
    } else {
      if (password.length <= 4) {
        return res.status(400).send("Password too short");
      }
      password = await bcrypt.hashSync(password, 10);
      let newUser = new Admin({ name, username, password, role });
      await newUser.save();
      res.status(201).json("admin account created ");
    }
  } catch (error) {}
});
module.exports = router;
