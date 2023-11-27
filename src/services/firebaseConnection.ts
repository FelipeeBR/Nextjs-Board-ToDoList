import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBdbubHsYozO6OAccMdgF-Zyaq4XFLMHzg",
    authDomain: "board-56fe9.firebaseapp.com",
    projectId: "board-56fe9",
    storageBucket: "board-56fe9.appspot.com",
    messagingSenderId: "651418352459",
    appId: "1:651418352459:web:b0b16d70ccf834b9e086ce",
    measurementId: "G-KP9549TW0J"
};
  
  // Initialize Firebase

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;