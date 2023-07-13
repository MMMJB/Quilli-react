import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";

const conf = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_DEV,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_DEV,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_DEV,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID_DEV,
};

const app = initializeApp(conf);

// setLogLevel("debug");

export default app;
export const database = getFirestore(app);

export const SAVE_INTERVAL_MS = 10000;
