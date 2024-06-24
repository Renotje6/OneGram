'use client';

import { auth } from '@/config/firebase';
import { Button, User } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { useUser } from '../components/contexts/userContext';

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
	const { user } = useUser();

	return (
		<nav className='bg-black/20 text-black p-4 min-h-screen w-80 flex-col gap-5 justify-between shadow-lg hidden lg:flex min-w-80 fixed right-0'>
			<div className='h-full'>
				<p className='text-lg font-semibold dark:text-zinc-300'>YOUR FOLLOWERS</p>
				<div className='p-2 flex flex-col gap-2 items-start'>
					<SideBarUser
						following
						id='jane-doe'
						name='Jane Doe'
						lastseen='5h ago'
						image='https://i.pravatar.cc/150?u=a04258114e29026702d'
					/>
				</div>
			</div>
			<div>
				<Button
					as={Link}
					size='lg'
					variant='light'
					href={`/logout`}
					className='flex justify-between w-full items-center p-2 text-black dark:text-zinc-300'
					endContent={<TbLogout className='size-6 dark:text-zinc-400' />}
					startContent={
						<User
							name={user.name}
							avatarProps={{ src: auth.currentUser?.photoURL || '', showFallback: true }}
							classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300 text-lg' }}
						/>
					}
				/>
			</div>
		</nav>
	);
};

interface SideBarUserProps {
	id: string;
	name: string;
	following: boolean;
	lastseen?: string;
	image: string;
}

const SideBarUser: FC<SideBarUserProps> = ({ id, name, following, image, lastseen }) => {
	return (
		<Button
			as={Link}
			size='lg'
			variant='light'
			href={`/profile/${id}`}
			className='flex justify-between w-full items-center p-2'
			endContent={following! ? <MdLibraryAdd className='size-6 mr-2 dark:text-zinc-400' /> : null}
			startContent={
				<User
					name={name}
					description={lastseen}
					avatarProps={{ src: image, showFallback: true }}
					classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300' }}
				/>
			}
		/>
	);
};

export default SideBar;
