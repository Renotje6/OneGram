'use client';
import { Auth } from '@/components/auth';
import { DocumentData, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';

export default function Home() {
	const [movies, setMovies] = useState<DocumentData[]>([]);

	useEffect(() => {
		getMovies();
	}, []);

	const getMovies = async () => {
		const moviesCol = collection(db, 'movies');
		const moviesSnapshot = await getDocs(moviesCol);
		const moviesList = moviesSnapshot.docs.map((doc) => {
			return { ...doc.data(), id: doc.id };
		});

		setMovies(moviesList);
	};

	const deleteMovie = async (id: string) => {
		const movieRef = doc(db, 'movies', id);
		await deleteDoc(movieRef);
	};

	return (
		<main>
			<Auth />
			<div>
				<p>movies</p>
				{movies.map((movie) => (
					<div key={movie.id}>
						<p>{movie.title}</p>
						<button onClick={() => deleteMovie(movie.id)}>delete</button>
					</div>
				))}
			</div>
		</main>
	);
}
