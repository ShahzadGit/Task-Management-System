import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";



function Startfirebase(opt) {
  const firebaseConfig = {
    apiKey: "AIzaSyBMHHHrbkfXfP-S4txGAF5DiXep7mt8abk",
    authDomain: "task-management-sys-01.firebaseapp.com",
    databaseURL: "https://task-management-sys-01-default-rtdb.firebaseio.com",
    projectId: "task-management-sys-01",
    storageBucket: "task-management-sys-01.appspot.com",
    messagingSenderId: "610552861557",
    appId: "1:610552861557:web:eb7cd02a0b51ec84dc793c"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  switch (opt) {
    case "Auth":
      return getAuth(app);
    case "DB":
      return getDatabase(app)

  }

}

export default Startfirebase;