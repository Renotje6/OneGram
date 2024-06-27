'use client';

import { useUser } from '@/components/contexts/userContext';
import Post from '@/components/post';
import { db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

export default function Home() {
	const [posts, setPosts] = useState<any>([]);
	const { user } = useUser();

	useEffect(() => {
		if (!user) return;

		// fetch posts
		const fetchPosts = async () => {
			const currentUser = await getDoc(doc(collection(db, 'users'), user.uid));
			const postCollection = collection(db, 'posts/');
			const postsSnapshot = await getDocs(postCollection);

			let posts = postsSnapshot.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			}) as Post[];

			// Filter posts to only include posts from people the user follows
			posts = posts.filter((post) => currentUser.data()!.friends.length > 0 && currentUser.data()!.friends.includes(post.owner));

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

	const likePost = async (id: string) => {
		const postRef = doc(collection(db, 'posts'), id);
		const postDoc = await getDoc(postRef);
		const post = postDoc.data();

		if (!post) return;

		const likes = post.likes;
		const userIndex = likes.indexOf(user?.uid);

		if (userIndex === -1) {
			likes.push(user?.uid);
		} else {
			likes.splice(userIndex, 1);
		}

		await setDoc(postRef, { ...post, likes });

		setPosts((prevPosts: any) =>
			prevPosts.map((prevPost: any) => {
				if (prevPost.id === id) {
					return {
						...prevPost,
						likes,
					};
				}

				return prevPost;
			})
		);
	};

	return (
		<MainLayout>
			<div className='flex items-center mt-5 flex-col gap-5'>
				{posts.length > 0 ? (
					posts.map((post: any) => (
						<Post
							key={post.id}
							{...post}
							liked={post.likes.includes(user?.uid)}
							like={() => likePost(post.id)}
						/>
					))
				) : (
					<p>No posts found, start following people!</p>
				)}
			</div>
		</MainLayout>
	);
}
