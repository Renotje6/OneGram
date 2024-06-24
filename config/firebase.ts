// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyALV6r7zlNmKR6RKQE1euWd--gbaROr4Ag',
	authDomain: 'om-8f4e2.firebaseapp.com',
	projectId: 'om-8f4e2',
	storageBucket: 'om-8f4e2.appspot.com',
	messagingSenderId: '30012038850',
	appId: '1:30012038850:web:abb2d78bf6150ec7cee55b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore database
export const db = getFirestore(app);
