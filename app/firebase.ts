import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-xeZ2Htvm1kCjPoPsrTJZyfi_TNw8UH0",
    authDomain: "gokarna-2a0ac.firebaseapp.com",
    projectId: "gokarna-2a0ac",
    storageBucket: "gokarna-2a0ac.firebasestorage.app",
    messagingSenderId: "581174492526",
    appId: "1:581174492526:web:7512ee7850214b08ded57f",
    measurementId: "G-80EK3VMR5V"
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
