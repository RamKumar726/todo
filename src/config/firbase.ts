// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth  , GoogleAuthProvider} from "firebase/auth" ; 
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-MRwD-8VYkmDjKgfXUJTVjN5gwHmln9Q",
  authDomain: "todo-ca09f.firebaseapp.com",
  projectId: "todo-ca09f",
  storageBucket: "todo-ca09f.appspot.com",
  messagingSenderId: "875871529497",
  appId: "1:875871529497:web:54b7a6b91722769aa45888"
};


const app = initializeApp(firebaseConfig);
export const auth  =  getAuth(app);

export const provider  = new GoogleAuthProvider();

export const db =  getFirestore(app);

