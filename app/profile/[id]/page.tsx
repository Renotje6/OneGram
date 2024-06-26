import MainLayout from '@/layouts/MainLayout';

export default function MenuPage({ params }: { params: { id: string } }) {
	const data = {
		userId: '1',
		title: 'Test Title',
		description: 'Test Description',
		likes: ['1', '2'],
		timestamp: '2021-09-01T00:00:00.000Z',
		picture: '/placeholder.png',
		image: { src: '/placeholder.png', alt: 'Post Image' },
		comments: [{ userId: 'Test User', comment: 'Test Comment' }],
	};

	return (
		<MainLayout>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</MainLayout>
	);
}
