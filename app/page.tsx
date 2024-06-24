'use client';

import Post from '@/components/post';
import { auth } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	if (!auth.currentUser) {
		router.push('/login');
		return;
	}

	return (
		<MainLayout>
			<div className='flex items-center mt-5 flex-col gap-5'>
				<Post
					title='Test Post'
					description='This is a test post'
					image='/post.png'
					user={{
						name: 'Test User',
						avatar: '/avatar.png',
					}}
					comments={[
						{
							comment: 'This is a test comment',
							user: {
								name: 'Test Commenter',
								avatar: '/avatar.png',
							},
						},
					]}
				/>

				<Post
					title='Test Post'
					description='This is a test post'
					image='/post.png'
					user={{
						name: 'Test User',
						avatar: '/avatar.png',
					}}
					comments={[
						{
							comment: 'This is a test comment',
							user: {
								name: 'Test Commenter',
								avatar: '/avatar.png',
							},
						},
					]}
				/>
			</div>
		</MainLayout>
	);
}
