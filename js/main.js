window.addEventListener("DOMContentLoaded", () => {
  const plan = localStorage.getItem("selectedPlan");

  if (plan) {
    document.getElementById("userPlan").innerText =
      "Current plan: " + plan.toUpperCase();
  }
});
const machines = [
  "Bench Press",
  "Squat Machine",
  "Treadmill",
  "Dumbbells"
];

window.addEventListener("DOMContentLoaded", () => {
  console.log("Gym project loaded");

  machines.forEach(m => {
    console.log("Machine:", m);
  });
});
const workouts = [
  {
    name: "Push Day",
    level: "Beginner",
    focus: "Chest, shoulders, triceps"
  },
  {
    name: "Pull Day",
    level: "Intermediate",
    focus: "Back, biceps"
  },
  {
    name: "Leg Day",
    level: "Advanced",
    focus: "Quads, hamstrings, calves"
  }
];

const container = document.getElementById("workouts-container");

if (container) {
  workouts.forEach(w => {
    const card = document.createElement("div");
    card.classList.add("workout-card");

    card.innerHTML = `
      <h3>${w.name}</h3>
      <p><strong>Level:</strong> ${w.level}</p>
      <p>${w.focus}</p>
    `;

    container.appendChild(card);
  });
}
function openForm(plan) {
  document.getElementById("formModal").style.display = "flex";
  document.getElementById("selectedPlan").innerText = "Plan: " + plan.toUpperCase();

  localStorage.setItem("selectedPlan", plan);
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

function fakePayPal() {
  const status = document.getElementById("paymentStatus");

  status.style.color = "yellow";
  status.innerText = "Processing payment...";

  setTimeout(() => {
    status.style.color = "#00ff88";
    status.innerText = "Payment successful (simulation) ✓";

    setTimeout(() => {
      alert("Subscription activated (simulation only)");
      closeForm();
      status.innerText = "";
    }, 1500);

  }, 2000);
}