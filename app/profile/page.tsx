'use client';

import { useUser } from '@/components/contexts/userContext';
import ProfileGallery from '@/components/profile/gallery';
import ProfileHeader from '@/components/profile/header';
import { auth } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';

const images = [
	{
		src: '/placeholder.png',
		alt: 'Image 1',
	},
	{
		src: '/placeholder.png',
		alt: 'Image 2',
	},
	{
		src: '/placeholder.png',
		alt: 'Image 2',
	},
	{
		src: '/placeholder.png',
		alt: 'Image 3',
	},
	{
		src: '/placeholder.png',
		alt: 'Image 4',
	},
	{
		src: '/placeholder.png',
		alt: 'Image 4',
	},
];

export default function AccountPage() {
	const { user } = useUser();

	return (
		<MainLayout>
			<ProfileHeader
				name={user.name}
				avatar={auth.currentUser?.photoURL || ''}
				bio='Profile BIO'
			/>
			<div className='w-full flex flex-col items-center p-10'>
				<ProfileGallery images={images} />
			</div>
		</MainLayout>
	);
}
