/**
 * Import the Firebase client modules
 */
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

/**
 * The following represent the firebase client configuration for the application.
 * These are safe to be exposed on the client.
 */
const firebaseConfig = {
  projectId: "be-audible",
  messagingSenderId: "376052341346",
  authDomain: "be-audible.firebaseapp.com",
  storageBucket: "be-audible.appspot.com",
  apiKey: "AIzaSyBphMfuOCAshU7BkkttdvKeZFtnGdfRJmg",
  appId: "1:376052341346:web:2a082c97d822e10667cf3b",
};

// Initialize Firebase apps
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const functions = getFunctions(app);

/**
 * For local testing add authentication + database emulator
 */
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDatabaseEmulator(db, "localhost", 9000);
  connectFunctionsEmulator(functions, "localhost", 5001);
}
