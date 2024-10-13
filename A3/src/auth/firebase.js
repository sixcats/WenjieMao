import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCRzdTcVbnFcJoWJk6mxCRoTSXfo-sIPuI",
    authDomain: "test-1f883.firebaseapp.com",
    projectId: "test-1f883",
    storageBucket: "test-1f883.appspot.com",
    messagingSenderId: "791952997929",
    appId: "1:791952997929:web:e958073c7a812651812638",
    measurementId: "G-7FQPKNTXK3"


  

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
