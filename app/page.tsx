'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<main className='w-screen h-screen flex items-center justify-center'>
			<div>
				The current theme is: {theme}
				<button onClick={() => setTheme('light')}>Light Mode</button>
				<button onClick={() => setTheme('dark')}>Dark Mode</button>
			</div>
		</main>
	);
}
