import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ fetchStudents, editStudent, clearEdit }) => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", marks: "" }]);

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setRollNumber(editStudent.rollNumber);
      setSubjects(editStudent.subjects);
    }
  }, [editStudent]);

  const handleSubjectChange = (i, key, value) => {
    const newSubjects = [...subjects];
    newSubjects[i][key] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => setSubjects([...subjects, { name: "", marks: "" }]);
  const removeSubject = (i) => setSubjects(subjects.filter((_, index) => index !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, rollNumber, subjects };

    try {
      if (editStudent) {
        await axios.put(`http://localhost:5003/students/${editStudent._id}`, data);
        clearEdit();
      } else {
        await axios.post("http://localhost:5003/students", data);
      }
      setName("");
      setRollNumber("");
      setSubjects([{ name: "", marks: "" }]);
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <h2>{editStudent ? "Update" : "Add"} Student</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
      {subjects.map((sub, i) => (
        <div className="subject-row" key={i}>
          <input placeholder="Subject" value={sub.name} onChange={e => handleSubjectChange(i, "name", e.target.value)} required />
          <input placeholder="Marks" type="number" value={sub.marks} onChange={e => handleSubjectChange(i, "marks", e.target.value)} required />
          <button type="button" onClick={() => removeSubject(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addSubject}>Add Subject</button>
      <button type="submit">{editStudent ? "Update" : "Add"} Student</button>
    </form>
  );
};

export default StudentForm;
