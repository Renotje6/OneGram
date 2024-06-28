'use client';

import { auth, db } from '@/config/firebase';
import { Button, User } from '@nextui-org/react';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import { useUser } from '../components/contexts/userContext';
import UserBadge from './user/userBadge';

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
	const [following, setFollowing] = useState<any[]>([]);
	const [followRequests, setFollowRequests] = useState<any[]>([]);
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

			setFollowing(userDocs.filter((user) => currentUser.data()!.following?.includes(user.id)));
		};

		fetchUsers();
	}, [user]);

	useEffect(() => {
		if (!user) return;

		// Fetch follow requests
		const fetchFollowRequests = async () => {
			const userCollection = collection(db, 'users');
			const currentUser = await getDoc(doc(userCollection, user.uid));

			const q = query(userCollection, where('uid', '!=', user.uid));
			const usersSnapshot = await getDocs(q);

			let userDocs = usersSnapshot.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});

			setFollowRequests(userDocs.filter((user) => currentUser.data()!.followRequests?.includes(user.id)));
		};

		fetchFollowRequests();
	}, [user]);

	const handleAcceptFollowRequest = async (userId: string) => {
		if (!user) return;
		const userCollection = collection(db, 'users');
		const currentUser = doc(userCollection, user.uid);
		const userDoc = doc(userCollection, userId);

		const currentUserData = await getDoc(currentUser);
		const userData = await getDoc(userDoc);

		await setDoc(currentUser, {
			...currentUserData.data(),
			followRequests: currentUserData.data()?.followRequests.filter((id: string) => id !== userId),
		});

		await setDoc(userDoc, {
			...userData.data(),
			following: [...userData.data()?.following, user.uid],
		});
		window.location.reload();
	};

	const handleDeclineFollowRequest = async (userId: string) => {
		if (!user) return;
		const userCollection = collection(db, 'users');
		const currentUser = doc(userCollection, user.uid);
		const currentUserData = await getDoc(currentUser);

		// Remove the user from the follow requests
		await setDoc(currentUser, {
			...currentUserData.data(),
			followRequests: currentUserData.data()?.followRequests.filter((id: string) => id !== userId),
		});
		window.location.reload();
	};

	return (
		<nav className='bg-black/20 text-black min-h-screen w-80 flex-col gap-5 justify-between shadow-lg hidden lg:flex min-w-80'>
			<div className='h-screen p-4 flex justify-between flex-col fixed gap-5 w-80'>
				<div className=''>
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
					<p className='text-lg font-semibold dark:text-zinc-300'>Follow Requests</p>
					{followRequests.map((user: any) => (
						<UserBadge
							key={user.id}
							id={user.id}
							name={user.name}
							image={user.avatar}
							lastSeen={user.lastSeen}
							endContent={
								<>
									<Button
										size='sm'
										variant='light'
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											handleAcceptFollowRequest(user.id);
										}}>
										Accept
									</Button>
									<Button
										size='sm'
										variant='light'
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											handleDeclineFollowRequest(user.id);
										}}>
										Decline
									</Button>
								</>
							}
						/>
					))}
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
