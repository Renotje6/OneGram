'use client';

import { useUser } from '@/components/contexts/userContext';
import { auth, db, googleProvider } from '@/config/firebase';
import LoginLayout from '@/layouts/LoginLayout';
import { collection, doc, getDoc, setDoc } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { Button, Divider, Input } from '@nextui-org/react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { setUser } = useUser();

	const router = useRouter();

	const signUpWithEmailAndPassword = async () => {
		const userCollection = collection(db, 'users');

		try {
			const authUser = await createUserWithEmailAndPassword(auth, email, password);

			await setDoc(doc(userCollection, authUser.user.uid), {
				uid: authUser.user.uid,
				name,
				email,
				friends: [],
				lastSeen: new Date().toISOString(),
			});

			setUser({
				uid: authUser.user.uid,
				name,
				email,
			});

			router.push('/');
		} catch (e: any) {
			if (e instanceof FirebaseError) {
				switch (e.code) {
					case 'auth/email-already-in-use':
						setError('Email already in use');
						break;
					case 'auth/weak-password':
						setError('Weak password');
						break;
					default:
						setError('An error occurred');
						console.error(e);
						break;
				}
			} else {
				setError(e.message);
				console.error(error);
			}
		}
	};

	const signUpWithGoogle = async () => {
		try {
			const user = await signInWithPopup(auth, googleProvider);
			const userCollection = collection(db, 'users');
			const userDocRef = doc(userCollection, user.user.uid);
			const userDocSnap = await getDoc(userDocRef);

			if (!userDocSnap.exists()) {
				setDoc(userDocRef, {
					uid: user.user.uid,
					name: user.user.displayName,
					email: user.user.email,
					friends: [],
					lastSeen: new Date().toISOString(),
				});
			}

			setUser({
				uid: user.user.uid,
				name: user.user.displayName || user.user.email || user.user.uid,
				email: user.user.email!,
			});

			router.push('/');
		} catch (e: any) {
			setError(e.message);
			console.error(error);
		}
	};

	if (auth.currentUser?.uid) {
		router.push('/');
	}

	return (
		<LoginLayout>
			<div className='bg-black/10 flex w-[90%] md:w-[600px] h-[400px] rounded-xl'>
				<div className='w-full justify-center items-center flex-col gap-8 text-center bg-black/5 h-full hidden md:flex'>
					<p className='text-5xl font-semibold'>OneGram</p>
					<p className='text-zinc-200'>
						Unable to register? <br />
						Get help{' '}
						<a
							href='#'
							className='text-primary-500'>
							Here
						</a>
					</p>
				</div>
				<div className=' w-full flex flex-col gap-3 justify-center p-3'>
					<h1 className='font-semibold text-4xl text-center hidden md:block'>Register</h1>
					<h1 className='text-5xl font-semibold md:hidden text-center'>OneGram</h1>
					<div className='flex flex-col items-center gap-2'>
						<Input
							placeholder='Name'
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<Input
							placeholder='Email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<Input
							placeholder='Password'
							type='password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						{error && <div className='w-full bg-red-200 text-red-800 p-3 rounded-md'>{error}</div>}
						<Button
							color='primary'
							className='w-full'
							onClick={signUpWithEmailAndPassword}>
							Register
						</Button>
					</div>
					<div className='flex justify-center flex-col items-center gap-2'>
						<Divider className='bg-black/10 h-0.5' />
						<p className='text-sm'>Or Login With:</p>
						<Button
							isIconOnly
							startContent={<FcGoogle className='size-6' />}
							onClick={signUpWithGoogle}
						/>
					</div>
				</div>
			</div>
		</LoginLayout>
	);
}
