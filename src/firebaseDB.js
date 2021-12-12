import firebase from 'firebase';
//import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

    apiKey: "AIzaSyCDBnjqJHT5Oyi7qqiR7IELipjdHHgBJ6E",
  
    authDomain: "todolist-70ec0.firebaseapp.com",
  
    projectId: "todolist-70ec0",
  
    storageBucket: "todolist-70ec0.appspot.com",
  
    messagingSenderId: "878704044661",
  
    appId: "1:878704044661:web:6db634c71fd6feab20a63c"
  
  };
  

// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };