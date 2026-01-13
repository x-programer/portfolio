import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};



// Debug: Check if config is loaded
if (typeof window !== "undefined") {
    const missingKeys = Object.keys(firebaseConfig).filter(key => !firebaseConfig[key]);
    if (missingKeys.length > 0) {
        console.error(`Firebase keys missing: ${missingKeys.join(", ")}. Check your .env.local file.`);
        alert(`Firebase configuration error. Missing keys: ${missingKeys.join(", ")}. Check console for details.`);
    }
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
