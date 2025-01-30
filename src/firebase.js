// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC00OZwxPuukqDl0lmHMg7G7Hak9C9K60I",
  authDomain: "drive-d282f.firebaseapp.com",
  projectId: "drive-d282f",
  // storageBucket: "drive-d282f.firebasestorage.app",
  // storageBucket: "drive-d282f.appspot.com",
  messagingSenderId: "787978251429",
  appId: "1:787978251429:web:687a58b61ef69095baf14c"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
// const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider }

// npm install firebase





