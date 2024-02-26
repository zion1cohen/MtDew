// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIuoGDwaVQ6kdfhZp9ZkFgE5yVR9u1JKk",
  authDomain: "connectability-6ee02.firebaseapp.com",
  projectId: "connectability-6ee02",
  storageBucket: "connectability-6ee02.appspot.com",
  messagingSenderId: "908801065257",
  appId: "1:908801065257:web:bd93fbe7049ad8c6867738",
  measurementId: "G-N8HMEMRV16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add event listener to the login form
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const role = document.getElementById("role").value;
  const uname = document.getElementById("uname").value;
  const psw = document.getElementById("psw").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, uname, psw);
    // Redirect user based on role
    switch (role) {
      case "user":
        window.location.href = "user.html";
        break;
      case "admin":
        // Redirect to admin page
        break;
      case "support":
        // Redirect to support page
        break;
      default:
        console.log("Invalid role selected.");
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
});
