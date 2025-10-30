

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


function calculation(subjects) {
  let total = 0;

  subjects.forEach(sub => {
    total += Number(sub.marks); 
  });


  const percentage = Math.round((total / (subjects.length * 100)) * 100);

  return { totalMarks: total, percentage: percentage };
}

//create//
router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, subjects } = req.body;

    
    if (!name || !rollNumber || !subjects || !subjects.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { totalMarks, percentage } = calculation(subjects);

    const student = new Student({ name, rollNumber, subjects, totalMarks, percentage });
    await student.save();

    res.status(201).json(student); 
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Roll number must be unique" });
    res.status(500).json({ message: err.message });
  }
});

//read//
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }); //in descending order//
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update//
router.put("/:id", async (req, res) => {
  try {
    const { name, rollNumber, subjects } = req.body;
    const update = {};

    if (name) update.name = name;
    if (rollNumber) update.rollNumber = rollNumber;

    if (subjects) {
      const { totalMarks, percentage } = calculation(subjects);
      update.subjects = subjects;
      update.totalMarks = totalMarks;
      update.percentage = percentage;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Roll number must be unique" });
    res.status(500).json({ message: err.message });
  }
});

//delete//
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
