import { initializeApp } from "firebase/app"
import { getFirestore, setLogLevel } from "firebase/firestore"

// const conf = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV,
//     authDomain: import.meta.env.VITE_AUTH_DOMAIN_DEV,
//     projectId: import.meta.env.VITE_PROJECT_ID_DEV,
//     storageBucket: import.meta.env.VITE_STORAGE_BUCKET_DEV,
//     messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_DEV,
//     appId: import.meta.env.VITE_APP_ID_DEV,
//     measurementId: import.meta.env.VITE_MEASUREMENT_ID_DEV
// }
const conf = {
    apiKey: "AIzaSyCXTFwp5xDr7664PNuqOIrZfL-w6aOh7rs",
    authDomain: "quilli-development.firebaseapp.com",
    projectId: "quilli-development",
    storageBucket: "quilli-development.appspot.com",
    messagingSenderId: "737821289605",
    appId: "1:737821289605:web:00095005dbe6b307468dec",
    measurementId: "G-H0T28G83YE"
}

const app = initializeApp(conf);

// setLogLevel("debug");

export default app;
export const database = getFirestore(app);

export const SAVE_INTERVAL_MS = 10000;