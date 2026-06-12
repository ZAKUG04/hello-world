// ==============================
// LOGIN PROTECTION
// ==============================

if (
  !localStorage.getItem("currentUser") &&
  !window.location.pathname.includes("login.html")
) {
  window.location.href = "login.html";
}

// ==============================
// USER PLAN
// ==============================

window.addEventListener("DOMContentLoaded", () => {
  const plan = localStorage.getItem("selectedPlan");

  const userPlan = document.getElementById("userPlan");

  if (plan && userPlan) {
    userPlan.innerText =
      "Current plan: " + plan.toUpperCase();
  }
});

// ==============================
// MACHINES
// ==============================

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

// ==============================
// WORKOUTS
// ==============================

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

// ==============================
// SUBSCRIPTION MODAL
// ==============================

function openForm(plan) {
  document.getElementById("formModal").style.display = "flex";

  document.getElementById("selectedPlan").innerText =
    "Plan: " + plan.toUpperCase();

  localStorage.setItem("selectedPlan", plan);
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

function fakePayPal() {
  const status =
    document.getElementById("paymentStatus");

  status.style.color = "yellow";
  status.innerText = "Processing payment...";

  setTimeout(() => {

    status.style.color = "#00ff88";
    status.innerText =
      "Payment successful (simulation) ✓";

    setTimeout(() => {
      alert("Subscription activated (simulation only)");

      closeForm();

      status.innerText = "";

    }, 1500);

  }, 2000);
}

// ==============================
// RECURSION EXAMPLE
// ==============================

function countdown(number) {

  if (number <= 0) {
    console.log("Workout Ready!");
    return;
  }

  console.log(number);

  countdown(number - 1);
}

countdown(3);

// ==============================
// ERROR HANDLING EXAMPLE
// ==============================

function checkUser(name) {

  try {

    if (!name) {
      throw new Error("Username is required");
    }

    console.log("Welcome " + name);

  } catch (error) {

    console.log("Error:", error.message);

  }
}

checkUser("");

// ==============================
// SHOW LOGGED USER
// ==============================

const currentUser =
  localStorage.getItem("currentUser");

const welcomeUser =
  document.getElementById("welcomeUser");

if (currentUser && welcomeUser) {

  welcomeUser.innerHTML =
    `<i class="fa-solid fa-user"></i> ${currentUser}`;

}

// ==============================
// LOGOUT
// ==============================

function logout() {

  localStorage.removeItem("currentUser");

  window.location.href = "login.html";
}

const logoutBtn =
  document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", logout);

}

// ======================
// WORKOUT TRACKER
// ======================

function saveWorkout() {

    const workoutName =
        document.getElementById("workoutName")?.value;

    const duration =
        document.getElementById("duration")?.value;

    const notes =
        document.getElementById("notes")?.value;

    if (!workoutName || !duration || !notes) {
        alert("Please fill all fields");
        return;
    }

    const workout = {
        name: workoutName,
        duration: duration,
        notes: notes
    };

    localStorage.setItem(
        "savedWorkout",
        JSON.stringify(workout)
    );

    displayWorkout();

    alert("Workout saved successfully!");
}

function displayWorkout() {

    const savedWorkout =
        localStorage.getItem("savedWorkout");

    const container =
        document.getElementById("savedWorkout");

    if (!savedWorkout || !container) return;

    const workout =
        JSON.parse(savedWorkout);

    container.innerHTML = `
        <p><strong>Name:</strong> ${workout.name}</p>
        <p><strong>Duration:</strong> ${workout.duration} min</p>
        <p><strong>Notes:</strong> ${workout.notes}</p>
    `;
}

// Mostrar rutina guardada al cargar la página
window.addEventListener("DOMContentLoaded", () => {

    displayWorkout();

});

const openMenu =
    document.getElementById("openMenu");

const closeMenu =
    document.getElementById("closeMenu");

const mobilePopup =
    document.getElementById("mobilePopup");

if(openMenu){

    openMenu.addEventListener("click",(e)=>{

        e.preventDefault();

        mobilePopup.classList.add("show");

    });

}

if(closeMenu){

    closeMenu.addEventListener("click",()=>{

        mobilePopup.classList.remove("show");

    });

}