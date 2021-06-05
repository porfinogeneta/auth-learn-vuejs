import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkScWVOIuoi023ys07-Zm65Vi6U-gzd5g",
    authDomain: "vue-auth-learn-5dda6.firebaseapp.com",
    projectId: "vue-auth-learn-5dda6",
    storageBucket: "vue-auth-learn-5dda6.appspot.com",
    messagingSenderId: "518870776003",
    appId: "1:518870776003:web:1f6276277cf9e2602b0a76",
    measurementId: "G-W87XCEJDC8"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;