'use client';

import { useUser } from '@/components/contexts/userContext';
import UserBadge from '@/components/user/userBadge';
import { db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { Button, Input } from '@nextui-org/react';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

export default function AccountPage() {
	const [users, setUsers] = useState<any[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
	const [currentUser, setCurrentUser] = useState<any>(null);
	const { user } = useUser();

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

			setUsers(userDocs);
			// set filtered users to all users except friends
			setFilteredUsers(userDocs.filter((user) => !currentUser.data()!.friends.includes(user.id)));
			setCurrentUser(currentUser.data());
		};

		fetchUsers();

		// Set an event listener to update the user data when it changes
		const unsubscribe = onSnapshot(doc(collection(db, 'users'), user.uid), (doc) => {
			setCurrentUser(doc.data());
		});

		return () => {
			unsubscribe();
		};
	}, [user]);

	const followUser = async (userId: string) => {
		const userCollection = collection(db, 'users');
		const userDocRef = doc(userCollection, user!.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			const userFriends = userDocSnap.data().friends;

			if (userFriends.includes(userId)) return;

			userFriends.push(userId);

			setDoc(userDocRef, {
				...userDocSnap.data(),
				friends: userFriends,
			});
		}
	};

	const unfollowUser = async (userId: string) => {
		const userCollection = collection(db, 'users');
		const userDocRef = doc(userCollection, user!.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			const userFriends = userDocSnap.data().friends;

			if (!userFriends.includes(userId)) return;

			const newFriends = userFriends.filter((friend: string) => friend !== userId);

			setDoc(userDocRef, {
				...userDocSnap.data(),
				friends: newFriends,
			});
		}
	};

	return (
		<MainLayout>
			<div className=' flex justify-center mt-5 text-5xl '>Search friends</div>
			<div className='flex justify-center mt-5'>
				<Input
					type='search'
					variant='bordered'
					placeholder='Search users...'
					className='w-1/2'
					onChange={(e) => {
						e.target.value ? setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(e.target.value.toLowerCase()))) : setFilteredUsers(users.filter((user) => !currentUser.friends.includes(user.id)));
					}}
				/>
			</div>
			{filteredUsers.length === 0 && <div className='flex justify-center mt-5 text-2xl'>No users found</div>}
			{filteredUsers.length > 0 && (
				<div className='p-2 flex flex-col gap-2 items-start'>
					{filteredUsers.map((fUser) => (
						<UserBadge
							id={fUser.id}
							name={fUser.name}
							lastSeen={fUser.lastSeen}
							image={fUser.avatar}
							endContent={
								currentUser.friends.includes(fUser.id) ? (
									<Button
										className='flex items-center'
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											unfollowUser(fUser.id);
										}}>
										<span className='mr-5'>Unfollow</span>
										<IoIosRemoveCircle className='size-6 mr-2 dark:text-zinc-400' />
									</Button>
								) : (
									<Button
										className='flex items-center'
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											followUser(fUser.id);
										}}>
										<span className='mr-5'>Follow</span>
										<IoIosAddCircle className='size-6 mr-2 dark:text-zinc-400' />
									</Button>
								)
							}
							key={fUser.id}
						/>
					))}
				</div>
			)}
		</MainLayout>
	);
}
