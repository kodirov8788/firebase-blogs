// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBElulC3APzC5Wul5biC8uDdDFUDO7wohM",
    authDomain: "first-app-49ce8.firebaseapp.com",
    projectId: "first-app-49ce8",
    storageBucket: "first-app-49ce8.appspot.com",
    messagingSenderId: "412629623191",
    appId: "1:412629623191:web:71e29d538199287f6724d2"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore()
export const storage = getStorage()

export default firestore