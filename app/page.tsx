'use client';

import { useUser } from '@/components/contexts/userContext';
import Post from '@/components/post';
import { db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

export default function Home() {
	const [posts, setPosts] = useState<any>([]);
	const { user } = useUser();

	useEffect(() => {
		if (!user) return;

		// fetch posts
		const fetchPosts = async () => {
			const postCollection = collection(db, 'posts/');
			const postsSnapshot = await getDocs(postCollection);

			let posts = postsSnapshot.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});

			const storage = getStorage();

			posts = await Promise.all(
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

			// Fetch the user data for each post
			posts = await Promise.all(
				posts.map(async (post: any) => {
					const userDoc = await getDoc(doc(collection(db, 'users'), post.owner));
					const userRef = userDoc.data();

					if (!userRef) {
						return {
							...post,
							user: {
								name: 'Unknown',
							},
						};
					}

					return {
						...post,
						user: {
							name: userRef.name,
						},
					};
				})
			);

			setPosts(posts as any);
		};

		fetchPosts();
	}, [user]);

	return (
		<MainLayout>
			<div className='flex items-center mt-5 flex-col gap-5'>
				{posts.length > 0 ? (
					posts.map((post: any) => (
						<Post
							key={post.id}
							{...post}
						/>
					))
				) : (
					<p>No posts found</p>
				)}
			</div>
		</MainLayout>
	);
}
