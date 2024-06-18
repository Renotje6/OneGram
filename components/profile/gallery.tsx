import Image from 'next/image';

interface ProfileGalleryProps {
	images: { src: string; alt: string }[];
}

export default function ProfileGallery({ images }: ProfileGalleryProps) {
	return (
		<div className='flex flex-wrap justify-center items-center gap-5'>
			{images.map((image, index) => (
				<Image
					className='rounded-xl gap-2'
					key={index}
					src={image.src}
					alt={image.alt}
					width={300}
					height={150}
				/>
			))}
		</div>
	);
}
