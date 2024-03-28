import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCiIr41OzfeHrXie7si7A76loOy-Iz2d6E",
  authDomain: "tp-09-projeto-de-bloco.firebaseapp.com",
  projectId: "tp-09-projeto-de-bloco",
  storageBucket: "tp-09-projeto-de-bloco.appspot.com",
  messagingSenderId: "888867671281",
  appId: "1:888867671281:web:266e82594f75eecf44ad50",
  measurementId: "G-YPM0TLH9TT"
};

const app = initializeApp(firebaseConfig);

export default app;