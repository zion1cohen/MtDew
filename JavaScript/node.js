const admin = require("firebase-admin");
// Using relative path for the service account
const serviceAccount = require("./connectability-6ee02-firebase-adminsdk-mkpk7-32074a612a.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://connectability-6ee02.firebaseio.com", // This remains as is
});

// Using relative path for the JSON data
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
