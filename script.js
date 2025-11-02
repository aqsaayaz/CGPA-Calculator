function calculateCGPA() {
  const gpa1 = parseFloat(document.getElementById("gpa1").value) || 0;
  const gpa2 = parseFloat(document.getElementById("gpa2").value) || 0;
  const gpa3 = parseFloat(document.getElementById("gpa3").value) || 0;

  const cgpa = ((gpa1 + gpa2 + gpa3) / 3).toFixed(2);

  document.getElementById("result").innerText = "Your CGPA is: " + cgpa;
}
