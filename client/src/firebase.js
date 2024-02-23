// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFiTzAY9T36a7MH9ooeK29jEzdl4C5LR4",
  authDomain: "virtual-marketplace-261ad.firebaseapp.com",
  projectId: "virtual-marketplace-261ad",
  storageBucket: "virtual-marketplace-261ad.appspot.com",
  messagingSenderId: "434853881782",
  appId: "1:434853881782:web:5e648e3d1cd02e8bd9c317"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore()