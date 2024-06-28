'use client';

import { useUser } from '@/components/contexts/userContext';
import ProfileGallery from '@/components/profile/gallery';
import ProfileHeader from '@/components/profile/header';
import { db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
	const [pUser, setPUser] = useState<any>(null);
	const [pPosts, setPPosts] = useState<any>([]);
	const [allowed, setAllowed] = useState<boolean>(false);

	const { user } = useUser();
	const { id } = useParams();

	useEffect(() => {
		console.log('ProfilePage');

		if (!user) return;

		const fetchData = async () => {
			const userDoc = await getDoc(doc(db, 'users', id as string));
			const currentUserDoc = await getDoc(doc(db, 'users', user.uid));

			if (!userDoc.exists()) return;

			// Check if the current user is allowed to view the profile
			if (currentUserDoc.data()?.following.includes(id)) {
				setAllowed(true);
				setPUser(userDoc.data());

				// Fetch the user's posts
				const postsCollection = collection(db, `posts/`);
				const q = query(postsCollection, where('owner', '==', id));
				const postsSnapshot = await getDocs(q);

				const posts = postsSnapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});

				const storage = getStorage();
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
				setPPosts(postsWithImages);
			}
		};

		fetchData();
	}, [user, id]);

	return (
		<MainLayout>
			{allowed ? (
				<>
					<ProfileHeader
						name={pUser?.name || 'User'}
						avatar={pUser.name}
						bio='Profile BIO'
						currentUserProfile={false}
					/>
					<div className='w-full flex flex-col items-center p-10'>
						<ProfileGallery posts={pPosts} />
					</div>
				</>
			) : (
				<h1>Not allowed</h1>
			)}
		</MainLayout>
	);
}
