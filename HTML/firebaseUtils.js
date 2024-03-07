import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore"

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
const storage = firebase.storage();

// Get a reference to Firestore
const firestore = firebase.firestore();

// Function to upload image to Firebase Storage
export async function uploadImage(file) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    return fileRef.getDownloadURL();
}

// Function to update user document in Firestore with image URL
export async function updateUserWithImage(userId, imageURL) {
    const userRef = firestore.collection("users").doc(userId);
    await userRef.update({
        imageURL: imageURL // Replace 'imageURL' with the field where you want to store the image URL
    });
}

// Function to add image to user
export async function addImageToUser(userId, file) {
    try {
        // Upload image to Firebase Storage
        const imageURL = await uploadImage(file);

        // Update user document in Firestore with image URL
        await updateUserWithImage(userId, imageURL);

        console.log("Image added to user successfully.");
    } catch (error) {
        console.error("Error adding image to user:", error);
    }
}
