try {
  const serviceAccount = require("./connectability-6ee02-firebase-adminsdk-mkpk7-32074a612a.json");
  console.log(
    "Successfully loaded service account file:",
    serviceAccount.project_id
  );
} catch (error) {
  console.error("Failed to load service account file:", error.message);
}
