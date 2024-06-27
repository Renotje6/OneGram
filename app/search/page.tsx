'use client';

import { useUser } from '@/components/contexts/userContext';
import { db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { Button, Input, Link, User } from '@nextui-org/react';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

export default function AccountPage() {
	const [users, setUsers] = useState<any[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
	const [currentUser, setCurrentUser] = useState<any>(null);
	const [search, setSearch] = useState('');
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
						setSearch(e.target.value);
						e.target.value ? setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(e.target.value.toLowerCase()))) : setFilteredUsers(users.filter((user) => !currentUser.friends.includes(user.id)));
					}}
				/>
			</div>
			{filteredUsers.length === 0 && <div className='flex justify-center mt-5 text-2xl'>No users found</div>}
			{filteredUsers.length > 0 && (
				<div className='p-2 flex flex-col gap-2 items-start'>
					{filteredUsers.map((fUser) => (
						<SearchUser
							id={fUser.id}
							name={fUser.name}
							lastSeen={fUser.lastSeen}
							image={fUser.avatar}
							isFriend={currentUser.friends.includes(fUser.id)}
							key={fUser.id}
							followUser={followUser}
							unfollowUser={unfollowUser}
						/>
					))}
				</div>
			)}
		</MainLayout>
	);
}

interface SearchUserProps {
	id: string;
	name: string;
	lastSeen?: string;
	image: string;
	isFriend: boolean;
	followUser: (userId: string) => void;
	unfollowUser: (userId: string) => void;
}

const SearchUser: FC<SearchUserProps> = ({ id, name, image, lastSeen, isFriend, followUser, unfollowUser }) => {
	return (
		<Button
			as={Link}
			size='lg'
			variant='light'
			href={`/profile/${id}`}
			className='flex justify-between w-full items-center p-2'
			endContent={
				isFriend ? (
					<Button
						className='flex items-center'
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							unfollowUser(id);
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
							followUser(id);
						}}>
						<span className='mr-5'>Follow</span>
						<IoIosAddCircle className='size-6 mr-2 dark:text-zinc-400' />
					</Button>
				)
			}
			startContent={
				<User
					name={name}
					description={lastSeen ? formatTimeSinceLastLogin(lastSeen) : 'The user has never logged in'}
					avatarProps={{ src: image, showFallback: true }}
					classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300' }}
				/>
			}
		/>
	);
};

function formatTimeSinceLastLogin(isoDateString: string): string {
	const lastLoginDate = new Date(isoDateString);
	const now = new Date();
	const diff = now.getTime() - lastLoginDate.getTime();

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	} else if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	} else {
		return 'just now';
	}
}
