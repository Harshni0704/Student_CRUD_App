const mongoose = require("mongoose");

const StudentData = new mongoose.Schema({
  name: { type: String, required: true },          
  rollNumber: { type: String, required: true, unique: true }, 
  subjects: [                                      
    {
      name: { type: String, required: true },     
      marks: { type: Number, required: true, min: 0, max: 100 } 
    }
  ],
  totalMarks: { type: Number, required: true },   
  percentage: { type: Number, required: true },   
  createdAt: { type: Date, default: Date.now }    
});

module.exports = mongoose.model("Student", StudentData);
