// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC1D3s24oDvdItyBfYZA-QtJmUpo533qXs',
	authDomain: 'fir-tutorial-8c31d.firebaseapp.com',
	projectId: 'fir-tutorial-8c31d',
	storageBucket: 'fir-tutorial-8c31d.appspot.com',
	messagingSenderId: '923761979062',
	appId: '1:923761979062:web:0c4329efe8e0e09fa40017',
	measurementId: 'G-68FR8H6T9C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore database
export const db = getFirestore(app);
