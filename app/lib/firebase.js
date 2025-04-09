import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, get, child } from "firebase/database"; // Perbaiki impor get dan child
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Gantilah dengan konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyAdIknwBwe9ktLIGLQxUCJCi_cnZqbl8bQ",
  authDomain: "lendra-4e962.firebaseapp.com",
  databaseURL: "https://lendra-4e962-default-rtdb.firebaseio.com",
  projectId: "lendra-4e962",
  storageBucket: "lendra-4e962.firebasestorage.app",
  messagingSenderId: "263197582603",
  appId: "1:263197582603:web:215d439aa10c04fd902e0e",
  measurementId: "G-J0JSQ37TX9"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mendapatkan layanan yang diperlukan
const auth = getAuth(app);
const db = getDatabase(app);  // Gunakan getDatabase() untuk Realtime Database
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, db, firestore, storage, push, ref, set, get, child }; // Mengekspor push, get, dan child
