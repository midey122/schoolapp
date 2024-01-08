const express = require("express");
const router = express.Router();
const ClassModel = require("../../models/class.js");
const bcrypt = require("bcrypt");
const Teacher = require("../../models/teacher.js");

router.get("/", () => {
  console.log("welcome teacher");
});

router.post("/register", async (req, res) => {
  try {
    let { name, username, role, Class, password } = req.body;
    console.log("1");
    if (!name || !username || !Class || !password || !role) {
      return res.status(400).send("Please include all fields");
    }
    let teacher = await Teacher.findOne({ username: username });
    let oldclass = await ClassModel.findOne({ name: Class });
    if (!oldclass) {
      res.status(200).json("invalid class");
    }
    if (teacher) {
      res.json("username is already used");
    } else {
      if (password.length <= 4) {
        return res.status(400).send("Password too short");
      }
      password = await bcrypt.hashSync(password, 10);

      let newTeacher = new Teacher({ name, class:Class, username, password, role });
      await newTeacher.save();
      console.log("1");
      res.status(201).json("teacher account created ");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
