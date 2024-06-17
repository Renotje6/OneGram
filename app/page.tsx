'use client';
import { Auth } from '@/components/auth';
import { Register } from '@/components/register';

export default function Home() {
	return (
		<main>
			<Auth />
			<Register />
		</main>
	);
}
