
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLKNIFGkjxfG7gNJXed7xWD6_Hk7cpMqI",
    authDomain: "waymakr-11d5e.firebaseapp.com",
    projectId: "waymakr-11d5e",
    storageBucket: "waymakr-11d5e.appspot.com",
    messagingSenderId: "889066682104",
    appId: "1:889066682104:web:3dfc89d53cda831df92d0d",
    measurementId: "G-JV4VLNML8B"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };