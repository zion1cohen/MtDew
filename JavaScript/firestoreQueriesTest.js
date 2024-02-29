const admin = require("firebase-admin");

const serviceAccount = require("/Users/khamarit/Downloads/connectability-6ee02-firebase-adminsdk-mkpk7-4bc4d2f401.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://connectability-6ee02.firebaseio.com",
});

const db = admin.firestore();

// Sample Queries

// 1. Fetch a User by ID
function fetchUserById(userId) {
  db.collection("USER")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("User Data:", doc.data());
      } else {
        console.log("No such user!");
      }
    })
    .catch((error) => {
      console.log("Error getting user:", error);
    });
}

// 2. Fetch All Posts by a Specific User
function fetchPostsByUserId(userId) {
  db.collection("POST")
    .where("UserId", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting posts:", error);
    });
}

// 3. Fetch Messages Received by a User
function fetchMessagesReceivedByUserId(receiverId) {
  db.collection("MESSAGE")
    .where("ReceiverId", "==", receiverId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting messages:", error);
    });
}

// 4. Fetch Friend Requests for a User
function fetchFriendRequests(receiverId) {
  db.collection("FRIENDREQUEST")
    .where("ReceiverId", "==", receiverId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting friend requests:", error);
    });
}

// Additional Queries

// 5. Fetch Announcements Within a Date Range
function fetchAnnouncements(startDate, endDate) {
  db.collection("ANNOUNCEMENT")
    .where("Timestamp", ">=", startDate)
    .where("Timestamp", "<=", endDate)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting announcements:", error);
    });
}

// 6. Fetch Feedback Given by Users
function fetchUserFeedback() {
  db.collection("FEEDBACK")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting feedback:", error);
    });
}

// 7. List Resources Updated After a Certain Date
function fetchResourcesAfterDate(specificDate) {
  db.collection("RESOURCE")
    .where("Timestamp", ">", specificDate)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting resources:", error);
    });
}

// Example usage
fetchUserById("userId1");
fetchPostsByUserId("userId1");
fetchMessagesReceivedByUserId("userId2");
fetchFriendRequests("userId1");
fetchAnnouncements("2024-02-18T00:00:00Z", "2024-02-20T00:00:00Z");
fetchUserFeedback();
fetchResourcesAfterDate("2024-02-18T00:00:00Z");
