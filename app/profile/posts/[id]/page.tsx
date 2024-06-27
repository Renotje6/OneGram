'use client';

import { db } from '@/config/firebase';
import MainLayout from '@/layouts/MainLayout';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuPage() {
	const [post, setPost] = useState<Post | null>(null);
	const [comments, setComments] = useState<
		{
			id: string;
			name: string;
			comment: string;
		}[]
	>([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchPost = async () => {
			const postSnapshot = await getDoc(doc(db, 'posts/', id as string));

			const post = {
				id: postSnapshot.id,
				...postSnapshot.data(),
			} as Post;

			const storage = getStorage();
			const url = await getDownloadURL(ref(storage, post.picture));

			setPost({
				...post,
				image: {
					src: url,
					alt: post.title,
				},
			});

			const commentsArray = [] as {
				id: string;
				name: string;
				comment: string;
			}[];

			// Fetch the comments
			await post.comments.forEach(async (comment) => {
				const userSnapshot = await getDoc(doc(db, 'users/', comment.userId));
				if (userSnapshot.exists())
					commentsArray.push({
						id: userSnapshot.id,
						name: userSnapshot.data().name,
						comment: comment.comment,
					});
			});

			setComments(commentsArray);
		};
		fetchPost();
	}, [id]);

	return (
		<MainLayout>
			<pre>{post && JSON.stringify(post, null, 2)}</pre>
			<pre>{comments && JSON.stringify(comments, null, 2)}</pre>
		</MainLayout>
	);
}
