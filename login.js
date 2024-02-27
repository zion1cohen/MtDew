// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
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
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Get a reference to the Firestore database

// Function to handle Google sign-in
function handleGoogleSignIn() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("Google sign in successful:", user);
      addUserDataToFirestore(user);
      redirectToPage(user.uid); // Redirect after successful login
    })
    .catch((error) => {
      console.error("Error during Google sign in:", error.code, error.message);
    });
}

// Ensure the entire page is loaded before initializing event listeners
window.onload = function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("uname").value;
      const password = document.getElementById("psw").value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Logged in as:", userCredential.user.email);
          redirectToPage(userCredential.user.uid); // Redirect after successful login
        })
        .catch((error) => {
          console.error("Error during sign in:", error.code, error.message);
        });
    });

  // Attaching the Google sign-in handler to the button
  const googleSignInButton = document.querySelector(".google-logo");
  if (googleSignInButton) {
    googleSignInButton.addEventListener("click", handleGoogleSignIn);
  }
};

// Function to add user data to Firestore
function addUserDataToFirestore(user) {
  addDoc(collection(db, "users"), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

// Function to redirect users based on their role
function redirectToPage(uid) {
  const userRef = doc(db, "users", uid);
  const adminRef = doc(db, "admins", uid);
  const supportRef = doc(db, "support_roles", uid);

  getDoc(userRef)
    .then((userDoc) => {
      if (userDoc.exists()) {
        window.location.href = "user.html";
      } else {
        getDoc(adminRef)
          .then((adminDoc) => {
            if (adminDoc.exists()) {
              window.location.href = "admin.html";
            } else {
              getDoc(supportRef)
                .then((supportDoc) => {
                  if (supportDoc.exists()) {
                    window.location.href = "support.html";
                  } else {
                    console.error("User document not found in any collection");
                    // Handle the case where the user document does not exist in any collection
                  }
                })
                .catch((error) => {
                  console.error(
                    "Error fetching support role data from Firestore:",
                    error
                  );
                  // Handle Firestore read error
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching admin data from Firestore:", error);
            // Handle Firestore read error
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching user data from Firestore:", error);
      // Handle Firestore read error
    });
}
