const admin = require("firebase-admin");
const serviceAccount = require("/Users/khamarit/Downloads/connectability-6ee02-firebase-adminsdk-mkpk7-4bc4d2f401.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://connectability-6ee02.firebaseio.com", // Replace with your Firestore database URL
});

// Read data from JSON file
const jsonData = require("./data.json");

// Get a Firestore reference
const db = admin.firestore();

// Function to import data into Firestore
async function importData() {
  for (const collectionName in jsonData) {
    const collectionData = jsonData[collectionName];
    for (const documentId in collectionData) {
      await db
        .collection(collectionName)
        .doc(documentId)
        .set(collectionData[documentId]);
    }
  }
  console.log("Data imported successfully!");
}

// Call the function to import data
importData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error importing data:", error);
    process.exit(1);
  });
