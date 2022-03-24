import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjw6dY_Nwoh_JCREVa_hesEgcy4Td0K1k",
    authDomain: "crud-dev-united.firebaseapp.com",
    projectId: "crud-dev-united",
    storageBucket: "crud-dev-united.appspot.com",
    messagingSenderId: "547654655823",
    appId: "1:547654655823:web:6bca5e2821fe53b4c16f3a"
  };
  
  firebase.initializeApp(firebaseConfig);

  export {firebase}