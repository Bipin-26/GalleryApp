// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDl7rcCZ_DxdRMcOrWzWAODyYn_MGwhN8",
    authDomain: "gallery-app-9af3a.firebaseapp.com",
    projectId: "gallery-app-9af3a",
    storageBucket: "gallery-app-9af3a.appspot.com",
    messagingSenderId: "938408541212",
    appId: "1:938408541212:web:82d231883b7bbc495f33d9"
  };


// Initialize Firebase
const app =  initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

export default app;


