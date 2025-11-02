const gradePoints = {
  "A+": 4.0, "A": 3.7, "B+": 3.3, "B": 3.0,
  "C+": 2.7, "C": 2.3, "D": 2.0, "F": 0.0
};

document.getElementById('addRow').onclick = () => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" placeholder="Course Name"></td>
    <td><input type="number" placeholder="Hours" min="1"></td>
    <td>
      <select>
        <option value="">Select</option>
        <option>A+</option><option>A</option><option>B+</option>
        <option>B</option><option>C+</option><option>C</option>
        <option>D</option><option>F</option>
      </select>
    </td>`;
  document.getElementById('tableBody').appendChild(row);
};

document.getElementById('removeRow').onclick = () => {
  const rows = document.querySelectorAll('#tableBody tr');
  if (rows.length > 1) rows[rows.length - 1].remove();
};

document.getElementById('calculate').onclick = () => {
  const rows = document.querySelectorAll('#tableBody tr');
  let totalCredits = 0, totalPoints = 0;

  for (const row of rows) {
    const name = row.children[0].querySelector('input').value.trim();
    const credit = parseFloat(row.children[1].querySelector('input').value);
    const grade = row.children[2].querySelector('select').value;

    if (!name || !credit || !grade) {
      alert("Please fill all fields before calculating!");
      return;
    }
    if (credit <= 0) {
      alert("Credit hours must be positive!");
      return;
    }

    totalCredits += credit;
    totalPoints += credit * gradePoints[grade];
  }

  const cgpa = totalPoints / totalCredits;
  document.getElementById('totalCredits').textContent = totalCredits;
  document.getElementById('totalPoints').textContent = totalPoints.toFixed(2);
  document.getElementById('finalCGPA').textContent = cgpa.toFixed(2);
  document.getElementById('result').classList.remove('hidden');
};

document.getElementById('reset').onclick = () => {
  document.getElementById('tableBody').innerHTML = `
    <tr>
      <td><input type="text" placeholder="Course Name"></td>
      <td><input type="number" placeholder="Hours" min="1"></td>
      <td>
        <select>
          <option value="">Select</option>
          <option>A+</option><option>A</option><option>B+</option>
          <option>B</option><option>C+</option><option>C</option>
          <option>D</option><option>F</option>
        </select>
      </td>
    </tr>`;
  document.getElementById('result').classList.add('hidden');
};
