const API_URL = "http://localhost:3000";

function submitFeedback() {
  const name = document.getElementById("studentName").value;
  const message = document.getElementById("feedback").value;

  if (name === "" || message === "") {
    alert("Please fill all fields");
    return;
  }

  fetch(`${API_URL}/add-feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ student_name: name, message: message })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    document.getElementById("studentName").value = "";
    document.getElementById("feedback").value = "";
    loadFeedback();
  });
}

function loadFeedback() {
  fetch(`${API_URL}/feedback`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("feedbackList");
      list.innerHTML = "";
      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "feedback-item";
        div.innerHTML = `<strong>${item.student_name}</strong><br>${item.message}`;
        list.appendChild(div);
      });
    });
}

// Load feedback on page load
loadFeedback();
