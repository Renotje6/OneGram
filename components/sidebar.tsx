'use client';

import { auth, db } from '@/config/firebase';
import { Button, User } from '@nextui-org/react';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import { useUser } from '../components/contexts/userContext';
import UserBadge from './user/userBadge';

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
	const [following, setFollowing] = useState<any[]>([]);
	const [currentUser, setCurrentUser] = useState<any>(null);
	const { user } = useUser();

	const router = useRouter();

	const logout = () => {
		auth.signOut().then(() => {
			router.push('/login');
		});
	};

	useEffect(() => {
		if (!user) return;
		// fetch users
		const fetchUsers = async () => {
			const userCollection = collection(db, 'users');
			const currentUser = await getDoc(doc(userCollection, user.uid));

			const q = query(userCollection, where('uid', '!=', user.uid));
			const usersSnapshot = await getDocs(q);

			let userDocs = usersSnapshot.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});

			setCurrentUser(currentUser.data());
			setFollowing(userDocs.filter((user) => currentUser.data()!.friends.includes(user.id)));
		};

		fetchUsers();

		// Set an event listener to update the user data when it changes
		const unsubscribe = onSnapshot(doc(collection(db, 'users'), user.uid), (doc) => {
			setCurrentUser(doc.data());
		});

		return () => {
			unsubscribe();
		};
	}, [user, currentUser]);

	return (
		<nav className='bg-black/20 text-black min-h-screen w-80 flex-col gap-5 justify-between shadow-lg hidden lg:flex min-w-80'>
			<div className='h-screen p-4 flex justify-between flex-col fixed gap-5 w-80'>
				<div className='h-full'>
					<p className='text-lg font-semibold dark:text-zinc-300'>Following</p>
					<div className='p-2 flex flex-col gap-2 items-start'>
						{following.map((user: any) => (
							<UserBadge
								key={user.id}
								id={user.id}
								name={user.name}
								image={user.avatar}
								lastSeen={user.lastSeen}
							/>
						))}
					</div>
				</div>
				<div>
					<Button
						size='lg'
						variant='light'
						onClick={logout}
						className='flex justify-between w-full items-center p-2 text-black dark:text-zinc-300'
						endContent={<TbLogout className='size-6 dark:text-zinc-400' />}
						startContent={
							<User
								name={user?.name || 'User'}
								avatarProps={{ src: auth.currentUser?.photoURL || '', showFallback: true }}
								classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300 text-lg' }}
							/>
						}
					/>
				</div>
			</div>
		</nav>
	);
};

export default SideBar;
