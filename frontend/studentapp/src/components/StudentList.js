import React from "react";
import axios from "axios";

const StudentList = ({ students, setEditStudent, fetchStudents }) => {
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5003/students/${id}`);
      fetchStudents();
    }
  };

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Total</th>
          <th>Percentage</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.rollNumber}</td>
            <td>{student.totalMarks}</td>
            <td>{student.percentage}%</td>
            <td>
              <button onClick={() => setEditStudent(student)}>Edit</button>
              <button onClick={() => deleteStudent(student._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
