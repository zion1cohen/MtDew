// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your Firebase configuration
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
  document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const psw = document.getElementById("psw").value;
    const role = document.getElementById("role").value; // Get selected role
    const age = document.getElementById("age").value;
    const maritalStatus = document.getElementById("MaritalStatus").value;
    const disability = document.getElementById("disability").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;

    // Get the uploaded file
    const file = document.getElementById("fileInput").files[0];

    // Define a function to read the file as a data URL
    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      // Create user account using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, psw);

      // Read the file as a data URL
      let photoURL = '';
      if (file) {
        photoURL = await readFileAsDataURL(file);
      }

      // Set default values for additional fields
      const defaultFields = {
        AccountAction: [],
        FeedbackGiven: [],
        FlagsMade: [],
        Friends: [],
        Interests: "",
        Posts: {},
        ReceivedFriendRequests: [],
        ReceivedMessages: [],
        SentFriendRequests: [],
        SentMessages: [],
      };

      // Determine the collection name and role based on the role selected
      let collectionName = '';
      let roleType = '';
      switch (role) {
        case "admin":
          collectionName = "ADMIN";
          roleType = "ADMIN";
          break;
        case "support":
          collectionName = "SUPPORT_ROLE";
          roleType = "SUPPORT_ROLE";
          break;
        default:
          collectionName = "USER";
          roleType = "USER";
      }

      // Save user information to Firestore with UID as document ID in the corresponding collection
      await setDoc(doc(db, collectionName, userCredential.user.uid), {
        userId: userCredential.user.uid,
        Name: name,
        email: email,
        Age: age,
        MaritalStatus: maritalStatus,
        Disability: disability,
        Gender: gender,
        Photo: photoURL, // Add photo URL to document data
        role: roleType, // Include role field with selected role
        ...defaultFields, // Merge default fields into document data
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
