const gradePoints = {
  "A+": 4.0,
  "A": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "C+": 2.7,
  "C": 2.3,
  "D": 2.0,
  "F": 0.0
};

document.getElementById("addCourse").addEventListener("click", () => {
  const tbody = document.getElementById("courseBody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="Course Name" class="course-name"></td>
    <td><input type="number" placeholder="Credit Hours" class="credit-hours" min="1"></td>
    <td>
      <select class="grade">
        <option value="">Select</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    </td>
    <td><button class="remove-btn">Remove</button></td>
  `;
  tbody.appendChild(row);

  row.querySelector(".remove-btn").addEventListener("click", () => {
    row.remove();
  });
});

document.getElementById("calculateCGPA").addEventListener("click", () => {
  const rows = document.querySelectorAll("#courseBody tr");
  let totalCredits = 0, totalPoints = 0;

  for (const row of rows) {
    const name = row.querySelector(".course-name").value.trim();
    const credit = parseFloat(row.querySelector(".credit-hours").value);
    const grade = row.querySelector(".grade").value;

    if (!name || !credit || !grade) {
      alert("Please fill all fields before calculation.");
      return;
    }

    if (credit <= 0) {
      alert("Credit hours must be a positive number.");
      return;
    }

    totalCredits += credit;
    totalPoints += credit * gradePoints[grade];
  }

  if (totalCredits === 0) return;

  const cgpa = (totalPoints / totalCredits).toFixed(2);

  document.getElementById("totalCredits").textContent = totalCredits;
  document.getElementById("totalPoints").textContent = totalPoints.toFixed(2);
  document.getElementById("finalCGPA").textContent = cgpa;
  document.getElementById("result").classList.remove("hidden");
});

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("courseBody").innerHTML = `
    <tr>
      <td><input type="text" placeholder="Course Name" class="course-name"></td>
      <td><input type="number" placeholder="Credit Hours" class="credit-hours" min="1"></td>
      <td>
        <select class="grade">
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </td>
      <td><button class="remove-btn">Remove</button></td>
    </tr>
  `;
  document.getElementById("result").classList.add("hidden");
});
