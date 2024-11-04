import { config } from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
config();

// Load the service account key from a JSON file
function loadServiceAccount() {
  const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY;
  if (!serviceAccountPath) {
    throw new Error("Service account key path is not defined in .env file.");
  }
  return JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
}

// Initialize the Firebase app
function initializeFirebase() {
  const serviceAccount = loadServiceAccount();

  initializeApp({
    credential: cert(serviceAccount)
  });

  return getFirestore();
}

// Function to export data from a collection
async function exportCollectionData(db, collectionName, outputDir) {
  const data = [];
  const snapshot = await db.collection(collectionName).get();

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  const outputPath = path.join(outputDir, `${collectionName}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Data exported from the collection ${collectionName} to ${outputPath}`);
}

// Function to list and export all collections
async function exportAllCollections(db, outputDir) {
  const collections = await db.listCollections();

  for (const collectionRef of collections) {
    await exportCollectionData(db, collectionRef.id, outputDir);
  }
}

// Execute the export
const db = initializeFirebase();
const outputDir = process.env.OUTPUT_DIRECTORY || './output';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true }); // Create output directory if it doesn't exist
}

exportAllCollections(db, outputDir).catch(console.error);
