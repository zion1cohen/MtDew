import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your Firebase configuration
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

// Wait for the page to load before attaching event listeners
window.onload = function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const uname = document.getElementById("uname").value;
      const psw = document.getElementById("psw").value;
      const role = document.getElementById("role").value;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          uname,
          psw
        );
        // Redirect user based on role
        switch (role) {
          case "user":
            window.location.href = "user.html";
            break;
          case "admin":
            window.location.href = "admin.html";
            break;
          case "support":
            window.location.href = "support.html";
            break;
          default:
            console.log("Invalid role selected.");
        }
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    });
};
