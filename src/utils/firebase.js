// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//1.
// const firebaseConfig = {
//     apiKey: "AIzaSyCUmx1nD9VYmuKsBX1LSpJvJMKxQR-N-dg",
//     authDomain: "fxcurrency-b007d.firebaseapp.com",
//     projectId: "fxcurrency-b007d",
//     storageBucket: "fxcurrency-b007d.appspot.com",
//     messagingSenderId: "225543775794",
//     appId: "1:225543775794:web:40348a5d2ad7d3f91a3e2b",
// };

//2.
const firebaseConfig = {
    apiKey: "AIzaSyCAxbKQoLScFr80Mg-3cg9p0abhNRjv8pQ",
    authDomain: "forexcurrency-c7ff1.firebaseapp.com",
    projectId: "forexcurrency-c7ff1",
    storageBucket: "forexcurrency-c7ff1.appspot.com",
    messagingSenderId: "842080125897",
    appId: "1:842080125897:web:712af22359176d15c8de18",
    measurementId: "G-EBQB09X9Z7",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
