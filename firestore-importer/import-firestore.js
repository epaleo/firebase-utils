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

// Function to import data into a collection
async function importCollectionData(db, collectionName, data) {
  const batch = db.batch();

  data.forEach(doc => {
    const docRef = db.collection(collectionName).doc(doc.id);
    batch.set(docRef, doc);
  });

  await batch.commit();
  console.log(`Data imported into the collection ${collectionName}`);
}

// Function to import all collections from the output directory
async function importAllCollections(db, outputDir) {
  const files = fs.readdirSync(outputDir);

  for (const file of files) {
    if (path.extname(file) === '.json') {
      const filePath = path.join(outputDir, file);
      const collectionName = path.basename(file, '.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      await importCollectionData(db, collectionName, data);
    }
  }
}

// Execute the import
const db = initializeFirebase();
const outputDir = process.env.OUTPUT_DIRECTORY || './output';

importAllCollections(db, outputDir).catch(console.error);
