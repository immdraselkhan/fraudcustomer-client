// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FirebaseApiKey,
  authDomain: process.env.NEXT_PUBLIC_FirebaseAuthDomain,
  projectId: process.env.NEXT_PUBLIC_FirebaseProjectId,
  storageBucket: process.env.NEXT_PUBLIC_FirebaseStorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FirebaseMessagingSenderId,
  appId: process.env.NEXT_PUBLIC_FirebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app
export default app;