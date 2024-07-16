import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"





const firebaseConfig = {
  apiKey: "AIzaSyAvRKzdPGZnF3pQuBDoAq7b6EEAM7iGsGM",
  authDomain: "aunnes-chat.firebaseapp.com",
  projectId: "aunnes-chat",
  storageBucket: "aunnes-chat.appspot.com",
  messagingSenderId: "1043943567109",
  appId: "1:1043943567109:web:5ed8306289af088d04116c"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore (app);








