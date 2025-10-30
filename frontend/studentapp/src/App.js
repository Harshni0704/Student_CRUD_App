import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);


  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5003/students");
      setStudents(res.data);
    } catch (err) {
      alert("Error fetching students!");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const clearEdit = () => setEditStudent(null);

  return (
    <div className="container">
      <h1>Student CRUD App</h1>
      <StudentForm fetchStudents={fetchStudents} editStudent={editStudent} clearEdit={clearEdit} />
      <StudentList students={students} setEditStudent={setEditStudent} fetchStudents={fetchStudents} />
    </div>
  );
}

export default App;
