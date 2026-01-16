const firebaseConfig = {
  apiKey: "AIzaSyAa4N0TAbRxOR2CInjo3YKFzJ6-wHrAYis",
  authDomain: "attendx1-c872a.firebaseapp.com",
  projectId: "attendx1-c872a",
  storageBucket: "attendx1-c872a.appspot.com",
  messagingSenderId: "726646028974",
  appId: "1:726646028974:web:6b2b921e73f53eed1dcb3f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const db = firebase.firestore();
const auth = firebase.auth();

// LOGIN
unction login() {
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  localStorage.setItem("email",email);
  localStorage.setItem("role",role);
  

  if (!email) {
    alert("Enter college email");
    return;
  }

  // Optional: save user if not exists
  db.collection("users").doc(email).set({
    email: email,
    role: role
  }, { merge: true });

  if (role === "student") {
    window.location.href = "student.html";
  } else {
    window.location.href = "teacher.html";
  }
}
// STUDENT: MARK ATTENDANCE
function markAttendance(sessionId, subject) {
  const email = localStorage.getItem("email");

  db.collection("attendance_records").add({
    email: email,
    sessionId: sessionId,
    subject: subject,
    status: "present",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Attendance marked ✅");
  });
}

// ATTENDANCE PREDICTION
function loadPrediction() {
  const attended = 42;
  const total = 58;
  const percent = ((attended / total) * 100).toFixed(2);

  let message = percent >= 75
    ? "You're safe 💙"
    : "Attend next classes to stay eligible";

  document.getElementById("attendanceText").innerText =
    Attendance: ${percent}%;

  document.getElementById("predictionText").innerText = message;
}

// FEEDBACK
function sendFeedback() {
  const text = document.getElementById("feedback").value;
  db.collection("feedback").add({
    text,
    time: new Date()
  });
  alert("Feedback submitted anonymously 🌸");
}

// TEACHER
function startAttendance() {
  document.getElementById("qrStatus").innerText =
    "QR Generated (Geo-fenced)";
}

if (document.getElementById("predictionText")) {
  loadPrediction();
}
