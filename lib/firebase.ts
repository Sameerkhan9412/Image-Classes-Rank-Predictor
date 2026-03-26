import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuGIteWIhlKwOqj42xBc_U-JnNrwzY4eo",
  authDomain: "image-classes-7ed85.firebaseapp.com",
  projectId: "image-classes-7ed85",
  storageBucket: "image-classes-7ed85.firebasestorage.app",
  messagingSenderId: "407342322975",
  appId: "1:407342322975:web:645ab2689c86607f684c2a",
  measurementId: "G-77SWHXV55X"
};

// ✅ Prevent multiple initialization (important in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ⚠️ Analytics only works in browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// ✅ EXPORT
export { app };