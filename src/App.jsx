import React, { useState } from "react";
import "./index.css";

const DEFAULT_GRADE_POINTS = {
  "A+": 4.0,
  "A": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "C+": 2.7,
  "C": 2.3,
  "D": 2.0,
  "F": 0.0,
};

let nextId = 1;

export default function App() {
  const [courses, setCourses] = useState([{ id: nextId++, name: "", credits: "", grade: "" }]);
  const [gradePoints, setGradePoints] = useState(DEFAULT_GRADE_POINTS);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState(null);

  function addCourse() {
    setCourses((c) => [...c, { id: nextId++, name: "", credits: "", grade: "" }]);
  }

  function removeCourse(id) {
    setCourses((c) => c.filter((r) => r.id !== id));
  }

  function updateCourse(id, field, value) {
    setCourses((rows) => rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function calculateCGPA() {
    const e = [];
    if (courses.length === 0) e.push("Add at least one course.");
    courses.forEach((r, idx) => {
      const row = idx + 1;
      if (!r.name) e.push(`Row ${row}: Course name required`);
      if (!r.credits || r.credits <= 0) e.push(`Row ${row}: Credit hours must be positive`);
      if (!r.grade || !(r.grade in gradePoints)) e.push(`Row ${row}: Grade invalid`);
    });
    if (e.length) {
      setErrors(e);
      setResults(null);
      return;
    }

    let totalCredits = 0;
    let totalGradePoints = 0;
    courses.forEach((r) => {
      totalCredits += Number(r.credits);
      totalGradePoints += Number(r.credits) * gradePoints[r.grade];
    });

    const cgpa = totalGradePoints / totalCredits;
    setResults({
      totalCredits,
      totalGradePoints: totalGradePoints.toFixed(2),
      cgpa: cgpa.toFixed(2),
    });
    setErrors([]);
  }

  return (
    <div className="app">
      <h1>CGPA Calculator</h1>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((r) => (
            <tr key={r.id}>
              <td>
                <input
                  value={r.name}
                  onChange={(e) => updateCourse(r.id, "name", e.target.value)}
                  placeholder="Course"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={r.credits}
                  onChange={(e) => updateCourse(r.id, "credits", e.target.value)}
                  placeholder="3"
                />
              </td>
              <td>
                <select value={r.grade} onChange={(e) => updateCourse(r.id, "grade", e.target.value)}>
                  <option value="">Select</option>
                  {Object.keys(gradePoints).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => removeCourse(r.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={addCourse}>Add Course</button>
        <button onClick={calculateCGPA}>Calculate CGPA</button>
      </div>

      {errors.length > 0 && (
        <div className="error-box">
          <strong>Errors:</strong>
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}

      {results && (
        <div className="result">
          <p>Total Credit Hours: {results.totalCredits}</p>
          <p>Total Grade Points: {results.totalGradePoints}</p>
          <h3>Final CGPA: {results.cgpa}</h3>
        </div>
      )}
    </div>
  );
}
export default function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-600">CGPA Calculator</h1>
      <p className="text-gray-600 mt-2">Tailwind is working! 🎉</p>
    </div>
  );
}

