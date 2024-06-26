'use client';

import { auth, db, googleProvider } from '@/config/firebase';
import LoginLayout from '@/layouts/LoginLayout';
import { Button, Divider, Input } from '@nextui-org/react';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useUser } from '../../components/contexts/userContext';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const { setUser } = useUser();

	const loginWithEmailAndPassword = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);

			if (auth.currentUser) {
				const userCollection = collection(db, 'users');
				const userDocRef = doc(userCollection, auth.currentUser.uid);

				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					setDoc(userDocRef, {
						...userDocSnap.data(),
						lastSeen: new Date().toISOString(),
					});

					setUser({
						uid: auth.currentUser.uid,
						name: userDocSnap.data().name,
						email: userDocSnap.data().email,
					});
				}

				router.push('/');
			}
		} catch (e: any) {
			if (e instanceof FirebaseError) {
				switch (e.code) {
					case 'auth/invalid-credential':
						setError('Invalid credentials');
						break;
					case 'auth/user-not-found':
						setError('User not found');
						break;
					case 'auth/wrong-password':
						setError('Wrong password');
						break;
					default:
						setError('An error occurred');
						console.error(e);
						break;
				}
			}
			setError(e.message);
			setLoading(false);
		}
	};

	const loginWithGoogle = async () => {
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
			} else {
				setDoc(userDocRef, {
					...userDocSnap.data(),
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

			alert(e.message);
		}
	};

	return (
		<LoginLayout>
			<div className='bg-black/10 flex w-[90%] md:w-[600px] h-[400px] rounded-xl'>
				{error && <div className='w-full bg-red-200 text-red-800 p-3 rounded-md'>{error}</div>}
				<div className='w-full justify-center items-center flex-col gap-8 text-center bg-black/5 h-full hidden md:flex'>
					<p className='text-5xl font-semibold'>OneGram</p>
					<p className='text-zinc-200'>
						Do you need help logging in? <br />
						Get help{' '}
						<a
							href='#'
							className='text-primary-500'>
							Here
						</a>
					</p>
				</div>
				<div className=' w-full flex flex-col gap-3 justify-center p-3'>
					<h1 className='font-semibold text-4xl text-center hidden md:block'>Login</h1>
					<h1 className='text-5xl font-semibold md:hidden text-center'>OneGram</h1>
					<div className='flex flex-col items-center gap-2'>
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
						<Button
							color='primary'
							className='w-full'
							onClick={(e) => {
								e.preventDefault();
								setLoading(true);
								loginWithEmailAndPassword();
							}}
							isLoading={loading}>
							Login
						</Button>
					</div>
					<div className='flex justify-center flex-col items-center gap-2'>
						<Divider className='bg-black/10 h-0.5' />
						<p className='text-sm'>Or Login With:</p>
						<Button
							isIconOnly
							startContent={<FcGoogle className='size-6' />}
							onClick={loginWithGoogle}
						/>
					</div>
				</div>
			</div>
		</LoginLayout>
	);
}
