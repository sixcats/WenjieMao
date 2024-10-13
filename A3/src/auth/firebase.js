import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJgg2A0AaFGaKg11I9pYozmKypd8HFxbE",
  authDomain: "week7-wenjie.firebaseapp.com",
  projectId: "week7-wenjie",
  storageBucket: "week7-wenjie.appspot.com",
  messagingSenderId: "570249966700",
  appId: "1:570249966700:web:b0606afb99ae20be289449"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
