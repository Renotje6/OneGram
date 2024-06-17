'use client';

import { auth, db, googleProvider } from '@/config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

export const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const signUp = async () => {
		const userCollection = collection(db, 'users');
		// setDoc(doc(userCollection, ), {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			// Create a new user in the users collection with the uid from the auth object
			setDoc(doc(userCollection, user.user.uid), {
				name: name,
				email: email,
			});
		} catch (e: any) {
			setError(e.message);
		}
	};

	const signUpWithGoogle = async () => {
		const user = await signInWithPopup(auth, googleProvider);
		const userCollection = collection(db, 'users');
		const userDocRef = doc(userCollection, user.user.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (!userDocSnap.exists()) {
			setDoc(userDocRef, {
				name: user.user.displayName,
				email: user.user.email,
			});
		}
	};

	const logout = async () => {
		signOut(auth);
	};

	return (
		<div>
			<input
				type='text'
				placeholder='name'
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='text'
				placeholder='email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='text'
				placeholder='password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signUp}>Sign in</button>

			<button onClick={signUpWithGoogle}>sign in with google</button>

			<button onClick={logout}>logout</button>
			<p>{error}</p>
		</div>
	);
};
