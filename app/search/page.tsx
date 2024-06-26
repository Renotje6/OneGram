'use client';

import MainLayout from '@/layouts/MainLayout';
import { Button, Link, User } from '@nextui-org/react';
import React from "react";
import { MdLibraryAdd } from 'react-icons/md';
import { FC } from 'react';
import { IoIosAddCircle } from 'react-icons/io';



export default function AccountPage() {
	return (
		<MainLayout>
			<div className=' flex justify-center mt-5 text-5xl '>
				Search friends
			</div>
			<div className='flex justify-center mt-5'>
				<input
					type="search"
					placeholder="Search users..."
					className="p-2 border rounded-lg w-1/2"
				/>
			</div>
					<div className='p-2 flex flex-col gap-2 items-start'>
						<SideBarUser
							addFriend
							id='jane-doe'
							name='Jane Doe'
							lastseen='5h ago'
							image='https://i.pravatar.cc/150?u=a04258114e29026702d'
						/>
					</div>
					<div className='p-2 flex flex-col gap-2 items-start'>
						<SideBarUser
							addFriend
							id='jane-doe'
							name='Jane Doe'
							lastseen='5h ago'
							image='https://i.pravatar.cc/150?u=a04258114e29026702d'
						/>
					</div>
					<div className='p-2 flex flex-col gap-2 items-start'>
						<SideBarUser
							addFriend
							id='jane-doe'
							name='Jane Doe'
							lastseen='5h ago'
							image='https://i.pravatar.cc/150?u=a04258114e29026702d'
						/>
					</div>
		</MainLayout>
	);
};

interface SideBarUserProps {
	id: string;
	name: string;
	addFriend: boolean;
	lastseen?: string;
	image: string;
}

const SideBarUser: FC<SideBarUserProps> = ({ id, name, addFriend, image, lastseen }) => {
	return (
		<Button
			as={Link}
			size='lg'
			variant='light'
			href={`/profile/${id}`}
			className='flex justify-between w-full items-center p-2'
			endContent={
				addFriend ? (
				  <div className="flex items-center">
					<span className='mr-5'>Add Friend</span>
					<IoIosAddCircle className="size-6 mr-2 dark:text-zinc-400" />
				  </div>
				) : null
			  }			  
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