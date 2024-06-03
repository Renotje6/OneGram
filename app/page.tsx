import Image from 'next/image';
import Providers from './providers';
import { Button } from '@nextui-org/button';

export default function Home() {
	return (
		<Providers>
			<main className='w-screen h-screen flex items-center justify-center'>
				<Button>Test</Button>
			</main>
		</Providers>
	);
}
