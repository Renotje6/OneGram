'use client';

import ProfileGallery from '@/components/profile/gallery';
import ProfileHeader from '@/components/profile/header';
import MainLayout from '@/layouts/MainLayout';

const posts = [
	{
		id: '1',
		image: '/placeholder.png',
	},
	{
		id: '2',
		image: '/placeholder.png',
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
				<ProfileGallery posts={posts} />
			</div>
		</MainLayout>
	);
}
