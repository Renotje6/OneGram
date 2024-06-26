'use client';

import { useUser } from '@/components/contexts/userContext';
import ProfileGallery from '@/components/profile/gallery';
import ProfileHeader from '@/components/profile/header';
import { auth, db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

const images = [
	{ src: '/placeholder.png', alt: 'Image 1' },
	{ src: '/placeholder.png', alt: 'Image 2' },
	{ src: '/placeholder.png', alt: 'Image 3' },
	{ src: '/placeholder.png', alt: 'Image 4' },
];

export default function AccountPage() {
	const { user } = useUser();

	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const postsCollection = collection(db, `posts/`);
			// query where post id contains the current user id
			const q = query(postsCollection, where('owner', '==', auth.currentUser?.uid));
			const postsSnapshot = await getDocs(q);

			const posts = postsSnapshot.docs.map((doc) => doc.data());
			const storage = getStorage();
			// map posts to include the url of the image
			const postsWithImages = await Promise.all(
				posts.map(async (post: any) => {
					const url = await getDownloadURL(ref(storage, post.picture));
					return {
						...post,
						image: {
							src: url,
							alt: post.title,
						},
					};
				})
			);

			setPosts(postsWithImages);
		};

		fetchPosts();
	}, []);

	return (
		<MainLayout>
			<ProfileHeader
				name={user?.name || 'User'}
				avatar={auth.currentUser?.photoURL || ''}
				bio='Profile BIO'
			/>
			<div className='w-full flex flex-col items-center p-10'>
				<ProfileGallery
					images={posts.map((post: any) => {
						console.dir(post, { depth: null });
						return post.image;
					})}
				/>
			</div>
		</MainLayout>
	);
}
