// Import the necessary functions from the Firebase SDK
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
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle registration form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const uname = document.getElementById("uname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;

    try {
      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional user data in Firestore
      await addUserToFirestore(user.uid, uname, email);
      console.log("User registered successfully and data stored in Firestore");
      // Redirect to a success page or perform other actions as needed
    } catch (error) {
      // Handle errors during user registration
      console.error("Error creating user account:", error);
    }
  });

// Function to add user data to Firestore
async function addUserToFirestore(uid, username, email) {
  try {
    // Add user data to the "users" collection in Firestore
    await addDoc(collection(db, "users"), {
      uid: uid,
      username: username,
      email: email,
    });
  } catch (error) {
    throw error;
  }
}
