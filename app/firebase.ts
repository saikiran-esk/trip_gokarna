import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyB-xeZ2Htvm1kCjPoPsrTJZyfi_TNw8UH0",
    authDomain: "gokarna-2a0ac.firebaseapp.com",
    projectId: "gokarna-2a0ac",
    storageBucket: "gokarna-2a0ac.firebasestorage.app",
    messagingSenderId: "581174492526",
    appId: "1:581174492526:web:7512ee7850214b08ded57f",
    measurementId: "G-80EK3VMR5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
