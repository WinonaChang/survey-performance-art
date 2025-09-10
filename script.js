document.getElementById("surveyForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  let obj = {};
  formData.forEach((value, key) => obj[key] = value);

  // 顯示結果
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("resultJson").textContent = JSON.stringify(obj, null, 2);

  // 存到 localStorage
  localStorage.setItem("surveyResult", JSON.stringify(obj));
});

function downloadCSV() {
  const data = JSON.parse(localStorage.getItem("surveyResult"));
  if (!data) return;

  const csvRows = [];
  const headers = Object.keys(data).join(",");
  const values = Object.values(data).join(",");
  csvRows.push(headers);
  csvRows.push(values);

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "survey.csv");
  a.click();
}
