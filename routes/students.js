const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE
router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

// CREATE
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE ONE
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.gender != null) {
    res.student.gender = req.body.gender;
  }
  if (req.body.birthday != null) {
    res.student.birthday = req.body.birthday;
  }

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ONE
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: "deleted student" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET BY ID, STORE TO RES
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
}

module.exports = router;
