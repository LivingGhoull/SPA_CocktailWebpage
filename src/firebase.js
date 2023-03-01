// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALP4TQvfwCUJbWlpXKtIfz-ZkOYGD8lkw",
  authDomain: "spacocktailwebpage.firebaseapp.com",
  projectId: "spacocktailwebpage",
  storageBucket: "spacocktailwebpage.appspot.com",
  messagingSenderId: "141136707588",
  appId: "1:141136707588:web:ab52ac442f638474b9b551",
  measurementId: "G-JPLHB71JEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const users = doc(db, 'users/GcOpL4j9nahdLWUd89GV');

export async function addUser() {
    console.log("in ?????????")
    const docData = {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912
    };
    try {
        await setDoc(users, docData)
        console.log('User been added to the db')
    } catch (error) {
        console.log(`Error happend in "addUser": ${error}`)
    }
}


