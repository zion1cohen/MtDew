import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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
const auth = getAuth(app); // Initialize authentication instance
const db = getFirestore(app);

// Wait for the page to load before attaching event listeners
window.onload = function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const psw = document.getElementById("psw").value;
      const role = document.getElementById("role").value;
      const age = document.getElementById("age").value;
      const maritalStatus = document.getElementById("MaritalStatus").value;
      const disability = document.getElementById("disability").value;
      const gender = document.getElementById("gender").value;
      const email = document.getElementById("email").value;

      try {
        // Create user account using Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          psw
        );

        // Define default values for additional user information
        const defaultUserFields = {
          Status: "Active",
          Interests: "", // You can set a default value or leave it empty
          AccountAction: ["create"],
          MatchAction: "manual",
          Connections: {},
          Posts: {},
          SentMessages: {},
          ReceivedMessages: {},
          SentFriendRequests: {},
          ReceivedFriendRequests: {},
          FeedbackGiven: {},
          FlagsMade: {},
        };

        // Save additional user information to Firestore with default values
        await addDoc(collection(db, "USER"), {
          userId: userCredential.user.uid,
          Name: name,
          email: email,
          Age: age,
          MaritalStatus: maritalStatus,
          Disability: disability,
          Gender: gender,
          ...defaultUserFields, // Spread the default values
        });

        // Redirect user based on role
        switch (role) {
          case "user":
            window.location.href = "home.html";
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
        console.error("Error registering user:", error.message);
      }
    });
};
