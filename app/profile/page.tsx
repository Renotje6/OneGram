'use client';

import ProfileGallery from '@/components/profile/gallery';
import ProfileHeader from '@/components/profile/header';
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
	return (
		<MainLayout>
			<ProfileHeader
				name='Username'
				avatar=''
				bio='Profile BIO'
			/>
			<div className='w-full flex flex-col items-center p-10'>
				<ProfileGallery images={images} />
			</div>
		</MainLayout>
	);
}
