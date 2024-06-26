import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileGalleryProps {
	posts: { image: string; id: string }[];
}

export default function ProfileGallery({ posts }: ProfileGalleryProps) {
	const router = useRouter();

	return (
		<div className='flex flex-wrap justify-center items-center gap-5'>
			{posts.map((post, index) => (
				<Image
					onClick={() => {
						router.push(`/profile/${post.id}`);
					}}
					className='rounded-xl gap-2 hover:cursor-pointer'
					key={index}
					src={post.image}
					alt='Post Image'
					width={300}
					height={150}
				/>
			))}
		</div>
	);
}
