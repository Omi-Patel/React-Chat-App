// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMZlfGZGIQlAq2rpWICKioAmll6Vvpz4Q",
  authDomain: "react-chat-app-681e5.firebaseapp.com",
  projectId: "react-chat-app-681e5",
  storageBucket: "react-chat-app-681e5.appspot.com",
  messagingSenderId: "625295585322",
  appId: "1:625295585322:web:178a33c6acbe9c76799353"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);