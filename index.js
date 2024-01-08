const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
// Connect to MongoDB database using Mongoose
const port = process.env.PORT;
const db = process.env.db;
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const studentroute = require("./routes/students/route.js");
const adminroute = require("./routes/admins/route.js");
const teacherroute = require("./routes/teacher/route.js");
const check = require("./middleware/check.js");
app.use(check);

// register routes
app.use(express.json());
app.use("/student", studentroute);
app.use("/admin", adminroute);
app.use("/teacher", teacherroute);
app.use(bodyParser.urlencoded({ extended: true }));
// model
const Class = require("./models/class.js");

app.get("/", (req, res) => {
  res.render("login/index");
});

app.post("/class", async (req, res) => {
  try {
    const { name } = req.body;
    const newclass = new Class({ name });
    newclass.save();
    res.json("class created succesfully");
  } catch (error) {
    console.log("error creating class" + error);
  }
});

app.listen(port, () => {
  console.log(`app started at http://localhost:${port}`);
  mongoose
    .connect(db)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("error connected to database" + err);
    });
});
