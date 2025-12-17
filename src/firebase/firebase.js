// Import Firebase functions
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // 🔹 Add this if you want Auth
import { getFirestore } from 'firebase/firestore'; // 🔹 Add this if you want Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAm-IXt-YyFlPkUpEfxQjr8jKp0q2RrrY4',
  authDomain: 'quiz-2f35c.firebaseapp.com',
  projectId: 'quiz-2f35c',
  storageBucket: 'quiz-2f35c.firebasestorage.app',
  messagingSenderId: '1096847915622',
  appId: '1:1096847915622:web:07b68e992e5a6545dc4ba7',
  measurementId: 'G-CXCP5E8907',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // 🔹 Export auth
export const db = getFirestore(app); // 🔹 Export Firestore if needed
export default app;
