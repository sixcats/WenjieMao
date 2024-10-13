import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Firebase configuration object containing keys and project information for connecting to Firebase services
const firebaseConfig = {
  apiKey: "AIzaSyBJgg2A0AaFGaKg11I9pYozmKypd8HFxbE",
  authDomain: "week7-wenjie.firebaseapp.com",
  projectId: "week7-wenjie",
  storageBucket: "week7-wenjie.appspot.com",
  messagingSenderId: "570249966700",
  appId: "1:570249966700:web:b0606afb99ae20be289449"
};

// Initialize the Firebase application
const app = initializeApp(firebaseConfig);
// Get an Analytics instance for tracking and analyzing user behavior
const analytics = getAnalytics(app);
// Get an authentication service instance for handling user authentication
const auth = getAuth(app);
// Export the authentication service instance for use in other modules
export { auth };

