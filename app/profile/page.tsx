'use client';

import { useUser } from '@/components/contexts/userContext';
import ProfileGallery from '@/components/profile/gallery';
import ProfileHeader from '@/components/profile/header';
import { auth, db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { Button, Input } from '@nextui-org/react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

const images = [
	{ src: '/placeholder.png', alt: 'Image 1' },
	{ src: '/placeholder.png', alt: 'Image 2' },
	{ src: '/placeholder.png', alt: 'Image 3' },
	{ src: '/placeholder.png', alt: 'Image 4' },
];

export default function AccountPage() {
	const { user } = useUser();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState<File | null>(null);

	const [posts, setPosts] = useState<Post[]>([]);

	const uploadPost = async () => {
		if (!title || !description || !picture) return;

		const storage = getStorage();
		const storageRef = ref(storage, `posts/${auth.currentUser?.uid}/${picture.name}_${Date.now()}`);

		try {
			const snapshot = await uploadBytes(storageRef, picture);

			await setDoc(doc(db, `posts/${auth.currentUser?.uid}/posts`, `${auth.currentUser?.uid}_${Date.now()}`), {
				title,
				description,
				picture: snapshot.metadata.fullPath,
				userId: auth.currentUser?.uid,
				timestamp: Date.now(),
				likes: [],
				comments: [],
			});

			// close the modal
			setTitle('');
			setDescription('');
			setPicture(null);

			alert('Post uploaded successfully');
		} catch (error: any) {
			console.error(error);
			alert(`Failed to upload post\n${error.message}`);
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const postsCollection = collection(db, `posts/${auth.currentUser?.uid}/posts`);
			// query where post id contains the current user id
			const postsSnapshot = await getDocs(postsCollection);

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

	if (!auth.currentUser) return null;

	return (
		<MainLayout>
			<ProfileHeader
				name={user.name}
				avatar={auth.currentUser?.photoURL || ''}
				bio='Profile BIO'
			/>
			<div className='w-full flex flex-col items-center p-10'>
				<Input
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Input
					placeholder='Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Input
					type='file'
					accept='image/*'
					multiple={false}
					required
					onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
				/>
				<Button
					onClick={() => {
						if (!title || !description || !picture) return;
						uploadPost();
					}}>
					Submit Post
				</Button>
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
