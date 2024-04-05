import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK5xrWxoRCn6M2_UhF74XhV7XH8vmnozA",
    authDomain: "bookbazaarhub.firebaseapp.com",
    projectId: "bookbazaarhub",
    storageBucket: "bookbazaarhub.appspot.com",
    messagingSenderId: "632978124894",
    appId: "1:632978124894:web:28e216ac67e21f694044cf"
};

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage(app);

export { storage };
