const express = require("express");
const router = express.Router();
const Student = require("../../models/student.js");
const ClassModel = require("../../models/class.js");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json("welcome student");
});

router.post("/register", async (req, res) => {
  try {
    let { name, Class, role, username, password } = req.body;
    console.log("ok "+ name);
    if (!name || !Class || !role || !username || !password)
      return res.status(400).send("Please include all fields");
    if (password.length <= 4) {
      return res.status(400).send("Password too short");
    }
    password = bcrypt.hashSync(password, 10);
    const newstudent = new Student({
      name,
      Class,
      role,
      username,
      password,
    });
    const clas = await ClassModel.findOne({ name: Class });
    const student = await Student.findOne({ username: username });
    if (student) {
      res.json("username already used");
    }
    if (clas) {
      await newstudent.save();
      res.json("student account created");
    } else {
      res.json("invalid classname");
    }
  } catch (error) {
    res.json("error creating student" + error);
  }
});
router.get("/register", async (req, res) => {
  const classes = await ClassModel.find();
  console.log(classes);
  res.render("login/registration", {classes});
});
module.exports = router;
