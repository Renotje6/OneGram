'use client';

import Post from '@/components/post';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
	return (
		<MainLayout>
			<div className='flex items-center mt-5 flex-col gap-5'>
				<Post />
				<Post />
			</div>
		</MainLayout>
	);
}
