'use client';

import { auth, googleProvider } from '@/config/firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (e: any) {
			setError(e.message);
		}
	};

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider);
	};

	const logout = async () => {
		signOut(auth);
	};

	return (
		<div>
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
			<button onClick={signIn}>Sign in</button>

			<button onClick={signInWithGoogle}>sign in with google</button>

			<button onClick={logout}>logout</button>
			<p>{error}</p>
		</div>
	);
};
