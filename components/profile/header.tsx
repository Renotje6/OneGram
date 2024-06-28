import { db } from '@/config/firebase';
import { useModals } from '@/hooks/useModals';
import { Avatar, Button, Switch } from '@nextui-org/react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useUser } from '../contexts/userContext';
import CreatePostModal from '../modals/createPost';

interface ProfileHeaderProps {
	name: string;
	bio: string;
	avatar: string;
	currentUserProfile?: boolean;
}

export default function ProfileHeader({ name, bio, avatar, currentUserProfile = true }: ProfileHeaderProps) {
	const { toggleModal, isModalOpen } = useModals();
	const [isPrivate, setIsPrivate] = useState(false);
	const { user } = useUser();

	useEffect(() => {
		if (!user) return;

		// Fetch user data
		const fetchUserData = async () => {
			const userDoc = await getDoc(doc(collection(db, 'users'), user.uid));
			const userData = userDoc.data();
			if (!userData) return;
			setIsPrivate(userData.private || false);
		};

		fetchUserData();
	}, [user]);

	const togglePrivate = async () => {
		// Update the user's private status
		const userDoc = doc(collection(db, 'users'), user?.uid);
		const userDocSnap = await getDoc(userDoc);
		await setDoc(userDoc, {
			...userDocSnap.data(),
			private: !isPrivate,
		});
		setIsPrivate(!isPrivate);
	};

	if (!user) return null;

	return (
		<header className='bg-black/10 flex p-10 relative'>
			<div className='flex gap-5 items-center'>
				<Avatar
					classNames={{ base: 'w-32 h-32' }}
					showFallback
					src={avatar}
				/>
				<div className='h-full flex justify-between flex-col'>
					<div className='w-full'>
						<p className='text-4xl font-semibold dark:text-zinc-200 text-black'>{name}</p>
						<p className='dark:text-zinc-300 text-medium my-1 text-black'>{bio}</p>
					</div>
				</div>
				{currentUserProfile && (
					<div>
						<Switch
							onChange={togglePrivate}
							isSelected={isPrivate}>
							Private
						</Switch>
					</div>
				)}
			</div>
			{currentUserProfile && (
				<>
					<Button
						name='createPost'
						isIconOnly
						onClick={() => {
							toggleModal('createPost');
						}}
						className='absolute top-8 right-8'
						startContent={<FaPlus />}
					/>

					<CreatePostModal
						isOpen={isModalOpen('createPost')}
						modalToggle={() => toggleModal('createPost')}
					/>
				</>
			)}
		</header>
	);
}
