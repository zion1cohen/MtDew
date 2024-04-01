// Import Firebase modules
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Function to get user's role from Firestore
// Function to get user's role from Firestore
// Function to get user's role from Firestore
async function getUserRole(userId) {
    try {
        let userRole = null;
        let roleType = null;

        // Query all roles collections
        const userQuery = query(collection(db, 'USER'), where("userId", "==", userId));
        const adminQuery = query(collection(db, 'ADMIN'), where("userId", "==", userId));
        const supportQuery = query(collection(db, 'SUPPORT_ROLE'), where("userId", "==", userId));

        const userSnapshot = await getDocs(userQuery);
        const adminSnapshot = await getDocs(adminQuery);
        const supportSnapshot = await getDocs(supportQuery);

        // Check which role the user belongs to
        if (!userSnapshot.empty) {
            userRole = "USER";
            roleType = userSnapshot.docs[0].data().role; // Assuming 'role' is the field storing role during registration
        } else if (!adminSnapshot.empty) {
            userRole = "ADMIN";
            roleType = adminSnapshot.docs[0].data().role;
        } else if (!supportSnapshot.empty) {
            userRole = "SUPPORT_ROLE";
            roleType = supportSnapshot.docs[0].data().role;
        }
        console.log("User Role:", userRole); // Log user role
        console.log("Role Type:", roleType); // Log role type

        return { userRole, roleType };
    } catch (error) {
        console.error("Error getting user role:", error);
        return null;
    }
}


// Login form submission
// Login form submission
// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const role = document.getElementById('role').value;
    const email = document.getElementById('uname').value;
    const password = document.getElementById('psw').value;

    try {
        // Authenticate user with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get user's role from Firestore
        const { userRole, roleType } = await getUserRole(user.uid);
        console.log("User role:", userRole);
        console.log("Selected role:", role);
        console.log("Role type:", roleType);

        if (userRole && role.toLowerCase() === roleType.toLowerCase()) {
            // Redirect based on user role
            switch (userRole) {
                case "USER":
                    window.location.href = "home.html";
                    break;
                case "ADMIN":
                    window.location.href = "admin.html";
                    break;
                case "SUPPORT_ROLE":
                    window.location.href = "support.html";
                    break;
                default:
                    console.log("Invalid role selected.");
            }
        } else {
            document.getElementById('errorMessage').textContent = "Invalid role selection or role mismatch.";
        }
    } catch (error) {
        console.error("Login error:", error.message);
        // Handle login errors (e.g., display error message to user)
    }
});
