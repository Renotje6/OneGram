// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
// 	apiKey: 'AIzaSyALV6r7zlNmKR6RKQE1euWd--gbaROr4Ag',
// 	authDomain: 'om-8f4e2.firebaseapp.com',
// 	projectId: 'om-8f4e2',
// 	storageBucket: 'om-8f4e2.appspot.com',
// 	messagingSenderId: '30012038850',
// 	appId: '1:30012038850:web:abb2d78bf6150ec7cee55b',
// };

// const firebaseConfig = {
// 	apiKey: 'AIzaSyDxWRU49HnfnmfGPQYDeNYE0AzDKp4fWTQ',
// 	authDomain: 'om2-1bc60.firebaseapp.com',
// 	projectId: 'om2-1bc60',
// 	storageBucket: 'om2-1bc60.appspot.com',
// 	messagingSenderId: '803385174984',
// 	appId: '1:803385174984:web:a06e6e8ffd59f85d7faefd',
// 	measurementId: 'G-7PRCLJCR46',
// };

const firebaseConfig = {
	apiKey: 'AIzaSyBafTWbSSatjQva5MKeKsvg5JnvfnD4qvM',
	authDomain: 'om3-ac5e5.firebaseapp.com',
	projectId: 'om3-ac5e5',
	storageBucket: 'om3-ac5e5.appspot.com',
	messagingSenderId: '1072987579379',
	appId: '1:1072987579379:web:5ccb4d481aa3b05397a886',
	measurementId: 'G-0D7VJXW257',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore database
export const db = getFirestore(app);
